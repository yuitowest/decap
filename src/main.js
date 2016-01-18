import app from "app";
import BrowserWindow from "browser-window";
import crashReporter from "crash-reporter";
crashReporter.start();

let mainWindow = null;

function newMainWindow() {
  if (mainWindow !== null) {
    return;
  }
  mainWindow = new BrowserWindow({
    width: 860,
    height: 535,
    resizable: false,
    "accept-first-mouse": true,
    "title-bar-style": "hidden"
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  if (process.env.NODE_ENV !== "production") {
      mainWindow.openDevTools();
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("ready", () => {
  newMainWindow();
});

app.on("activate-with-no-open-windows", () => {
  newMainWindow();
});
