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

export const StyledTopbar = styled.form`
    width: 100%;
    padding: 20px;
    background: ${lightGray};
`;

export const StyledContent = styled.div`
    height: 100vh;
    width: 75%;
    float: left;
    background: ${midGray};
`;

export const StyledItem = styled(StyledGeneric)`
    padding: 10px;
    border-bottom 1px solid ${borderLight};
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
        }
    }
`;

export const StyledButton = styled.div`
    cursor: pointer;
    background: ${carrot};
    padding: 10px;
    float: left;
    font-weight: 500;

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

    a#{&} { 
        text-decoration: none;
    }
`;