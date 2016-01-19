import React from "react"; // eslint-disable-line
import { Component } from "flumpt";
import Anzu from "anzu-js-sdk";


export class VideoComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mouseOver: false,
    };
  }
  componentDidUpdate() {
    if (this.props.activeSourceId !== "") {
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
      navigator.webkitGetUserMedia(
        constraints,
        function(stream){
          let video = document.getElementById("video");
          video.src = window.URL.createObjectURL(stream);
          video.play();
        },
        function(_e){
        }
      );
    }
  }
  handleVideoAction(e) {
    e.preventDefault();
    if (this.props.activeSourceId === "") {
      return;
    }
    if (this.props.isPlaying) {
      this.dispatch("stopAnzu");
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
    const settings = JSON.parse(window.localStorage.getItem("decapSettings"));
    let anzu = new Anzu("upstream");
    anzu.start(settings.channelId, settings.upstreamToken, constraints);
    this.dispatch("setAnzu", anzu);
  }
  handleMouseOver(_e) {
    this.setState({ mouseOver: true });
  }
  handleMouseLeave(_e) {
    this.setState({ mouseOver: false });
  }
  render() {
    let link = "";
    if (this.state.mouseOver && this.props.activeSourceId !== "") {
      if (this.props.isPlaying) {
        link = (
          <a className="video-button">
            <span className="icon icon-resize-full icon-stop"></span>
          </a>
        );
      }
      else {
        link = (
          <a className="video-button">
            <span className="icon icon-resize-full icon-play"></span>
          </a>
        );
      }
    }
    return (
      <div onMouseOver={this.handleMouseOver.bind(this)} onMouseLeave={this.handleMouseLeave.bind(this)} onClick={this.handleVideoAction.bind(this)}>
        { link }
        <video id="video"></video>
      </div>
    );
  }
}
