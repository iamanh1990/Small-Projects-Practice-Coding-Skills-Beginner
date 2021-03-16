const site = {};

//Arrage items helper func
site.arrangeItems = (itemsNodeList) => {
  let type = 1,
    radius = "10em",
    start = -90,
    numberOfItems = itemsNodeList.length,
    slice = (360 * type) / numberOfItems;

  const items = [...itemsNodeList];

  items.forEach((item, index) => {
    let rotate = slice * index + start,
      rotateReverse = rotate * -1;
    item.style.transform = `rotate(${rotate}deg) translate(${radius}) rotate(${rotateReverse}deg)`;
  });
};

//Main
site.main = () => {
  const bulbsElement = document.querySelector(".bulbs");
  const startBtn = document.getElementById("start-btn");
  const stopBtn = document.getElementById("stop-btn");
  const result = document.getElementById("result");

  let counter = 0;
  const speed = 100;
  const numberOfBulbs = 20;

  //Helper Func -  Making the bulbs
  const createBulbs = (numberOfBulbs) => {
    let bulbs = [];
    //create the array of bulbs - all of them are off. True is on and false is off.

    while (counter < numberOfBulbs) {
      bulbs[counter] = false;
      counter++;
    }

    //Create the bulbs in the DOM
    bulbs.forEach(() => {
      const bulbElement = document.createElement("div");
      bulbElement.addEventListener("click", () => {
        handleSelectedBulb(bulbElement);
      });
      bulbElement.className = "bulb";
      bulbsElement.appendChild(bulbElement);
    });

    site.arrangeItems(document.querySelectorAll(".bulb"));

    //Reset the counter back to chosen state
    counter = 0;
    bulbs[counter] = true;
    return bulbs;
  };

  //Helper Func - Hanle selected bulb
  const handleSelectedBulb = (bulbElement) => {
    bulbElement.classList.toggle("chose");
  };

  //Helper Func to check if the user win or lose
  const winOrLose = (bulbs) => {
    let checkWinLose = [];
    for (let i = 0; i < bulbs.length; i++) {
      checkWinLose.push(
        bulbs[i].classList.contains("active") &&
          bulbs[i].classList.contains("chose")
      );
    }
    checkWinLose.includes(true)
      ? (result.textContent = "Congrats, You Win :)")
      : (result.textContent = "Sorry, You Lose :(");
  };

  //Helper Func -  Switching the Bulbs On and Off
  const switchBulbOnOff = (bulbs) => {
    bulbs.forEach((bulb, index) => {
      bulb
        ? document.querySelectorAll(".bulb")[index].classList.add("active")
        : document.querySelectorAll(".bulb")[index].classList.remove("active");
    });
  };

  //Create and start the arcade
  const startArcade = (bulbs) => {
    //Switch on/off the bulbs immediately for the firs time
    switchBulbOnOff(bulbs);

    const interval = setInterval(() => {
      //Switch off the current bulb
      bulbs[counter] = false;
      if (counter < bulbs.length - 1) {
        counter++;
      } else {
        counter = 0;
      }
      //turn on the next bulb
      bulbs[counter] = true;

      //Switch on / off the bulbs
      switchBulbOnOff(bulbs);
    }, speed);

    //
    return interval;
  };

  let intervalID;
  let bulbs;

  //Initialize the bulb
  bulbs = createBulbs(numberOfBulbs);

  //Start the Bulbs Circling when clicking the start button
  startBtn.addEventListener("click", () => {
    intervalID = startArcade(bulbs);
  });

  //Stop the Bulbs Circling when clicking the stop button
  stopBtn.addEventListener("click", () => {
    clearInterval(intervalID);
    //Check if win or Lose
    const bulbElements = document.querySelectorAll(".bulb");
    winOrLose(bulbElements);
  });
};

//trigger the arcade
window.addEventListener("load", site.main());
