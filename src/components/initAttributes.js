import crdt from '@cocreate/crdt';
import resolveCanvas from './resolveCanvas';
// import attributes from '@cocreate/attributes/src/attributes.js';
// import attributes from '@cocreate/attributes';
import domText from '@cocreate/domtext';

export default resolveCanvas.then(async function({ crdtCon, canvas, canvasDocument }) {
	// const domTexti = await domText;
	let domTextEditor = canvasDocument.documentElement;
	document.addEventListener('attributes', function(e) {
		let detail = e.detail
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
						domText.setAttribute({ domTextEditor, target, name: property, value })
						break;
					case 'classstyle':
						domText.setClassStyle({ domTextEditor, target, classname: property, value, unit })
						break;
					case 'style':
						domText.setStyle({ domTextEditor, target, styleName: property, value, unit })
						break;
					case 'innerText':
						domText.setInnerText({ domTextEditor, target, value })
						break;
					case 'class':
						domText.setClass({ domTextEditor, target, value })
						break;

					default:
						console.error('ccAttribute to domText no action')
						// code
				}

			}
		}
		catch(err) { console.log('domText: dom-to-text: ' + err) }

	})

	// return attributes.init({
	// 	document,
	// 	// exclude: '#ghostEffect, .vdom-item, #selectedElementcoc, #hoveredElementcoc',
	// 	callback: ({
	// 		value,
	// 		type,
	// 		property,
	// 		element,
	// 		unit
	// 	}) => {

	// 		try {
	// 			if(canvasDocument.contains(element)) {
	// 				let target = element.getAttribute("element_id");
	// 				unit = unit || '';
	// 				switch(type) {
	// 					case 'attribute':
	// 						domTexti.setAttribute({ target, name: property, value })
	// 						break;
	// 					case 'classstyle':
	// 						domTexti.setClassStyle({ target, classname: property, value, unit })
	// 						break;
	// 					case 'style':
	// 						domTexti.setStyle({ target, styleName: property, value, unit })
	// 						break;
	// 					case 'innerText':
	// 						domTexti.setInnerText({ target, value })
	// 						break;
	// 					case 'class':
	// 						domTexti.setClass({ target, value })
	// 						break;

	// 					default:
	// 						console.error('ccAttribute to domText no action')
	// 						// code
	// 				}

	// 			}
	// 		}
	// 		catch(err) { console.log('domText: dom-to-text: ' + err) }



	// 	},
	// });


})
