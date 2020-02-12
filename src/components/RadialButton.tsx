import React from 'react';
import {
    FaSave,
    FaPlusSquare,
    FaDatabase,
    FaTrashAlt,
    FaSearch,
    FaEdit,
    FaExclamation,
    FaPlus
} from 'react-icons/fa';

import { StyledRadialButton } from './styled';
import { CustomComponent } from './CustomComponent';

interface IProps {
    link?: string;
    icon?: string;
    className?: string;
    onClick?: any;
    small?: boolean;
    medium?: boolean;
    big?: boolean;
    size?: number;
    iconSize?: number;
    history?: any;
}

export class RadialButton extends CustomComponent<IProps, any> {
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
            play: ""
        }

        return icons[this.props.icon];
    }

    resolveSize = () => {
        let size = 0
        let iconSize = '';

        if (this.props.small) {
            size = 22;
            iconSize = '1em';
        }

        if (this.props.medium) {
            size = 35;
            iconSize = '1.5em';
        }

        if (this.props.big) {
            size = 52;
            iconSize = '2em';
        }

        return { size, iconSize };
    }

    onClickHandler = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }

        if (this.props.link) {
            this.history.push(this.props.link);
        }
    }

    render() {
        const { size, iconSize } = this.resolveSize();
        const Icon = this.getIcon();
        const props = {...this.props, size};

        return (
            <StyledRadialButton
                {...props}
                type="button"
                onClick={this.onClickHandler}
            >
                <Icon size={iconSize} />
            </StyledRadialButton>
        );
    }
}
