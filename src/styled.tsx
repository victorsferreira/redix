import styled from "styled-components";

const darkGray = '#1d1e1f';
const midGray = '#2f3031';
const lightGray = '#39393a';
const borderLight = 'rgb(80,80,80)';
const carrot = '#e67e22';
const orange = '#f39c12';

export const StyledGeneric = styled.div`
    font-color: white;
    font-size: 14px;
    letter-spacing: 0.2px;
    margin: 0;
    padding: 0;
`;

export const StyledSidebar = styled.div`
    height: 100vh;
    width: 25%;
    float: left;
    background: ${darkGray};
    overflow-x: auto;

    .create-connection{
        svg{
            margin-top: 1px;
        }
    }
`;

export const StyledForm = styled.form`
    width: 100%;
    background: ${darkGray};
    float: left;
    border-left: 1px solid ${lightGray};
    border-bottom: 1px solid ${borderLight};

    input[type="text"], input[type="password"], select {
        height: 40px;
        width: 265px;
        border-radius: 20px;
        padding-left: 10px;
        padding-right: 10px;
        letter-spacing: 1px;
        font-size: 16px;
        background: white;
        color: ${darkGray};

        margin: 5px;
    
        border: 0;
        outline: 0;

        &.big{
            width: 430px;
        }

        &.small{
            width: 100px;
        }
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
    width: 75%;
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

export const StyledButton = styled.div`
    cursor: pointer;
    background: ${carrot};
    padding: 10px;
    float: left;
    font-weight: 500;

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

export const StyledConnectionItem = styled(StyledItem)`
    float: left;
    width: 100%;
    padding: 0;

    .main {
        width: 75%
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
        width: 25%
        float: left;

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