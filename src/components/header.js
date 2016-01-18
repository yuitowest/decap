import React from "react"; // eslint-disable-line
import { Component } from "flumpt";


export class HeaderComponent extends Component {
  handleChangePage(page, e) {
    e.preventDefault();
    this.dispatch("updatePage", page);
  }
  render() {
    let buttonClass = "btn btn-default";
    let buttonActiveClass = "btn btn-default active";
    return(
      <header className="toolbar toolbar-header">
        <h1 className="title">decap</h1>
        <div className="toolbar-actions">
          <div className="btn-group pull-right">
            <button className={this.props.page === "upstream" ? buttonActiveClass : buttonClass}
             onClick={this.handleChangePage.bind(this, "upstream")}>
              <span className="icon icon-upload"></span>
            </button>
            <button className={this.props.page === "downstream" ? buttonActiveClass : buttonClass}
             onClick={this.handleChangePage.bind(this, "downstream")}>
              <span className="icon icon-download"></span>
            </button>
            <button className={this.props.page === "settings" ? buttonActiveClass : buttonClass}
             onClick={this.handleChangePage.bind(this, "settings")}>
              <span className="icon icon-cog"></span>
            </button>
          </div>
        </div>
      </header>
    );
  }
}
