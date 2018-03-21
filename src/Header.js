import React, { Component } from 'react';
import './Header.css'

class Header extends Component{
   render() {
      return <header id="header">
        <div id="header-inner">
          <div className="container">
            <h1 className="header-logo">
            	bitly
            </h1>
            <div className="navigation" role="navigation">
              <ul>
                <li>
                  <a href="/">Tour</a>
                </li>
                <li>
                  <a href="/">Enterprise</a>
                </li>
                <li>
                  <a href="/">Resources</a>
                </li>
                <li>
                  <a href="/">About</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
      }
}

export default Header;