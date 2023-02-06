import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components/macro';
import theme from 'styled-theming';

import { useAuth } from 'brains/auth';
import { useTheme } from 'brains/theme';
// import { path2title } from 'utils/state';

import { mediaQuery, card } from 'styles/theme';

import icon_user from 'res/icons/user.svg';
import icon_home from 'res/icons/home2.svg';
import icon_sett from 'res/icons/settings2.svg';

const StyledLink = styled(Link)`
  height: 24px;

  & img {
    height: 24px;
  }
`;

const StyledFooter = styled.footer`
  ${mediaQuery('tablet')} {
    display: none;
  };
  
  ${theme('theme', card)}
  color: #000;
  z-index: 10;
  /* height: 108px; */
  flex-shrink: 0;
  border-radius: 20px 20px 0 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 16px;

  & h1 {
    margin: auto auto auto 0;
    font-weight: normal;
  }
`;


const Footer = () => {
  // const { pathname } = useLocation();
  const { username, picture } = useAuth().user;
  console.log(picture);
  const { activeTheme, toggleTheme } = useTheme();
  return (
    <StyledFooter>
      <StyledLink to="/"><img src={icon_home} /></StyledLink>
      <StyledLink to="/"><img src={icon_user} /></StyledLink>
      <StyledLink to="/"><img src={icon_sett} /></StyledLink>
    </StyledFooter>
  );
};

export default Footer;
