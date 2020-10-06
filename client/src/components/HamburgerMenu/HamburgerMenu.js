import React from 'react';
import { push as Menu } from 'react-burger-menu';
import './HamburgerMenu.css';
import { Link } from "@reach/router";

const HamburgerMenu = () => {
  return (
    <div id="outer-container">
      <Menu noOverlay disableAutoFocus pageWrapId={ "page-wrap" } width={ 250 }>
        <a id="profile" className="menu-item" href="/">PROFILE</a>
        <a id="library" className="menu-item" href="/about">LIBRARY</a>
        <Link to={"/"} id="signout" className="menu-item ma0 pointer">SIGN OUT</Link>
      </Menu>
    </div>
  );
}

export default HamburgerMenu;