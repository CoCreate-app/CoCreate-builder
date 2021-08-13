  import vdom from '@cocreate/vdom'
  import resolveCanvas from './resolveCanvas';

  export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    let vdomTargets = document.querySelector("[vdom-target]");
    let vdomRealDom = document.querySelector("[vdom-id]");
    vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
    if (vdomTargets)
      vdomTargets.innerText = "";
    if (vdomRealDom && vdomTargets)
      window.vdomObject = vdom.initVdom({
        realdom: vdomRealDom,
        virtualDom: vdomTargets,
        ignore: '#dropMarker, script'
      });
  })
  