import styled from "styled-components";
import { colors } from './styleGuide';

const darkGray = '#1d1e1f';
const midGray = '#2f3031';
const lightGray = '#39393a';
const borderLight = 'rgb(80,80,80)';
const carrot = '#e67e22';
const orange = '#f39c12';

export const StyledIcon = styled.div`
    display: inline-flex;
`;

export const StyledGeneric = styled.div`
    font-color: white;
    font-size: 14px;
    letter-spacing: 0.2px;
    margin: 0;
    padding: 0;
`;

export const StyledSidebar = styled.div`
    height: 100vh;
    width: 25vw;
    float: left;
    background: ${darkGray};
    overflow-x: auto;
    position: relative;
    padding-bottom: 70px;

    .create-connection{
        svg{
            margin-top: 1px;
        }
    }

    .add-controls{
        padding: 10px;
        width: 100%;
        display: flex;
        bottom: 0px;
        position: absolute;
        justify-content: center;
    }
`;

export const StyledTextButton = styled.button`
    color: ${colors.darkYellow};
    font-weight: bold;
    background: none;
    border: none;
    cursor: pointer;
    outline: none;
    ${props => props.small && `font-size: 12px;`}
    ${props => props.medium && `font-size: 16px;`}
    ${props => props.big && `font-size: 20px;`}

    &:hover {
        color: ${colors.yellow};
    }
`;

export const StyledForm = styled.form`
    width: 100%;
    background: ${darkGray};
    border-left: 1px solid ${lightGray};
    border-bottom: 1px solid ${borderLight};

    // height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;

    .form-wrapper{
        width: 100%;

        .inputs-wrapper {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;

            .inputs {
                width: 100%;

                select, input{
                    margin: 5px 0;
                }
            }
        }

    }

    input[type="text"], input[type="password"], select {
        height: 40px;
        width: 100%;
        border-radius: 20px;
        padding-left: 10px;
        padding-right: 10px;
        letter-spacing: 1px;
        font-size: 16px;
        background: white;
        color: ${darkGray};
    
        border: 0;
        outline: 0;
    }

    option{
        height: 40px;
        color: ${darkGray};
    }

    .main{
        width: 80%;
        float: left;
        padding: 8px 20px;
    }

    .controls{
        width: 20%;
        float: left;
        height: 120px;

        .button{
            width: 100%;
            border-bottom: 1px solid ${orange};

            &:last-child{
                border: 0;
            }

            height: 36px;
        }
    }
`;

export const StyledTopbar = styled(StyledForm)`
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .buttons {
        .run {
            padding: 20px 10px;
            width: 100%;
            span {
                font-size: 16px;
                text-transform: uppercase;
            }

            svg {
                margin-right: 10px;
            }
        }

        .options{
            margin-top: 10px;
            width: 100%;
            float: left;

            button {
                // margin-bottom: 5px;
            }
        }
    }

    .controls{
        .button{
            &.run{
                line-height: 29px;
                height: 49px;

                svg{
                    margin-top: 5px;
                }
            }
        }
    }
`;

export const StyledContent = styled.div`
    height: 100vh;
    width: 75vw;
    float: left;
    background: ${midGray};
`;

export const StyledItem = styled(StyledGeneric)`
    float: left;
    width: 100%;
    padding: 10px;
    border-bottom 1px solid ${borderLight};
`;

export const StyledResult = styled.div`
    float: left;
    width: 100%;
    background: ${midGray};

    .output, .result-set header{
        padding: 10px;
    }

    .output{

        .output-message{
            display: flex;
            align-items: center;
        }

        display: flex;

        strong{
            margin-right: 5px;
            margin-left: 5px;
        }

       .icon-c{

       }
    }

    .result-set{
        header {
            background: ${lightGray}
        }

        .list{
            overflow-x: auto;
            max-height: 480px;
        }
    }
`;

export const StyledKeyValueItem = styled(StyledItem)`
    margin-bottom: 10px;

    .key {
        font-weight: bold;
        margin-bottom: 3px;
        height: 20px;
        width: 80%;
        float: left;
    }

    .controls{
        width: 20%;
        float: left;
        .button{
            float: right;
            height: 20px;            
            width: auto;
            padding: 3px 8px;
        }
    }

    .value{
        width: 100%;
        float: left;
    }
`;

export const StyledButton = styled.button`
    border: none;
    cursor: pointer;
    outline: none;
    background: ${carrot};
    padding: 15px 10px;
    float: left;
    font-weight: 500;
    text-align: center;
    border-radius: 3px;

    display: flex;
    justify-content: center;
    align-items: center;

    &.green{
        border-bottom-color: #44bd32;
        background: #009432;
    }

    svg { 
        margin-right: 5px;
        float: left;

        &:last-child {
            float: none;
            margin: 0;
        }
    }

    &:hover{
        background: ${orange};
    }

    &.green:hover{
        background: #44bd32;
    }

    a#{&} { 
        text-decoration: none;
    }
`;

export const StyledRadialButton = styled.button`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${props => props.size}px;
    height: ${props => props.size}px;
    border-radius: ${props => props.size / 2}px;
    border: none;
    outline: none;
    background: ${colors.darkYellow};

    &:hover{
        background: ${colors.yellow};
    }

    svg{
        margin: 0;
    }
`;

export const StyledConnectionItem = styled(StyledItem)`
    float: left;
    width: 100%;
    padding: 0;

    .main {
        width: 85%
        float: left;
        padding: 5px 10px;
        cursor: pointer;

        &:hover, &.selected{
            background: ${midGray};
        }

        .name, .host, .port {
            height: 25px;
            margin: 0;
            line-height: 25px;
        }
    
        .name {
            float: left;
            width: 100%;
            font-weight: 500;
        }
    
        .host{
            width: 70%;
        }
    
        .port{
            width: 30%;
        }
    
        .host, .port {
            float: left;
            font-weight: 300;
        }
    }

    .controls {
        width: 15%
        float: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-evenly;
        height: 60px;

        .button{
            border: none;
            display: block;
            width: 100%;
            height: 30px;
            border-bottom: 1px solid ${orange};
            text-align: center;
            line-height: 30px;
            padding: 0;

            &:last-child{
                border: 0;
            }

            &.run{
                height: 32px;
                padding-top: 11px !important; 
                padding-bottom: 11px !important; 
            }
        }

        .button.run{
            padding-top: 11px !important; 
            padding-bottom: 11px !important; 
        }
    }
`;