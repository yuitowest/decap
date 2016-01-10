import React from "react"; // eslint-disable-line
import { Component } from "flumpt";
import Anzu from "anzu-js-sdk";
import { CHANNEL_ID, UPSTREAM_TOKEN } from "../constants";


export class HeaderComponent extends Component {
  handleStart(e) {
    e.preventDefault();
    if (this.props.activeSourceId === "") {
      return;
    }
    let constraints =  {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: this.props.activeSourceId,
          minWidth: 640,
          maxWidth: 640,
          minHeight: 480,
          maxHeight: 480
        }
      }
    };
    let anzu = new Anzu("upstream");
    anzu.start(CHANNEL_ID, UPSTREAM_TOKEN, constraints);
    this.dispatch("setAnzu", anzu);
  }
  render() {
    return(
      <header className="toolbar toolbar-header">
        <h1 className="title">decap</h1>
        <div className="toolbar-actions">
          <button className="btn btn-default pull-right" onClick={ this.handleStart.bind(this) }>
            <span className="icon icon-play"></span>
          </button>
        </div>
      </header>
    );
  }
}
