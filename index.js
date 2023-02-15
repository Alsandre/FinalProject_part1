const $ = (id) => document.getElementById(id);
const dummyShipmentList = ['Amazon', 'Walmart', 'Apple'];
const shipmentsArray = [];
let isBurgerOpen = false;

let cargoBays = $('shipment-bays');
let searchField = $('search');

searchField.addEventListener('input', (e) => {
  
  let searchResult = shipmentsArray.filter(el => el.name.includes(el.target.value))
  populateShipmentList(searchResult);
})


let shipmentBoxes = $('shipment-boxes');
shipmentBoxes.addEventListener('input', (e) => {
    // e.preventDefault()
    cargoBays.innerText = cargoBayCalculator(e.target.value)
    console.log(e.target.value)
})


// populateShipmentList(dummyShipmentList)


$("input-cover").addEventListener("click", () => $("search").focus());

$('search').addEventListener('input', e => {
    console.log(e.target.value);
})
$('search').addEventListener('keypress', e => {
    if(e.key === 'Enter') {
        e.target.value = '';
    }
})
const mobileSearch = () => {
  $("search-placeholder").style.display = "none";
  $("input-cover").style.display = "none";
};
const mobileSearchOut = (e) => {
  if(e.target.value !== ''){
    $('search-placeholder').style.display = 'none'
  }
  $("search-placeholder").style.display = "block";
  $("input-cover").style.display = "block";
};

const burgerSH = () => {
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

function swap(id1, id2) {
  $(id1).style.display = "none";
  $(id2).style.display = "block";
  if(id1 === 'burger-lines'){
    $('list-of-shipments').style.display = 'block';
    $('list-of-shipments').style.marginTop = '80px';
    $('search-bar').style.display = 'none';
    $('information-of-shipment').style.display = 'none';
  }else if(id1 === "burger-cross"){
    $('list-of-shipments').style.display = 'none';
    $('search-bar').style.display = 'block';
    $('information-of-shipment').style.display = 'block';
  }
}

function populateShipmentList(arr){
  const shipmentList = $('shipment-list');
  if(shipmentList.innerText !== ''){
    shipmentList.innerText = '';
  }
  // shipmentList.innerText = '';
    arr.forEach((element) => {
        let target = $('shipment-boxes');
        target.addEventListener('input', (e) => {
            
        })
        let shipmentLi = document.createElement('li');
        let shipmentA = document.createElement('a');
        // shipmentA.setAttribute('tabindex', '0');
        console.log(element.name)
        shipmentLi.title = element.name;
        shipmentLi.contact = element.email;
        shipmentLi.setAttribute('tabindex', '0');
        shipmentA.setAttribute('load', element.boxes ? element.boxes : null);
        shipmentA.innerText = element.name;
        shipmentA.id = `a_${element.id}`;
        shipmentA.addEventListener('focus' , ()=> shipmentLi.style.background = 'linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)')
        shipmentA.addEventListener('blur' , ()=> {
            shipmentLi.style.background = '#5F6472';
            // target.value = ''
        })
        shipmentLi.addEventListener('focus' , ()=> shipmentFocusHandler(shipmentLi, target))
        shipmentLi.addEventListener('blur' , ()=> {
            shipmentLi.style.background = '#5F6472';
            // target.value = ''
        })
        shipmentLi.id = element.id;
        shipmentLi.appendChild(shipmentA);
        shipmentList.appendChild(shipmentLi);
        // console.log(shipmentLi.id)
    });
}

class Shipment {
    constructor(obj){
        this.id  = obj.id;
        this.name = obj.name;
        this.email = obj.email;
        this.boxes = obj.boxes
    }
    // requiredCargoBasy() {
    //     console.log(Math.ceil(this.boxes.split(',').reduce((acc, val) => +val+acc,0)/10))
    // }
}
fetch('https://bitbucket.org/hpstore/spacex-cargo-planner/raw/204125d74487b1423bbf0453f4dcb53a2161353b/shipments.json')
.then(res => res.json())
.then(data => data.forEach(el => shipmentsArray.push(new Shipment(el))))
.then(()=> {
    populateShipmentList(shipmentsArray);
    let a = $(shipmentsArray[0].id);
    a.focus();
    console.log(a)

})


function shipmentFocusHandler(element, target) {
    let shipmentHeader = $('shipment-header');
    let shipmentContact = $('shipment-contact');

    shipmentContact.innerText = element.contact;
    shipmentHeader.innerText = element.title
    
    let payload = $(`a_${element.id}`).getAttribute('load');
    
    if(payload === 'null') {
        target.placeholder = 'Please enter boxes';
        target.value = '';
    } else target.value = payload;
    console.log(payload)
    element.style.background = 'linear-gradient(90deg, rgba(45, 48, 56, 0) 22.92%, #2D3038 100%)';
    
    let requiredCargo = cargoBayCalculator(payload)
    requiredCargo ? cargoBays.innerText = requiredCargo : cargoBays.innerText = '-'
}

function cargoBayCalculator (data) {
    return Math.ceil(data.split(',').reduce((acc, val) => +val+acc, 0)/10);
}