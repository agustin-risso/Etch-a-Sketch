// VARIABLES

const colorPicker = document.querySelector("#colorPicker");
const colorBtn = document.querySelector(".colorBtn");
const eraserBtn = document.querySelector(".eraserBtn");
const clearBtn = document.querySelector(".clearBtn");
const sizeSlider = document.querySelector("#sizeSlider");
const sizeValue = document.querySelector("#sizeValue");
const grid = document.querySelector("#sketchContainer");

const colorDefault = "#434343";
const sizeDefault = 16;
const modeDefault = "color";

let colorActive = colorDefault;
let sizeActive = sizeDefault;
let modeActive = modeDefault;

// ADD EVENT LISTENERS

colorPicker.addEventListener("input", (e) => {
	setActiveColor(e.target.value);
});

colorBtn.addEventListener("click", () => {
	colorBtn.classList.toggle("active");
	eraserBtn.classList.remove("active");
	clearBtn.classList.remove("active");
	setActiveMode("color");
});

eraserBtn.addEventListener("click", () => {
	eraserBtn.classList.toggle("active");
	colorBtn.classList.remove("active");
	clearBtn.classList.remove("active");
	setActiveMode("eraser");
});

clearBtn.addEventListener("click", () => {
	clearBtn.classList.toggle("active");
	eraserBtn.classList.remove("active");
	colorBtn.classList.remove("active");
	clear();
});

sizeSlider.addEventListener("mousemove", (e) => {
	changeSizeValue(e.target.value);
});

sizeSlider.addEventListener("change", (e) => {
	changeSize(e.target.value);
});

// FUNCTIONS

function setActiveMode(newMode) {
	modeActive = newMode;
}

function setActiveColor(newColor) {
	colorActive = newColor;
	colorBtn.style.borderColor = `${newColor}`;
	colorBtn.style.color = `${newColor}`;
	eraserBtn.style.borderColor = `${newColor}`;
	eraserBtn.style.color = `${newColor}`;
	clearBtn.style.borderColor = `${newColor}`;
	clearBtn.style.color = `${newColor}`;
}

function setActiveSize(newSize) {
	sizeActive = newSize;
}

function changeSize(value) {
	setActiveSize(value);
	changeSizeValue(value);
	refreshGrid();
}

function changeSizeValue(value) {
	sizeValue.innerHTML = value + " x " + value;
}

function clear() {
	grid.innerHTML = "";
}

function refreshGrid() {
	clear();
	setUp(sizeActive);
}

function setUp(size) {
	grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
	grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

	for (let i = 0; i < size * size; i++) {
		const gridSquare = document.createElement("div");
		gridSquare.classList.add("square");
		gridSquare.addEventListener("mouseover", paint);
		gridSquare.addEventListener("mousedown", paint);
		grid.appendChild(gridSquare);
	}
}

function paint(x) {
	if (x.type === "mouseover" && !"mousedown") return;
	if (modeActive === "color") {
		x.target.style.backgroundColor = colorActive;
	} else if (modeActive === "eraser") {
		x.target.style.backgroundColor = "#eaeaea";
	}
}
