import React from 'react';
import { 
    FaSave, 
    FaPlusSquare, 
    FaDatabase, 
    FaTrashAlt, 
    FaSearch, 
    FaEdit,
    FaExclamation
} from 'react-icons/fa';
import { Link } from "react-router-dom";

interface IProps {
    link?: string;
    icon?: string;
    className?: string;
    onClick?: any;
}

export class Button extends React.Component<IProps> {
    getIcon(iconName) {
        if(!iconName) return null;
        const icons = {
            save: FaSave,
            add: FaPlusSquare,
            create: FaPlusSquare,
            new: FaPlusSquare,
            database: FaDatabase,
            db: FaDatabase,
            delete: FaTrashAlt,
            remove: FaTrashAlt,
            search: FaSearch,
            get: FaSearch,
            edit: FaEdit,
            execute: FaExclamation,
            run: FaExclamation,
        }

        return icons[iconName];
    }

    render() {
        const Icon = this.getIcon(this.props.icon);

        const element = this.props.link ?
            <Link className={`button ${this.props.className}`} to={this.props.link}>
                {this.props.children}            
                <Icon />
            </Link> :
            <button type="button" className="button" onClick={this.props.onClick}>
                {this.props.children}
                <Icon />
            </button>;

        return element;
    }
}
