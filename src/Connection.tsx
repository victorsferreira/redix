import React from 'react';
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { CustomComponent } from './CustomComponent';
import { ConnectionsProvider } from './ConnectionsProvider';
import { RedisClient } from './RedisClient';
import { Result } from './Result';

interface IState {
  output: any;
  resultSet: any;
  connection: any;
}

export class Connection extends CustomComponent<any, IState> {
  private provider: ConnectionsProvider;
  private redisClient: RedisClient;

  constructor(props) {
    super(props);

    this.state = {
      connection: null,
      output: null,
      resultSet: null,
    };

    this.provider = new ConnectionsProvider();
  }

  componentDidMount() {
    const id = this.getRouteParam('id');
    const connection = this.provider.getById(id);

    this.setState({ connection });

    this.redisClient = new RedisClient();
    this.redisClient.connect(connection);
  }

  async runGet(key) {
    const value = await this.redisClient.get(key);
    const resultSet = this.resultSetDTO(
      this.keyValueDTO(key, value)
    );

    const output = this.outputResultDTO('GET', true);

    this.setResult(output, resultSet);
  }

  async runSet(key, value) {
    await this.redisClient.set(key, value);
    // Should return output?
    const resultSet = this.resultSetDTO(
      this.keyValueDTO(key)
    );

    const output = this.outputResultDTO('SET', true);

    this.setResult(output, resultSet);
  }

  async runDel(key) {
    await this.redisClient.delete(key);
    const output = this.outputResultDTO('DEL', true);

    this.setResult(output);
  }

  async runKeys(pattern) {
    const keys = await this.redisClient.getByPattern(pattern);
    const keyValueSet = keys.map(key => {
      return this.keyValueDTO(key);
    });

    const output = this.outputResultDTO('KEYS', true);
    const resultSet = this.resultSetDTO(keyValueSet);
    this.setResult(output, resultSet);
  }

  async runFlush() {
    await this.redisClient.flushAll();
    const output = this.outputResultDTO('FLUSH', true);
    this.setResult(output);
  }

  run = async (command: string, input: any) => {
    if (command === 'GET') {
      this.runGet(input.key);
    } else if (command === 'SET') {
      this.runSet(input.key, input.value)
    } else if (command === 'DELETE') {
      this.runDel(input.key);
    } else if (command === 'SEARCH') {
      this.runKeys(input.pattern);
    } else if (command === 'FLUSH') {
      this.runFlush();
    }
  }

  setResult(output = null, resultSet = null) {
    if (!output) output = null;
    if (!resultSet) resultSet = null;

    this.setState({
      output,
      resultSet
    });
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

  render() {
    return (
      <div className="Create">
        <Sidebar />
        <div className="content">
          <Topbar
            run={this.run.bind(this)}
          />

          <Result
            resultSet={this.state.resultSet}
            output={this.state.output}
          />
        </div>
      </div>
    );
  }
}
