import React from "react"; // eslint-disable-line
import { Component } from "flumpt";

export class VideoComponent extends Component {
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
  render() {
    return(
      <video id="video"></video>
    );
  }
}
