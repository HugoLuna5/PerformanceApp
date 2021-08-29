function loadUIGraphicsControllers(graphics) {
  sizeGraphicsAdapter.textContent = "Adaptadores graficos: " + graphics.length;
  for (let i = 0; i < graphics.length; i++) {
    var model =
      '<div class="form-group"><label for="model' +
      i +
      '">Modelo</label><input type="text" disabled value="' +
      graphics[i].model +
      '" class="form-control"/> </div>  ';

    containerGraphicsControllers.innerHTML += model;

    var more =
      '<div class="row"> <div class="col"> <div class="form-group"><label for="bus' +
      i +
      '">BUS</label><input type="text" disabled value="' +
      graphics[i].bus +
      '" class="form-control"/></div></div>  <div class="col"> <div class="form-group"><label for="vram' +
      i +
      '">VRAM</label><input type="text" disabled value="' +
      graphics[i].vram +
      '" class="form-control"/></div></div> </div> </br> <hr>';
    containerGraphicsControllers.innerHTML += more;
  }
}
