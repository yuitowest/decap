import React from "react"; // eslint-disable-line
import { Component } from "flumpt";
import { SourcesComponent } from "./sources";
import { VideoComponent } from "./video";


export class UpstreamComponent extends Component {
  componentDidMount() {
    this.dispatch("getSources");
  }
  render() {
    return (
      <div className="pane-group">
        <div className="pane pane-sm sidebar">
          <SourcesComponent {...this.props} />
        </div>
        <div className="pane">
          <VideoComponent {...this.props} />
        </div>
      </div>
    );
  }
}
