import React from 'react'
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../store/store';
const primary = '#0D3D29';
export const ButtonStyle = css`
  border:0;
  background-color: #e8e8e8;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
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
`;
const StyledButton = styled.button`
  ${ButtonStyle}
`;

const Quantity = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0 10px;
  color: #fff;
  ${props => props.primary && props.outline && css`
  color:${primary};
`}
${props => props.block && css`
  
padding : 0 0;
  display: block;
  width: 50%;
  font-weight: 700;
`}
`;
const ButtonDiv = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;`

function AddSubButton({ children, product, ...rest }) {
  const dispatch = useDispatch();
  const quantity = useSelector(state => state.counter.cart.find(({ _id }) => _id === product?._id)?.quantity)
  console.log(quantity)
  return (
    <ButtonDiv>
      <StyledButton {...rest} onClick={() => { dispatch(decrementQuantity(product)) }}>-</StyledButton>
      <Quantity {...rest}>{quantity}</Quantity>
      <StyledButton {...rest} onClick={() => { dispatch(incrementQuantity(product)) }}>+</StyledButton>
    </ButtonDiv>
  )
}

export default AddSubButton