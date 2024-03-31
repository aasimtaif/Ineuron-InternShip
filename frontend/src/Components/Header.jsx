import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import styled from "styled-components";
import Center from './Center';
import Bars from './icons/Bars';
import Input from "./Input"
import { useLocation } from 'react-router-dom'

const StyledHeader = styled.header`
  background-color: #222;
  padding: 10px 40px;
  input{
    width: 100%;
    margin:  auto;
    padding: 2px;
    display: block;
    border-radius: 5px;
    @media screen and (min-width: 450px) {
    display: none;
    }
  
  }
`;
const Logo = styled(Link)`
  color:#fff;
  font-size: 1.3rem;
  font-weight: 600;
  text-decoration:none;
  position: relative;
  z-index: 3;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  input{
    width: 50%;
    padding: 2px;
    display: none;
    border-radius: 5px;
    @media screen and (min-width: 450px) {
      display: block;
    }
  
  }
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
  @media screen and (min-width: 800px) {
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
  const { cart } = useSelector(state => state.counter)
  const pathname = useLocation();
  useEffect(() => {
    setMobileNavActive(!mobileNavActive)
  }, [pathname]);
  return (
    <StyledHeader>
      <Wrapper>
        <Logo to='/'>Ecommerce</Logo>
        <input placeHolder="  Search product..." />

        <StyledNav mobileNavActive={mobileNavActive}>
          <NavLink to="/" >Home</NavLink>
          <NavLink to="/products" >Products</NavLink>
          {/* <NavLink to="/category" >Category</NavLink> */}
          <NavLink to="/cart" >Cart({cart?.length})</NavLink>
          <NavLink to="/account" >Account</NavLink>

        </StyledNav>

        <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
          <Bars />
        </NavButton>

      </Wrapper>
      <input placeHolder="   Search product..." />
    </StyledHeader>
  )
}

export default Header