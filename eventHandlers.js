import { cargoBayCalculator, $, SHIPMENTS_LIST, selectShipment } from "./helper.js";

let cargoBays = $("shipment-bays");

export function shipmentItemClickHandler (event) {
  selectShipment(event.currentTarget.id)
}

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



export const searchInputHandler = (e) => {
  let target = $("shipment-boxes");
  let searchResult;
  if (e.key === "Enter") {
    searchResult = SHIPMENTS_LIST.filter((el) => {
      let shipmentName = el.name;
      return shipmentName.toLowerCase().includes(e.target.value);
    });
    selectShipment(searchResult[0].id);
  }
  console.log(searchResult);
  console.log(e.key);
  console.log(e.target.value);
};

export const boxesInputHandler = (e) =>
  (cargoBays.innerText = cargoBayCalculator(e.target.value));

export const inputCoverHandler = () => $("search").focus();
