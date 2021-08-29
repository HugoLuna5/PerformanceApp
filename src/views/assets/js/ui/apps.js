function loadUIAllApps(apps) {
  for (let i = 1; i < apps.length; i++) {
    let str = apps[i].replace(/\s/g, "");
    if (str !== "") {
      let item = '<li class="list-group-item">' + apps[i] + "</li>";
      containerListApps.innerHTML += item;
    }
  }
}
