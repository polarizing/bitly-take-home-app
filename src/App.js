import React, { Component } from 'react';
import Header from './Header';
import BitlyLinks from './BitlyLinks';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sdk: new window.BitlySDK({
          login: 'polarizing',
          apiKey: 'R_85b64fdcc7804c37a7cad8eb6b469eb9'
        }),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const cachedLinks = JSON.parse(sessionStorage.getItem('links'));
    this.setState( {
      links: cachedLinks
    })
    console.log(cachedLinks);
  }

  handleClick(e) {
    e.preventDefault();
    var bitly = this.state.sdk;
    var data = {}
    bitly.shorten("http://www.google.com/").then(function(result) {
      data.url = result.url;
      data.long_url = result.long_url;
      data.hash = result.hash;
      return bitly.info(result.url)
    })
    .then(function(result) {
      data.created_at = result.created_at;
      data.title = result.title;
      return bitly.clicks([data.url]);
    })
    .then(function(result) {
      data.global_clicks = result[0].global_clicks;
      var links = JSON.parse(sessionStorage.getItem("links")) || {};
      links[data.url] = data;
      console.log(data);
      sessionStorage.setItem("links", JSON.stringify(links));
    })
  }

  render() {
    return (
      <div id="container">
        <Header />
        <div className="container container-pod">
          <h1 className="page-title">
            SHORTEN. SHARE. MEASURE.
          </h1>
          <div className="join-bitly">
            Join Bitly, the world's leading link management platform.
          </div>
          <div id="form-container">
            <form method="POST" action="/" name="shortenUrl">
              <fieldset className="cf">
                <input spellCheck="false" autoFocus placeholder="Paste a link to shorten it" id="shorten_url"></input>
                <input id="shorten_btn" value="Shorten" readOnly onClick={this.handleClick} ></input>
              </fieldset>
            </form>
          </div>

          <div id="link-container">
            <BitlyLinks links={ this.state.links } />
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;