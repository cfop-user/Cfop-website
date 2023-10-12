function ImageClicked(image){
	modal = document.getElementById("modal");
	modalImage = document.getElementById("modal-image");
	modalHeader = document.getElementById("modal-text-header");
	modalDescription = document.getElementById("modal-description");
	modal.classList.add("darkened-modal");
	modal.classList.remove("closed");

	modalImage.src = image.src;
	modalHeader.innerHTML = image.getAttribute("data-name");
	modalDescription.innerHTML = image.getAttribute("data-description")

}

function OverlayClicked() {
	modal = document.getElementById("modal");
	modal.classList.add("closed");
	modal.classList.remove("darkened-modal");
}

const header = document.querySelector('.header');

header.addEventListener(
	"mousedown",
	function(e) {
		header.dataset.mouseDownAt = e.clientX;
	}
)
header.addEventListener(
	"mousemove",
	function(event) {
		if (header.dataset.mouseDownAt === "0") return;
		console.log("working")
		lastOffset = parseFloat(header.dataset.lastOffset);
		mouseDelta = parseFloat(header.dataset.mouseDownAt) - event.clientX;
		header.style.setProperty('--background-offset', String(mouseDelta + lastOffset)  +'px');
	}
)
header.addEventListener(
	"mouseup",
	function(e){
		header.dataset.mouseDownAt = "0";
		mouseDelta = parseFloat(header.dataset.mouseDownAt) - e.clientX;
		lastOffset = parseFloat(header.dataset.lastOffset);
		header.dataset.lastOffset = getComputedStyle(header).getPropertyValue('--background-offset');
	}
)

document.addEventListener(
	"click",
	function(event) {
		modal = document.getElementById("modal");
		if (
			event.target.matches("#modal")
		) {
			modal.classList.toggle("closed");
		}
	},
	false
)


