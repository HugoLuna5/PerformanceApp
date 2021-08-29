const { app, BrowserWindow, ipcMain } = require("electron");
const { exec } = require("child_process");
const si = require("systeminformation");

var osu = require("node-os-utils");
var cpuInfoOsu = osu.cpu;

const path = require("path");
const os = require("os");
const Store = require("./store.js");

const store = new Store({
  // We'll call our data file 'user-preferences'
  configName: "user-preferences",
  defaults: {
    // 800x600 is the default size of our window
    token: "",
  },
});

var indexWindow = null;
/**
 * Mostrar la ventana de configuracion
 */
function showConfigWindow() {
  const configWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "views/assets/img/logo.png"),
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "/preload.js"),
    },
    title: "PIC",
  });

  // and load the index.html of the app.
  configWindow.loadFile("src/views/config.html");
}

function showIndexWindow() {
  indexWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, "views/assets/img/logo.png"),
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "/preload.js"),
    },
    title: "PIC",
  });

  // and load the index.html of the app.
  indexWindow.loadFile("src/views/index.html");
  getInfo();
}

function getInfo() {
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

  si.cpu()
    .then((cpuInfo) => {
      cpuInfoOsu.usage().then((cpuPercentage) => {
        var data = {
          ram: ram,
          free: freeRam,
          cpu: cpuInfo,
          cpuPercentage: cpuPercentage,
          network: os.networkInterfaces(),
          arch: os.arch(),
          systemName: os.type(),
          platform: os.platform(),
        };

        indexWindow.webContents.send("data", data);
      });
    })
    .catch((error) => console.error(error));
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

ipcMain.on("saveToken", function (event, args) {
  store.set("token", args);
});

ipcMain.on("newCPUInfo", function (event, arg) {
  cpuInfoOsu.usage().then((cpuPercentage) => {
    var data = cpuPercentage;
    indexWindow.webContents.send("responseNewCPUInfo", data);
  });
});

ipcMain.on("newInfo", function (event, args) {
  getInfo();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  let token = store.get("token");
  console.log(token);

  if (token == "") {
    showConfigWindow();
  } else {
    showIndexWindow();
  }

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
