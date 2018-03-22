import React, { Component } from 'react';
import './BitlyLinks.css'

class BitlyLinks extends Component{
  constructor(props) {
    super(props);
    this.state = {
      links: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.links) {
      var links = nextProps.links;
      links.sort((a, b) => a.updated_at < b.updated_at);
      this.setState({ links: links });
    }
  }

  getTitle = (link) => {
    return (!link.title ? link.long_url : link.title)
  }

  handleClickedShortLink = (e) => {
    var input = document.createElement('input');
    document.body.appendChild(input);
    input.value = e.target.text;
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
    this.props.toastNotify("Copied to your clipboard!");
  }

  listItems = () => {
    return  <div>
              <ul>
                { 
                  this.state.links.map( link => {
                    return  <li key={link.url}>
                              <div className="title">
                                <a className="article-title" href={link.long_url}>
                                  {this.getTitle(link)}
                                </a>
                              </div>
                              <div className="title-url">
                                <a className="article-subtitle" href={link.long_url}>{link.long_url}</a>
                              </div>
                              <div className="capsule">
                                <a onClick={this.handleClickedShortLink} className="short-url">{link.url}</a>  
                                <a className="info_page" href="">
                                  {Number(link.global_clicks).toLocaleString()}
                                </a>       
                              </div>
                            </li>
                  }) 
                }
              </ul>
            </div>
  }

  render() {
      return <div>{ this.listItems() }</div>
  }
}

export default BitlyLinks;