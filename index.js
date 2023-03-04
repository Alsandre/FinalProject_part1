import { populateShipmentList } from "./populate-shipment-list.js";
import {  boxesInputHandler,  searchInputHandler,  inputCoverHandler,} from "./eventHandlers.js";
import { $ , SHIPMENTS_LIST , burgerSH , mobileSearch , mobileSearchOut ,} from "./helper.js";

let selectedShipmentId;
let searchField = $("search");
let shipmentBoxes = $("shipment-boxes");
let burgerBtn = $("burger-button");
let inputCover = $("input-cover");

searchField.onkeydown = searchInputHandler;

searchField.onfocus = mobileSearch;
searchField.onblur = mobileSearchOut;
shipmentBoxes.oninput = boxesInputHandler;
burgerBtn.onclick = burgerSH;

inputCover.onclick = inputCoverHandler;

// Shipment class could be of better use. 
// E.g. it could be template for node with event handler methods inside
class Shipment {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.email = obj.email;
    this.boxes = obj.boxes;
  }
}

fetch(
  "https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json"
)
  .then((res) => res.json())
  .then((data) => data.forEach((el) => SHIPMENTS_LIST.push(new Shipment(el))))
  .then(() => {
    populateShipmentList(SHIPMENTS_LIST);
    let a = $(SHIPMENTS_LIST[0].id);
    a.focus();
  });
