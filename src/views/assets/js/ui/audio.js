function loadUIAudioAdapters(adapters) {
  for (let i = 0; i < adapters.length; i++) {
    let item =
      '<li class="list-group-item">' +
      adapters[i].manufacturer +
      " " +
      adapters[i].name +
      "</li>";
    containerAudioControllers.innerHTML += item;
  }
}
