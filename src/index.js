import React from "react"; // eslint-disable-line
import { Flux } from "flumpt";
import { render } from "react-dom";
import { DecapComponent } from "./components/decap";

let desktopCapturer = global.require("electron").desktopCapturer;

class Decap extends Flux {
  subscribe() {
    this.on("getSources", () => {
      desktopCapturer.getSources({
        types: [
          "window",
          "screen"
        ]
      }, function(_error, sources) {
        return this.update(state => {
          state.sources = sources;
          return state;
        });
      }.bind(this));
    });
    this.on("setActiveSource", (sourceId) => {
      return this.update(state => {
        if (!state.isPlaying) {
          state.activeSourceId = sourceId;
        }
        return state;
      });
    });
    this.on("setAnzu", (anzu) => {
      return this.update(state => {
        state.anzu = anzu;
        state.isPlaying = true;
        return state;
      });
    });
    this.on("updatePage", (page) => {
      return this.update(state => {
        state.page = page;
        return state;
      });
    });
  }
  render(state) {
    return <DecapComponent {...state} />;
  }
}

const decap = new Decap({
  renderer: el => {
    render(el, document.querySelector("#app"));
  },
  initialState: {
    page: "upstream",
    activeSourceId: "",
    isPlaying: false,
    anzu: null,
    sources: []
  },
  middlewares: [
  ]
});

decap.update(state => (state));
