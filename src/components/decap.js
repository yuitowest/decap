import React from "react"; // eslint-disable-line
import { Component } from "flumpt";
import { HeaderComponent } from "./header";
import { UpstreamComponent } from "./upstream";
import { DownstreamComponent } from "./downstream";
import { SettingsComponent } from "./settings";

export class DecapComponent extends Component {
  render() {
    return(
      <div className="window">
        <HeaderComponent {...this.props} />
        <div className="window-content">
          {(() => {
            switch (this.props.page) {
              case "upstream": return <UpstreamComponent {...this.props} />;
              case "downstream": return <DownstreamComponent {...this.props} />;
              case "settings": return <SettingsComponent {...this.props} />;
              default: return <UpstreamComponent {...this.props} />;
            }
          })()}
        </div>
      </div>
    );
  }
}
