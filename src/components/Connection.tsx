import React from 'react';
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CustomComponent, IConnectionObserverProps } from './CustomComponent';
import { ConnectionsProvider } from './ConnectionsProvider';
import { client as redisClient, RedisClient, RedisClientError } from './RedisClient';
import { Result } from './Result';
import { observer, inject } from 'mobx-react';
import { autorun } from 'mobx';
import store from './ConnectionsStore';
import { StyledContent } from './styled';

interface IProps extends IConnectionObserverProps { }

interface IState {
  output: any;
  resultSet: any;
  connection: any;
  loaded: boolean;
}

@inject("connectionsStore")
@observer
export class Connection extends CustomComponent<IProps, IState> {
  private provider: ConnectionsProvider;
  private redisClient: RedisClient;
  private store: any;

  constructor(props) {
    super(props);

    this.state = {
      connection: null,
      output: null,
      resultSet: [
      ],
      loaded: false
    };

    this.provider = new ConnectionsProvider();
    this.redisClient = redisClient;

    this.store = store;
    autorun(() => {
      const id = this.store.selected;
      this.openConnection(id);
    });
  }

  async componentWillUpdate() {
    // const id = this.getRouteParam('id');    
    // if (this.state.loaded && this.state.connection && this.state.connection.id !== id) {
    //     await this.openConnection(id);
    // }
  }

  async openConnection(id) {
    const connection = await this.provider.getById(id);
    if (!connection) {
      this.go('home');
      return;
    }

    await this.setState({ connection, loaded: true });

    try {
      await this.redisClient.connect(connection);
    } catch (err) {
      const output = this.outputResultDTO('CONNECTION', false);
      this.setResult(output);
    }
  }

  async componentDidMount() {
    // const id = this.getRouteParam('id');
    // await this.openConnection(id);
  }

  // IS IT NECESSARY?
  async runAll() {
    const keys = await this.redisClient.getAll();
    const keyValueSet = keys.map(key => {
      return this.keyValueDTO(key);
    });

    const output = this.outputResultDTO('KEYS', true);
    const resultSet = this.resultSetDTO(keyValueSet);
    this.setResult(output, resultSet);
  }

  async runGet(key) {
    try {
      const value = await this.redisClient.get(key);

      const resultSet = value ? this.resultSetDTO(
        this.keyValueDTO(key, value)
      ) : [];

      const output = this.outputResultDTO('GET', true);

      this.setResult(output, resultSet);
    } catch (err) {
      let output;
      if (err instanceof RedisClientError) {
        output = this.outputResultDTO('CONNECTION', false);
      } else {
        output = this.outputResultDTO('GET', false);
      }

      this.setResult(output);
    }
  }

  async runSet(key, value) {
    try {
      const commandResult = await this.redisClient.set(key, value);
      const success = commandResult === 'OK';

      const resultSet = success ? this.resultSetDTO(
        this.keyValueDTO(key)
      ) : [];

      const output = this.outputResultDTO('SET', success);

      this.setResult(output, resultSet);
    } catch (err) {
      let output;
      if (err instanceof RedisClientError) {
        output = this.outputResultDTO('CONNECTION', false);
      } else {
        output = this.outputResultDTO('SET', false);
      }

      this.setResult(output);
    }
  }

  async runDel(key) {
    try {
      await this.redisClient.delete(key);
      const output = this.outputResultDTO('DEL', true);

      this.setResult(output);
    } catch (err) {
      let output;
      if (err instanceof RedisClientError) {
        output = this.outputResultDTO('CONNECTION', false);
      } else {
        output = this.outputResultDTO('DEL', false);
      }

      this.setResult(output);
    }
  }

  // async runKeys(pattern) {
  //   const keys = await this.redisClient.getByPattern(pattern);
  //   const keyValueSet = keys.map(key => {
  //     return this.keyValueDTO(key);
  //   });

  //   const output = this.outputResultDTO('KEYS', true);
  //   const resultSet = this.resultSetDTO(keyValueSet);
  //   this.setResult(output, resultSet);
  // }

  async runSearch(pattern) {
    try {
      const keys = await this.redisClient.getByPattern(pattern);
      const keyValueSet = keys.map(key => {
        return this.keyValueDTO(key);
      });

      const output = this.outputResultDTO('KEYS', true);
      const resultSet = this.resultSetDTO(keyValueSet);
      this.setResult(output, resultSet);
    } catch (err) {
      let output;
      if (err instanceof RedisClientError) {
        output = this.outputResultDTO('CONNECTION', false);
      } else {
        output = this.outputResultDTO('SEARCH', false);
      }

      this.setResult(output);
    }
  }

  async runFlush() {
    try {
      await this.redisClient.flushAll();
      const output = this.outputResultDTO('FLUSH', true);
      this.setResult(output);
    } catch (err) {
      let output;
      if (err instanceof RedisClientError) {
        output = this.outputResultDTO('CONNECTION', false);
      } else {
        output = this.outputResultDTO('FLUSH', false);
      }

      this.setResult(output);
    }
  }

  run = async (command: string, input: any) => {
    this.setResult(null, null, true);
    if (command === 'GET') {
      this.runGet(input.key);
    } else if (command === 'SET') {
      this.runSet(input.key, input.value)
    } else if (command === 'DELETE') {
      this.runDel(input.key);
    } else if (command === 'SEARCH') {
      this.runSearch(input.pattern);
    } else if (command === 'FLUSH') {
      this.runFlush();
    } else if (command === 'ALL') {
      this.runAll();
    }
  }

  setResult(output = null, resultSet = null, cleared = false) {
    if (!output) output = null;
    if (!resultSet) resultSet = null;

    this.store.setResult(resultSet, output, cleared);
  }

  componentDidUpdate() {

  }

  keyValueDTO(key, value = null) {
    return {
      key, value
    };
  }

  resultSetDTO(keyValueSet) {
    if (!Array.isArray(keyValueSet)) {
      keyValueSet = [keyValueSet];
    }

    return keyValueSet;
  }

  createOutputDefaultMessage(command, success, params?) {
    let messageParams = null;
    if (params) {
      messageParams = Object.keys(params).map(paramKey => {
        return `${paramKey} = ${params[paramKey]}`;
      });
    }

    return `Execution of command '${command}'
      ${messageParams ?
        ` with params ${messageParams.join(', ')}` :
        ''
      } : ${success ? 'Success' : 'Failed'}`;
  }

  outputResultDTO(command, success, message?, params?) {
    if (!message) {
      message = this.createOutputDefaultMessage(command, success, params);
    }

    return {
      command,
      success,
      error: !success,
      message
    };
  }

  closeConnection = () => {
    this.redisClient.disconnect();
    this.go('home');
  }

  clearResults = () => {
    console.log('set result')
    this.store.setResult(null, null, true);
  }

  render() {
    return (
      <div id="connection" className="Create">
        <Sidebar {...this.props} />
        <StyledContent className="content">
          <Topbar
            run={this.run.bind(this)}
            clearResults={this.clearResults}
            closeConnection={this.closeConnection.bind(this)}
          />

          <Result
            resultSet={this.state.resultSet}
            output={this.state.output}
          />
        </StyledContent>
      </div>
    );
  }
}
