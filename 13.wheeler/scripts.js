const wheelImages_One = document.querySelectorAll(".wheelOne .wheel-img");
const wheelImages_Two = document.querySelectorAll(".wheelTwo .wheel-img");
const wheelImages_Three = document.querySelectorAll(".wheelThree .wheel-img");
const wheelImages_Four = document.querySelectorAll(".wheelFour .wheel-img");
const startBtn = document.querySelector("#start-btn");
const stopBtn = document.querySelector("#stop-btn");
const speed1 = 100;
const numberOfImg = 7;

const startGame = () => {
  console.log("click");
  //turn the image on or off
  const turnOnOffWheelImages_One = (img, index) => {
    img
      ? wheelImages_One[index].classList.add("active")
      : wheelImages_One[index].classList.remove("active");
  };
  const turnOnOffWheelImages_Two = (img, index) => {
    img
      ? wheelImages_Two[index].classList.add("active")
      : wheelImages_Two[index].classList.remove("active");
  };
  const turnOnOffWheelImages_Three = (img, index) => {
    img
      ? wheelImages_Three[index].classList.add("active")
      : wheelImages_Three[index].classList.remove("active");
  };
  const turnOnOffWheelImages_Four = (img, index) => {
    img
      ? wheelImages_Four[index].classList.add("active")
      : wheelImages_Four[index].classList.remove("active");
  };

  //create image array with all images off
  let counter = 0;
  let imageArr_One = [];
  let imageArr_Two = [];
  let imageArr_Three = [];
  let imageArr_Four = [];
  while (counter < numberOfImg) {
    imageArr_One[counter] = false;
    imageArr_Two[counter] = false;
    imageArr_Three[counter] = false;
    imageArr_Four[counter] = false;
    counter++;
  }
  //turn on  the first image
  counter = 0;
  imageArr_One[counter] = true;
  imageArr_Two[counter] = true;
  imageArr_Three[counter] = true;
  imageArr_Three[counter] = true;
  //start the on-off images
  const timer1 = setInterval(() => {
    //turn on the first image
    imageArr_One.forEach((img, index) => turnOnOffWheelImages_One(img, index));
    imageArr_Two.forEach((img, index) => turnOnOffWheelImages_Two(img, index));
    imageArr_Three.forEach((img, index) =>
      turnOnOffWheelImages_Three(img, index)
    );
    imageArr_Four.forEach((img, index) =>
      turnOnOffWheelImages_Four(img, index)
    );
    //turn off the current image
    imageArr_One[counter] = false;
    imageArr_Two[counter] = false;
    imageArr_Three[counter] = false;
    imageArr_Four[counter] = false;
    if (counter < imageArr_One.length - 1) {
      counter++;
    } else {
      counter = 0;
    }
    //turn on the next image
    imageArr_One[counter] = true;
    imageArr_Two[counter] = true;
    imageArr_Three[counter] = true;
    imageArr_Four[counter] = true;
  }, speed1);

  //Stop the wheel
  stopBtn.addEventListener("click", () => {
    clearInterval(timer1);
  });
};

startBtn.addEventListener("click", startGame);
