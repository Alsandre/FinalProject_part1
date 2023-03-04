export const SHIPMENTS_LIST = [];
export let isBurgerOpen = false;

export let selectedShipmentId;

export const $ = (id) => document.getElementById(id);

export function swap(id1, id2) {
  if(id1 === 'burger-cross') {
    isBurgerOpen = false;
  }
  $(id1).style.display = "none";
  $(id2).style.display = "block";
  if (id1 === "burger-lines") {
    $("list-of-shipments").style.display = "block";
    // $("list-of-shipments").style.marginTop = "80px";
    $("search-bar").style.display = "none";
    $("information-of-shipment").style.display = "none";
  } else if (id1 === "burger-cross") {
    $("list-of-shipments").style.display = "none";
    $("search-bar").style.display = "block";
    $("information-of-shipment").style.display = "block";
  }
}

export const burgerSH = () => {
  switch (isBurgerOpen) {
    case true:
      swap("burger-cross", "burger-lines");
      break;
    case false:
      swap("burger-lines", "burger-cross");
      break;
  }
  isBurgerOpen = !isBurgerOpen;
};

export const mobileSearch = () => {
  $("search-placeholder").style.display = "none";
  $("input-cover").style.display = "none";
};

export const mobileSearchOut = (e) => {
  if (e.target.value !== "") {
    $("search-placeholder").style.display = "none";
  } else {
    $("search-placeholder").style.display = "block";
    $("input-cover").style.display = "block";
  }
};

export function selectShipment(id) {
  clearPreviousSelection(selectedShipmentId);
  selectedShipmentId = id;
  let selection = SHIPMENTS_LIST.find((el) => el.id === id);
  let boxes;
  let headerNode = $("shipment-header");
  let contactNode = $("shipment-contact");
  let boxesNode = $("shipment-boxes");
  let cargoNode = $("shipment-bays");

  $(id).style.background =
    "linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)";
  $(`a_${id}`).style.color = "white";

  headerNode.textContent = selection.name;
  contactNode.textContent = selection.email;
  if (selection.boxes === null) {
    boxesNode.placeholder = "Please enter boxes";
    boxesNode.value = "";
    boxes = "";
  } else {
    boxesNode.value = selection.boxes;
    boxes = selection.boxes;
  }
  cargoNode.textContent = cargoBayCalculator(boxes);
}

export function cargoBayCalculator(data) {
  return Math.ceil(data.split(",").reduce((acc, val) => +val + acc, 0) / 10);
}

export function clearPreviousSelection(id) {
  if ($(id)) {
    $(id).style.background = "#5F6472";
    $(`a_${id}`).style.color = "#979797";
    $(`a_${id}`).style.background = "#5F6472";
  }
}
