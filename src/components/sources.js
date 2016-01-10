import React from "react"; // eslint-disable-line
import { Component } from "flumpt";

export class SourcesComponent extends Component {
  handleSourceClick(sourceId, e) {
    e.preventDefault();
    this.dispatch("setActiveSource", sourceId);
  }
  render() {
    return(
      <ul className="list-group">
        {
          this.props.sources.map(function(s, i) {
            return (
              <li className={ this.props.activeSourceId == s.id ? "list-group-item active" : "list-group-item"}
              key={i} onClick={ this.handleSourceClick.bind(this, s.id) }>
                <div className="media-body">
                  <img className="img-circle media-object pull-left"
                    src={ s.thumbnail.toDataURL() } width="32" height="32" />
                  <strong>{ s.name }</strong>
                  <p>{ s.id }</p>
                </div>
              </li>
            );
          }.bind(this))
        }
      </ul>
    );
  }
}
