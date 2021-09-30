export default new Promise(async function(resolve, reject) {
	let canvas, canvasDocument;
	canvas = document.querySelector("iframe[contenteditable]");
	if(!canvas) return;
	
	canvasDocument = canvas.contentDocument;
	resolve({ canvas, canvasDocument });
});