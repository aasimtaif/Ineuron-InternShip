import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components";
import Center from './Center';
const StyledHeader = styled.header`
  background-color: #222;
`;
const Logo = styled(Link)`
  color:#fff;
  text-decoration:none;
  font-weight:bold;    
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;
const StyledNav = styled.nav`
  ${props => props.mobileNavActive ? `
    display: block;
  ` : `
    display: none;
  `}
  gap: 15px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px 20px 20px;
  background-color: #222;
  @media screen and (min-width: 768px) {
    display: flex;
    position: static;
    padding: 0;
  }
`;
const NavLink = styled(Link)`
  display: block;
  color:#aaa;
  text-decoration:none;
  padding: 10px 0;
  @media screen and (min-width: 768px) {
    padding:0;
  }
`;
const NavButton = styled.button`
  background-color: transparent;
  width: 30px;
  height: 30px;
  border:0;
  color: white;
  cursor: pointer;
  position: relative;
  z-index: 3;
  @media screen and (min-width: 768px) {
    display: none;
  }
`;
function Header() {
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <StyledHeader>
      <Center>
        <Wrapper>

          <Logo to='/'>Ecommerce</Logo>
          <StyledNav>
            <NavLink to="/" >Home</NavLink>
            <NavLink to="/products" >Products</NavLink>
            <NavLink to="/category" >Category</NavLink>
            <NavLink to="/cart" >Cart</NavLink>
            <NavLink to="/account" >Account</NavLink>

          </StyledNav>
        </Wrapper>
      </Center>
    </StyledHeader>
  )
}

export default Header