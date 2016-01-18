import React from "react"; // eslint-disable-line
import { Component } from "flumpt";

export class SettingsComponent extends Component {
  handleSubmit(e) {
    e.preventDefault();
    this.dispatch("updateSettings",
        this.refs.channelId.value.trim(), this.refs.upstreamToken.value.trim());
    return false;
  }
  render() {
    return (
      <div className="pane-more">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>チャネルID</label>
            <input type="text" className="form-control"
             ref="channelId" defaultValue={this.props.settings.channelId} />
          </div>
          <div className="form-group">
            <label>配信用トークン</label>
            <input type="text" className="form-control"
             ref="upstreamToken" defaultValue={this.props.settings.upstreamToken} />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-form btn-primary">保存</button>
          </div>
        </form>
      </div>
    );
  }
}
