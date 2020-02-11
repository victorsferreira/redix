import React from 'react';

import { StyledTextButton } from './styled';
import { CustomComponent } from './CustomComponent';

interface IProps {
    link?: string;
    className?: string;
    onClick?: any;
    small?: boolean;
    medium?: boolean;
    big?: boolean;
    size?: number;
    history?: any;
}

export class TextButton extends CustomComponent<IProps, any> {

    onClickHandler = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }

        if (this.props.link) {
            this.history.push(this.props.link);
        }
    }

    render() {
        const props = {...this.props};

        return (
            <StyledTextButton
                {...props}
                onClick={this.onClickHandler}
            >
                {this.props.children}
            </StyledTextButton>
        );
    }
}
