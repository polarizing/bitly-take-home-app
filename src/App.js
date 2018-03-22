import React, { Component } from 'react';
import Header from './Header';
import BitlyLinks from './BitlyLinks';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
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
      url_to_shorten: '',
      submitText: 'Shorten'
    };
    this.clearInputField = this.clearInputField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  clearInputField(e) {
    e.preventDefault();
    this.setState({url_to_shorten: "", submitText: 'Shorten'});
  }

  copyInputFieldToClipboard() {
      this.urlElement.select();
      document.execCommand('copy');
      this.notify("Copied to your clipboard!");
  }

  handleChange(event) {
    if (this.state.submitText === 'Copy') this.setState({submitText: 'Shorten'});
    this.setState({url_to_shorten: event.target.value});
  }

  handleOnKeyPress(event) {
    if (event.key === 'Enter') {
      this.submitElement.click();
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    if (this.state.submitText === 'Copy') {
      this.copyInputFieldToClipboard();
      return;
    }

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
      self.setState({ links: links, url_to_shorten: data.url, submitText: 'Copy'})
      self.urlElement.select();
    })
    .catch(function(error) {
      console.log(error.message);
      switch(error.message) {
        case "500 ALREADY_A_BITLY_LINK": self.notify("The URL is already shortened!"); break;
        case "500 INVALID_URI": self.notify("Please make sure your URL is valid."); break;
        case "500 INVALID_APIKEY": self.notify("API key is invalid."); break;
        case "500 MISSING_ARG_ACCESS_TOKEN": self.notify("Missing access token."); break;
        default: self.notify("Uh-oh. Something is not right.");
      }
    })
  }

  notify = (message) => {
    toast.error(message, {
      position: toast.POSITION.TOP_CENTER,
      className: css({
        fontFamily: 'Brandon Grotesque',
        textAlign: 'center',
        fontSize: '16',
        background: '#ee6123'
      })
    });
  }

  render() {
    return (
      <div id="container">
        <ToastContainer autoClose={3000} />
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
                <div className="urlInputContainer">
                  <a onClick={this.clearInputField} style={{ display: this.state.submitText === 'Copy' ? 'block' : 'none' }} href="#" id="clear_active_shorten" title="Clear shorten box">X</a>
                  <input ref={elem => this.urlElement = elem} onKeyPress={this.handleOnKeyPress} onChange={this.handleChange} value={this.state.url_to_shorten} spellCheck="false" autoFocus placeholder="Paste a link to shorten it" id="shorten_url"></input>
                </div>
                <input ref={elem => this.submitElement = elem} id="shorten_btn" value={this.state.submitText} readOnly onClick={this.handleSubmit} ></input>
              </fieldset>
            </form>
          </div>

          <div id="link-container">
            <BitlyLinks toastNotify={ this.notify } links={ this.state.links } />
          </div>
        </div>
      </div>
    );
  }
}

export default App;