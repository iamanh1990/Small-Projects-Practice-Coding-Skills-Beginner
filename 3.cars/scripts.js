const formMakeCar = document.getElementById("form-make-car");
const formSearchCar = document.getElementById("form-search-car");

//Car model
class Car {
  constructor(licenePlate, carMaker, carModel, carColor, carPrice) {
    this.licencePlate = licenePlate;
    this.carMaker = carMaker;
    this.carModel = carModel;
    this.carColor = carColor;
    this.carPrice = carPrice;
  }

  getCreatedCar() {
    return `You created a car with the licence plate of ${this.licencePlate}. The car is made by ${this.carMaker}, ${this.carModel} model, ${this.carColor} and worth ${this.carPrice}$. :D `;
  }

  discount() {
    let discountPrice;
    if (this.carPrice > 20000) {
      discountPrice = this.carPrice * 0.75;
    } else if (this.carPrice < 5000) {
      discountPrice = this.carPrice * 0.9;
    } else {
      discountPrice = this.carPrice * 0.85;
    }

    return discountPrice;
  }
}

//handle create car submit
const handleCreateSubmit = (event) => {
  event.preventDefault();
  const licencePlateEl = document.getElementById("licence-plate");
  const carModelEl = document.getElementById("car-model");
  const carMakerEl = document.getElementById("car-maker");
  const carPriceEl = document.getElementById("price");
  const carColorEl = document.getElementById("color");
  const makeCarResultEl = document.getElementById("make-car-result");

  const licencePlate = licencePlateEl.value;
  const carMaker = carMakerEl.value;
  const carModel = carModelEl.value;
  const carColor = carColorEl.value;
  const carPrice = carPriceEl.value;
  //Check input
  if (!licencePlate || !carModel || !carMaker || !carPrice || !carColor) {
    console.log("Please provide valid car input to make your car");
    return;
  }

  //database : intial database or take it from localStorage
  const carsCollection = localStorage.getItem("carsCollection")
    ? JSON.parse(localStorage.getItem("carsCollection"))
    : [];

  //create car Object¨
  const newCar = new Car(licencePlate, carMaker, carModel, carColor, carPrice);
  carsCollection.push(newCar);
  console.log(carsCollection);
  //save cars collection into localStorage
  localStorage.setItem("carsCollection", JSON.stringify(carsCollection));
  //render the created car
  makeCarResultEl.textContent = newCar.getCreatedCar();

  //clear the form
  licencePlateEl.value = "";
  carMakerEl.value = "";
  carModelEl.value = "";
  carColorEl.value = "";
  carPriceEl.value = "";
};

//Handle search car submit
const handleSearchSubmit = (event) => {
  event.preventDefault();
  const searchCarResultEl = document.getElementById("search-car-result");
  const searchInputEl = document.getElementById("search-input");
  const licencePlateInput = searchInputEl.value;
  if (!licencePlateInput) {
    console.log("Please provide your licence plate to search for your car");
    return;
  }
  //get the data from local storage
  const carsCollection = JSON.parse(localStorage.getItem("carsCollection"));
  console.log(carsCollection);
  if (!carsCollection) {
    searchCarResultEl.textContent = "Sorry there is no car in your collection.";
    return;
  }
  //search the car
  const searchCar = carsCollection.find(
    (car) => car.licencePlate === licencePlateInput
  );
  //if there is no car
  if (!searchCar) {
    console.log("no car");
    searchCarResultEl.textContent =
      "Sorry there is no car with such licence plate";
    return;
  }
  //render the car details
  const { licencePlate, carMaker, carModel, carColor, carPrice } = searchCar;
  const restoreCar = new Car(
    licencePlate,
    carMaker,
    carModel,
    carColor,
    carPrice
  );
  searchCarResultEl.textContent = `This is your car details: ${restoreCar.getCreatedCar()}. Now you can buy it with the discount price ${restoreCar.discount()}$`;

  //clear the form
  searchInputEl.value = "";
};

//Create the car on form submit
formMakeCar.addEventListener("submit", (event) => {
  handleCreateSubmit(event);
});

//Search for the car on form submit
formSearchCar.addEventListener("submit", (event) => {
  handleSearchSubmit(event);
});
