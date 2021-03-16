const form = document.querySelector(".form");
const direction = document.querySelectorAll('input[name="direction"]');
const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const cssCode = document.querySelector(".css-code");
const body = document.body;

const gradientGenerate = () => {
  let gradientDirection = "";
  //Check direction
  for (let input of direction) {
    if (input.checked) {
      gradientDirection = input.value;
    }
  }

  body.style.backgroundImage = `linear-gradient(${gradientDirection}, ${color1.value}, ${color2.value})`;
  cssCode.textContent = `linear-gradient(${gradientDirection}, ${color1.value}, ${color2.value})`;
};

//Add events to radiobutton
for (let input of direction) {
  input.addEventListener("change", gradientGenerate);
}

//Add events to color input
color1.addEventListener("change", gradientGenerate);
color2.addEventListener("change", gradientGenerate);

//Add events to form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  gradientGenerate();
});
