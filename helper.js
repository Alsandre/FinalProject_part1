export const SHIPMENTS_LIST = [];

export const $ = (id) => document.getElementById(id);

export function swap(id1, id2) {
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

let isBurgerOpen = false;
export const burgerSH = () => {
  isBurgerOpen = !isBurgerOpen;

  //   isBurgerOpen ? swap('burger-lines', 'burger-cross') : swap('burger-cross', 'burger-lines');

  switch (isBurgerOpen) {
    case true:
      swap("burger-lines", "burger-cross");
      break;
    case false:
      swap("burger-cross", "burger-lines");
      break;
  }
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
  let selection = SHIPMENTS_LIST.find((el) => el.id === id);
  let headerNode = $("shipment-header");
  let contactNode = $("shipment-contact");
  let boxesNode = $("shipment-boxes");
  let cargoNode = $("shipment-bays");

  headerNode.textContent = selection.name;
  contactNode.textContent = selection.email;
  boxesNode.value = selection.boxes;
  cargoNode.textContent = cargoBayCalculator(selection.boxes);
}

export function cargoBayCalculator(data) {
  return Math.ceil(data.split(",").reduce((acc, val) => +val + acc, 0) / 10);
}
