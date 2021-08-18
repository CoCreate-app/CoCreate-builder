import vdom from '@cocreate/vdom'
import resolveCanvas from './resolveCanvas';

export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
	vdom.init();
})