import { $ } from "./helper.js";
import { shipmentFocusHandler } from "./eventHandlers.js";

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
    shipmentLi.title = element.name;
    shipmentLi.contact = element.email;
    shipmentLi.setAttribute("tabindex", "0");
    shipmentA.setAttribute("load", element.boxes ? element.boxes : null);
    shipmentA.innerText = element.name;
    shipmentA.id = `a_${element.id}`;
    shipmentA.addEventListener(
      "focus",
      () =>
        (shipmentLi.style.background =
          "linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)")
    );
    shipmentA.addEventListener("blur", () => {
      shipmentLi.style.background = "#5F6472";
      // target.value = ''
    });

    shipmentLi.addEventListener("focus", () =>
      shipmentFocusHandler(shipmentLi, target)
    );
    shipmentLi.addEventListener("blur", () => {
      shipmentLi.style.background = "#5F6472";
      // target.value = ''
    });
    shipmentLi.id = element.id;
    shipmentLi.appendChild(shipmentA);
    shipmentList.appendChild(shipmentLi);
  });
}
