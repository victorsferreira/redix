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
import { StyledButton } from './styled';

interface IProps {
    link?: string;
    icon?: string;
    className?: string;
    onClick?: any;
}

export class Button extends React.Component<IProps> {
    getIcon(iconName) {
        if (!iconName) return null;
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
        const Icon = this.props.icon ? this.getIcon(this.props.icon) : null;
        const as = this.props.link ? Link : null;
        const props = { ...this.props, to: this.props.link };

        return (
            <StyledButton
                className={`button ${props.className}`}
                as={as}
                {...props}
            >
                {this.props.icon && <Icon />}
                {this.props.children && <span>{this.props.children}</span>}
            </StyledButton>
        );
    }
}
