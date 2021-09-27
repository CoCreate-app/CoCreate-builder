import resolveCanvas from './resolveCanvas';
import text from '@cocreate/text';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	let domTextEditor = canvasDocument.documentElement;
	document.addEventListener('attributes', function(e) {
		let detail = e.detail;
		let value = detail.value;
		let type = detail.type;
		let property = detail.property;
		let element = detail.element;
		let unit = detail.unit;
		try {
			if(canvasDocument.contains(element)) {
				let target = element.getAttribute("element_id");
				unit = unit || '';
				switch(type) {
					case 'attribute':
						text.setAttribute({ domTextEditor, target, name: property, value });
						break;
					case 'classstyle':
						text.setClassStyle({ domTextEditor, target, classname: property, value, unit });
						break;
					case 'style':
						text.setStyle({ domTextEditor, target, styleName: property, value, unit });
						break;
					case 'innerText':
						text.setInnerText({ domTextEditor, target, value });
						break;
					case 'class':
						text.setClass({ domTextEditor, target, value });
						break;

					default:
						console.error('ccAttribute to domText no action');
						// code
				}

			}
		}
		catch(err) { console.log('domText: dom-to-text: ' + err) }

	});

});
