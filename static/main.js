// import { themes } from "./settings/themeChange.js";

const modal = document.getElementById("modal");
let modalImage = document.getElementById("modal-image");
let modalHeader = document.getElementById("modal-text-header");
let modalDescription = document.getElementById("modal-description");
const modalContent = document.querySelector('#modal-content');

function ImageClicked(image) {
	OpenModal();
	modalImage.src = image.src;
	modalHeader.innerHTML = image.getAttribute("data-name");
	if (!image.hasAttribute("data-description")) {
		modalDescription.innerHTML = "Made by Ben."
	} else {
		modalDescription.innerHTML = image.getAttribute("data-description");
	}
	modalContent.style.width = "max(60%, " + (modalImage.clientWidth * 2) + "px)";
}

function CloseModal() {
	modal.classList.remove("darkened-modal");
	modal.classList.add("closed");
	modalContent.classList.add("closed")
}

function OpenModal() {
	modal.classList.remove("closed");
	modal.classList.add("darkened-modal");
	modalContent.classList.remove("closed")
}

document.addEventListener(
	"click",
	function (event) {
		if (
			event.target.matches("#modal") || event.target.matches(".modal-close-button")
		) {
			CloseModal()
		}
	},
	false
)

const header = document.querySelector('.header');
if (header != null) {
	SetupHeader()
}

function SetupHeader() {
	header.addEventListener(
		"mousedown",
		function (e) {
			header.dataset.mouseDownAt = e.clientX;
		}
	)
	header.addEventListener(
		"mousemove",
		function (event) {
			if (header.dataset.mouseDownAt === "0") return;
			lastOffset = parseFloat(header.dataset.lastOffset);
			mouseDelta = parseFloat(header.dataset.mouseDownAt) - event.clientX;
			header.style.setProperty('--background-offset', String(mouseDelta + lastOffset) + 'px');
		}
	)
	header.addEventListener(
		"mouseup",
		function () {
			header.dataset.mouseDownAt = "0";
			header.dataset.lastOffset = getComputedStyle(header).getPropertyValue('--background-offset');
		}
	)
}

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid != null) {
	setupGalleryGrid()
}
function setupGalleryGrid() {
	for (const Image of galleryGrid.children) {
		Image.draggable = false
		Image.addEventListener(
			"click",
			function () { ImageClicked(Image) }
		)
	}
}

const test = document.querySelector('#test');
if (test != null) {
	setupTest()
}

function setupTest() {
	test.addEventListener(
		"mouseover",
		function () {
			test.classList.add("hovered");
			test.classList.remove("unhovered")
		}
	)
	test.addEventListener(
		"mouseout",
		function () {
			test.classList.add("unhovered");
			test.classList.remove("hovered");
		}
	)
}

// theme:
const themeItems = document.querySelectorAll('.theme-item');

const themes = Array.from(themeItems).flatMap(item =>
	Array.from(item.classList)
	  .filter(className => className.startsWith('theme-') && className !== 'theme-item')
  );
var currentTheme = localStorage.getItem('theme') || themes[0];
const middleStart = 80;
const middleEnd = 60;
const rightStart = 95;
const rightEnd = 85;


function applyTheme(theme) {
	localStorage.setItem('prevtheme', localStorage.getItem('theme'));
	document.body.classList.remove(...themes);
	document.body.classList.add(theme);  
	localStorage.setItem('theme', theme);  
}
function setActive(theme) {
	// console.log("setting active")
	const prevTheme = localStorage.getItem('prevtheme'); // Get the value of 'prevtheme'
	if (prevTheme != null) {
	  console.log(`prevtheme: ${localStorage.getItem("prevtheme")}`); // Fetch and log the other value
	} else {
	  console.log('No previous theme set.');
	}
	const forwardTime = 700;
	const backwardTime = 500;
	themeItems.forEach(item => {
		if (item.classList.contains(theme)) {
			item.classList.add("active");
			animateProperty(item, '--middle', middleStart, middleEnd, forwardTime); 
			animateProperty(item, '--right', rightStart, rightEnd, forwardTime*1.7); 
		} else if (item.classList.contains(localStorage.getItem('prevtheme'))) {
			animateProperty(item, '--middle', middleEnd, middleStart, backwardTime*1.2);
			animateProperty(item, '--right', rightEnd, rightStart, backwardTime); 
			item.classList.remove("active")
		} else {
			item.classList.remove("active")
		}
	})
}

applyTheme(currentTheme);
setActive(currentTheme);

themeItems.forEach(item => {
	console.log(middleStart);
	item.style.setProperty('--middle', `${middleStart}%`);
	item.style.setProperty('--right', `${rightStart}%`);

	item.addEventListener('click', () => {
		// console.log("clicked!");
		const selectedTheme = item.classList[1];  // The second class is the theme class
		applyTheme(selectedTheme);
		setActive(selectedTheme);
		// console.log(document.body.classList)
	});
});



// console.log(themes);

const themeItem = document.querySelector('.theme-item.active');

function animateProperty(element, property, start, end, duration) {
	const startTime = performance.now();

	function updateFrame(currentTime) {
		const elapsedTime = currentTime - startTime;
		const progress = Math.min(elapsedTime / duration, 1); // Ensure progress is in [0, 1]
		const value = start + (end - start) * progress;

		// Update the CSS custom property
		element.style.setProperty(property, `${value}%`);

		if (progress < 1) {
			requestAnimationFrame(updateFrame); // Continue animation
		}
	}

	requestAnimationFrame(updateFrame);
}



