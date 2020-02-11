import React from 'react';
import {
    FaSave,
    FaPlusSquare,
    FaDatabase,
    FaTrashAlt,
    FaSearch,
    FaEdit,
    FaExclamation,
    FaPlay
} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { StyledButton } from './styled';

interface IProps {
    link?: string;
    icon?: string;
    className?: string;
    onClick?: any;
    small?: boolean;
    medium?: boolean;
    big?: boolean;
    radius?: number;
    radial?: boolean;
    iconProps?: any;
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
            play: FaPlay
        }

        return icons[iconName];
    }

    resolveRadialSize = () => {
        let radius = 0, icon: string = '';

        if (this.props.small) {
            radius = 18;
            icon = '.5em';
        }

        if (this.props.medium) {
            radius = 35;
            icon = '1em';
        }

        if (this.props.big) {
            radius = 70;
            icon = '1.5em';
        }

        return { radius, icon };
    }

    render() {
        const Icon = this.props.icon ? this.getIcon(this.props.icon) : null;
        const as = this.props.link ? Link : null;
        const props = { ...this.props, to: this.props.link } as any;
        const iconProps = {...this.props.iconProps} as any;

        if (props.radial) {
            const { radius, icon } = this.resolveRadialSize();
            iconProps.size = icon;
            props.radius = radius;
        }

        return (
            <StyledButton
                as={as}
                {...props}
                className={`button ${props.className}`}
            >
                {this.props.icon && <Icon {...iconProps} />}
                {this.props.children && <span>{this.props.children}</span>}
            </StyledButton>
        );
    }
}
