import { cargoBayCalculator, $ } from "./helper.js";

let cargoBays = $("shipment-bays");

export function shipmentFocusHandler(element, target) {
  let shipmentHeader = $("shipment-header");
  let shipmentContact = $("shipment-contact");

  shipmentContact.innerText = element.contact;
  shipmentHeader.innerText = element.title;

  let payload = $(`a_${element.id}`).getAttribute("load");

  if (payload === "null") {
    target.placeholder = "Please enter boxes";
    target.value = "";
  } else target.value = payload;
  element.style.background =
    "linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)";

  let requiredCargo = cargoBayCalculator(payload);
  requiredCargo
    ? (cargoBays.innerText = requiredCargo)
    : (cargoBays.innerText = "-");
}

export function selectShipment(id) {
  let selection = SHIPMENTS_LIST.filter((el) => el.id === id);
  let headerNode = $("shipment-header");
  let contactNode = $("shipment-contact");
  let boxesNode = $("shipment-boxes");
  let cargoNode = $("shipment-bays");

  if (selection.length > 1) {
    alert("More then one result to show!");
  } else {
  }
}

export const searchInputHandler = (e) => {
  let searchResult = SHIPMENTS_LIST.filter((el) =>
    el.name.includes(e.target.value)
  );
  console.log(searchResult);
  populateShipmentList(searchResult);
};

export const boxesInputHandler = (e) =>
  (cargoBays.innerText = cargoBayCalculator(e.target.value));

export const inputCoverHandler = () => $("search").focus();
