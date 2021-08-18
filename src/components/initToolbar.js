import toolbar from '@cocreate/toolbar'
import resolveCanvas from './resolveCanvas';
import elementConfig from '../elementConfig';


export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {

	toolbar.init({
		selector: "#selectedElementcoc",
		eventType: "click",
		config: elementConfig,
		configKey: "selectable",
		document: canvasDocument,
	});

	toolbar.init({
		selector: "#hoveredElementcoc",
		eventType: "mouseover",
		config: elementConfig,
		configKey: "hoverable",
		document: canvasDocument,
	});



})
