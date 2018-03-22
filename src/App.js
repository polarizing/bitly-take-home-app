import React, { Component } from 'react';
import Header from './Header';
import BitlyLinks from './BitlyLinks';
import './App.css'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sdk: new window.BitlySDK({
          // login: process.env.REACT_APP_API_LOGIN,
          // apiKey: process.env.REACT_APP_API_KEY
          login: 'polarizing',
          apiKey: 'R_85b64fdcc7804c37a7cad8eb6b469eb9'
        }),
      url_to_shorten: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
  }

  componentDidMount() {
    sessionStorage.clear();
    const cachedLinks = JSON.parse(sessionStorage.getItem('links'));
    this.setState( {
      links: cachedLinks
    })
  }

  handleChange(event) {
    this.setState({url_to_shorten: event.target.value}, function() {
      console.log(this.state);
    });
  }

  handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitElement.click();
    }
  }

  handleClick(e) {
    e.preventDefault();
    var self = this;
    var bitly = this.state.sdk;
    var data = {}
    var link = this.state.url_to_shorten;
    link = (link.indexOf('://') === -1) ? 'http://' + link : link;

    /* 
      Adds URL, Long URL, and Hash Code to data object
      using bitly's shorten(shorturl) api call.
    */
    bitly.shorten(link).then(function(result) {
      data.url = result.url;
      data.long_url = result.long_url;
      data.hash = result.hash;
      return bitly.info(result.url)
    })
    /* 
      Adds Created At and Title to data object
      using bitly's info(shorturl) api call.
    */
    .then(function(result) {
      data.updated_at = + Math.round(new Date() / 1000);
      data.title = result.title;
      return bitly.clicks([data.url]);
    })
    /* 
      Adds Clicks to data object
      using bitly's clicks(shorturl) api call.
    */
    .then(function(result) {
      data.global_clicks = result[0].global_clicks;
      var links = JSON.parse(sessionStorage.getItem("links")) || [];
      var foundIndex = links.findIndex(obj => obj.hash === data.hash);
      if (foundIndex > -1) {
        data.updated_at = + Math.round(new Date() / 1000);
        links[foundIndex] = data;
      }
      else links.push(data);
      links.sort((a, b) => a.updated_at < b.updated_at);
      sessionStorage.setItem("links", JSON.stringify(links));
      self.setState({ links: links })
    })
    .catch(function(error) {
      switch(error.message) {
        case "500 INVALID_URI": console.log("INVALID_URI"); break;
        case "500 INVALID_APIKEY": console.log("INVALID API KEY"); break;
        case "500 MISSING_ARG_ACCESS_TOKEN": console.log("Missing Access Token"); break;
        default: console.log("Error.");
      }
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
                <input onKeyPress={this.handleOnKeyPress} onChange={this.handleChange} value={this.state.url_to_shorten} spellCheck="false" autoFocus placeholder="Paste a link to shorten it" id="shorten_url"></input>
                <input ref={elem => this.submitElement = elem} id="shorten_btn" value="Shorten" readOnly onClick={this.handleClick} ></input>
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