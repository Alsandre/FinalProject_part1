import { $ } from "./helper.js";
import { shipmentFocusHandler, shipmentItemClickHandler } from "./eventHandlers.js";

export function populateShipmentList(arr) {
  const shipmentList = $("shipment-list");
  if (shipmentList.innerText !== "") {
    shipmentList.innerText = "";
  }
  // shipmentList.innerText = '';
  arr.forEach((element) => {
    let target = $("shipment-boxes");
    target.addEventListener("input", (e) => {});
    let shipmentLi = document.createElement("li");
    let shipmentA = document.createElement("a");
    // shipmentA.setAttribute('tabindex', '0');
    shipmentLi.title = element.name;                                                // not necessary
    shipmentLi.contact = element.email;                                             // not necessary
    shipmentLi.setAttribute("tabindex", "0");                                       
    shipmentA.setAttribute("load", element.boxes ? element.boxes : null);           // not necessary
    shipmentA.innerText = element.name;
    shipmentA.id = `a_${element.id}`;
    // shipmentA.addEventListener(                                                     // not necessary if handled otherwise
    //   "focus",
    //   () =>
    //     (shipmentLi.style.background =
    //       "linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)")
    // );
    // shipmentA.addEventListener("blur", () => {                                         // not necessary if handled otherwise
    //   shipmentLi.style.background = "#5F6472";
    //   // target.value = ''
    // });

    // shipmentLi.addEventListener("focus", () =>                                         // not necessary if handled otherwise
    //   shipmentFocusHandler(shipmentLi, target)
    // );
    // shipmentLi.addEventListener("blur", () => {                                         // not necessary if handled otherwise
    //   shipmentLi.style.background = "#5F6472";
    //   // target.value = ''
    // });
    shipmentLi.addEventListener("click", (e) => {                                         // not necessary if handled otherwise
      shipmentItemClickHandler(e)
    });
    shipmentLi.id = element.id;
    shipmentLi.appendChild(shipmentA);
    shipmentList.appendChild(shipmentLi);
  });
}
