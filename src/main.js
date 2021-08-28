const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");

const path = require("path");
const os = require("os");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "/preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("src/views/index.html");
  var ram = formatBytes(os.totalmem());
  var freeRam = formatBytes(os.freemem());
  let proc = exec("ls /Applications");
  let results = "";
  proc.stdout.on("data", (data) => {
    results += `${data}`;
  });
  proc.on("close", async (code) => {
    console.log(results);
  });

  var data = {
    ram: ram,
    free: freeRam,
    cpu: os.cpus(),
    network: os.networkInterfaces(),
    arch: os.arch(),
    systemName: os.type(),
    platform: os.platform(),
  };

  mainWindow.webContents.send("data", data);

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();
}

function sysProfileTxtToJson(data) {
  return (
    new Promise() <
    any >
    ((res) => {
      let stream = new Readable();
      stream.push(data);
      stream.push(null);

      let lineReader = createInterface(stream);
      let apps = { Applications: [] };
      let lastEntry = "";
      let appPrefix = "    ";
      let appPropertyPrefix = "      ";
      let lastToggle,
        props = false;
      lineReader.on("line", (line) => {
        if (line == "" && !lastToggle) {
          props = false;
          return;
        }

        if (line.startsWith(appPrefix) && !props) {
          lastEntry = line.trim().replace(":", "");
          lastToggle = true;
          let current = {};
          current["ApplicationName"] = lastEntry;
          apps.Applications.push(current);
          props = true;
          return;
        }

        if (line.startsWith(appPropertyPrefix) && props) {
          lastToggle = false;
          let tokens = line.trim().split(":");
          let last = apps.Applications[apps.Applications.length - 1];
          last[tokens[0]] = tokens[1].trim();
        }
      });

      lineReader.on("close", () => {
        res(apps);
      });
    })
  );
}

function formatBytes(a, b = 2, k = 1024) {
  with (Math) {
    let d = floor(log(a) / log(k));
    return 0 == a
      ? "0 Bytes"
      : parseFloat((a / pow(k, d)).toFixed(max(0, b))) +
          " " +
          ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d];
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
