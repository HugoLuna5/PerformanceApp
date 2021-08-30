function loadUIIO(networkStats) {
  for (let i = 0; i < networkStats.length; i++) {
    let title = "<h5>Adaptador " + networkStats[i].iface + "</h5>";
    containerIO.innerHTML += title;

    let info =
      '<div class="row">  <div class="col"> <div class="form-group"><label for="recibido' +
      i +
      '">Recibidos</label><input type="text" value="' +
      formatBytes(networkStats[i].tx_bytes) +
      '" disabled class="form-control"/></div>  </div>  <div class="col"> <div class="form-group"><label for="envio' +
      i +
      '">Enviados</label><input type="text" value="' +
      formatBytes(networkStats[i].rx_bytes) +
      '" disabled class="form-control" /></div>  </div>   </div></br><hr>';
    containerIO.innerHTML += info;
  }
}
