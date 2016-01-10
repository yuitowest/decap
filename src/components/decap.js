import React from "react"; // eslint-disable-line
import { Component } from "flumpt";
import { HeaderComponent } from "./header";
import { SourcesComponent } from "./sources";
import { VideoComponent } from "./video";

export class DecapComponent extends Component {
  componentDidMount() {
    this.dispatch("getSources");
  }
  render() {
    return(
      <div className="window">
        <HeaderComponent activeSourceId={ this.props.activeSourceId } />
        <div className="window-content">
          <div className="pane-group">
            <div className="pane pane-sm sidebar">
              <SourcesComponent sources={ this.props.sources } activeSourceId={ this.props.activeSourceId } />
            </div>
            <div className="pane">
              <VideoComponent activeSourceId={ this.props.activeSourceId } />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
