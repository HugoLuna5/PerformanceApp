function loadUIDisks(diskLayout) {
  for (let i = 0; i < diskLayout.length; i++) {
    containerDisks.innerHTML += "<h5>Unidad " + (1 + i) + "</h5>";

    let nom =
      '<div class="row">  <div class="col"> <div class="form-group"> <label for="nameDisk' +
      i +
      '">Nombre</label><input type="text" disabled value="' +
      diskLayout[i].name +
      '" class="form-control"/></div>  </div> <div class="col"> <div class="form-group"><label for="interfaceDisk' +
      i +
      '">Interface</label><input type="text" disabled value="' +
      diskLayout[i].interfaceType +
      '" class="form-control"/></div></div>  </div>';

    containerDisks.innerHTML += nom;

    let type =
      '<div class="row">  <div class="col"> <div class="form-group"> <label for="typeDisk' +
      i +
      '">Tipo</label><input type="text" disabled value="' +
      diskLayout[i].type +
      '" class="form-control"/></div>  </div> <div class="col"> <div class="form-group"><label for="sizeDisk' +
      i +
      '">Tamaño</label><input type="text" disabled value="' +
      formatBytes(diskLayout[i].size) +
      '" class="form-control"/></div></div>  </div></br><hr>';
    containerDisks.innerHTML += type;
  }
}
