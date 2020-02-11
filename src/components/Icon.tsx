import React from 'react';
import {
    FaSave,
    FaPlusSquare,
    FaDatabase,
    FaTrashAlt,
    FaSearch,
    FaEdit,
    FaExclamation,
    FaPlus,
    FaPlay,
    FaRegCheckCircle,
    FaExclamationCircle
} from 'react-icons/fa';

import { StyledIcon } from './styled';
import { CustomComponent } from './CustomComponent';

interface IProps {
    type?: string;
    className?: string;
    color?: string;
    onClick?: any;
    small?: boolean;
    medium?: boolean;
    big?: boolean;
    size?: any;
}

export class Icon extends CustomComponent<IProps, any> {
    getIcon() {
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
            plus: FaPlus,
            play: FaPlay,
            check: FaRegCheckCircle,
            error: FaExclamationCircle
        }

        return icons[this.props.type];
    }

    render() {
        const Icon = this.getIcon();
        const { color, size } = this.props;
        const props = {...this.props, color: undefined, size: undefined};

        return (
            <StyledIcon {...props} className={`icon-c ${props.className || ''}`}>
                <Icon fill={color} size={size} />
            </StyledIcon>
        );
    }
}