function loadUINetworkAdapters(adapters) {
  sizeNetworkAdapter.textContent = "Adaptadores de red: " + adapters.length;
  for (let i = 0; i < adapters.length; i++) {
    var type =
      '<div class="form-group"><label for="typeNetworkAdapter' +
      i +
      '">Tipo de adaptador</label>';
    containerNetworkAdapters.innerHTML += type;
    var input =
      '<input type="text" disabled id="typeNetworkAdapter' +
      i +
      ' name="typeNetworkAdapter' +
      i +
      '" class="form-control" value="' +
      adapters[i].iface +
      " - " +
      adapters[i].ifaceName +
      '" /></div>';
    containerNetworkAdapters.innerHTML += input;

    var ip =
      '<div class="row"><div class="col"> <div class="form-group"> <label for="ip' +
      i +
      '">IPV4</label><input value="' +
      adapters[i].ip4 +
      '" type="text" disabled name="ip' +
      i +
      '" id="ip' +
      i +
      '" class="form-control" /></div> </div>  <div class="col"> <div class="form-group"> </div> <label for="subnet' +
      i +
      '">SubNet</label> <input value="' +
      adapters[i].ip4subnet +
      '" type="text" disabled name="subnet' +
      i +
      ' id="subnet' +
      i +
      ' class="form-control" />  </div>  <div>';

    containerNetworkAdapters.innerHTML += ip;

    var mac =
      '<div class="form-group"><label for="macAddress' +
      i +
      '">Dirección MAC</label> <input value="' +
      adapters[i].mac +
      '" disabled type="text" name="macAddress' +
      i +
      '" id="macAddress' +
      i +
      '" class="form-control"/> </div> </br> <hr>';

    containerNetworkAdapters.innerHTML += mac;
  }
}
