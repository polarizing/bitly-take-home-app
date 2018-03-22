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
    var links = [];
    Object.keys( nextProps.links ).map(key => links.push( nextProps.links[key] ));
    links.sort((a, b) => a.created_at > b.created_at);
    this.setState({ links: links });
  }

  getTitle = (link) => {
    return (!link.title ? link.long_url : link.title)
  }

  listItems = () => {
    console.log(this.state.links);
    return  <div>
              <ul>
                { 
                  this.state.links.map( link => {
                    console.log(link);
                    return  <li key={link.url}>
                              <div className="title">
                                <a className="article-title" href="{}">
                                  {this.getTitle(link)}
                                </a>
                              </div>
                              <div className="title-url">
                                <a className="article-subtitle" href={link.long_url}>{link.long_url}</a>
                              </div>
                              <div className="capsule">
                                <a className="short-url">{link.url}</a>  
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
      return <div>{this.listItems()}</div>
  }
}

export default BitlyLinks;