import styled, { css } from "styled-components";

const primary = '#0D3D29';
export const ButtonStyle = css`
  border:0;
  background-color: #e8e8e8;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  display: flex;
  justify-content: center;
  text-decoration: none;
  font-family: 'Poppins', sans-serif;
  font-weight:500;
  svg{
    height: 16px;
    margin-right: 5px;
  }
  ${props => props.block && css`
  
  padding : 0 0;
    display: block;
    width: 50%;
    font-weight: 700;
  `}
  ${props => props.white && !props.outline && css`
    background-color: #fff;
    color: #000;
  `}
  ${props => props.white && props.outline && css`
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
  `}
  ${props => props.black && !props.outline && css`
    background-color: #000;
    color: #fff;
  `}
  ${props => props.black && props.outline && css`
    background-color: transparent;
    color: #000;
    border: 1px solid #000;
  `}
  ${props => props.primary && !props.outline && css`
    background-color: ${primary};
    border: 1px solid ${primary};
    color:#fff;
  `}
  ${props => props.primary && props.outline && css`
    background-color: transparent;
    border: 1px solid ${primary};
    color:${primary};
  `}
  ${props => props.size === 'l' && css`
    font-size:1.2rem;
    padding: 10px 20px;
    svg{
      height: 20px;
    }
  `}
  ${props => props.red  && css`
    background-color: #BF0000;
    color: #fff;
    border: 1px solid #ff0000;
  `}
`;

const StyledButton = styled.button`
  ${ButtonStyle}
`;

export default function Button({ children, ...rest }) {
    return (
        <StyledButton {...rest}>{children}</StyledButton>
    );
}