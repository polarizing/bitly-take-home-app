import React, { Component } from 'react';
import Header from './Header';
import './App.css'

class App extends Component {
  render() {
    return (
      <div id="container">
        <Header />
        <div className="container container-pod">
          <h1 className="page-title">
            SHORTEN. SHARE. MEASURE.
          </h1>
          <div class="join-bitly">
            Join Bitly, the world's leading link management platform.
          </div>
          <div id="form-container">
            <form method="POST" action="/" name="shortenUrl">
              <fieldset class="cf">
                <input spellcheck="false" autoFocus placeholder="Paste a link to shorten it" id="shorten_url"></input>
                <input id="shorten_btn" value="Shorten"></input>
              </fieldset>
            </form>
          </div>
          <div id="link-container">
            <div>
              <ul>
                <li>
                  <div class="title">
                    <a class="article-title" href="http://google.com">google.com/</a>
                  </div>
                  <div class="title-url">
                    <a class="article-subtitle" href="http://google.com/">google.com/</a>
                  </div>
                  <div class="capsule">
                    <a class="short-url">http://bit.ly/2px4Ok3</a>  
                    <a class="info_page" href="">
                      0
                    </a>                  
                  </div>

                </li>
                <li>
                  <div class="title">
                    <a class="article-title" href="http://google.com">google.com/</a>
                  </div>
                  <div class="title-url">
                    <a class="article-subtitle" href="http://google.com/">google.com/</a>
                  </div>
                  <div class="capsule last">
                    <a class="short-url">http://bit.ly/2px4Ok3</a>
                    <a class="info_page" href="">
                      18,659,223
                    </a>
                  </div>

                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;