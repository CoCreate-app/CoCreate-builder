  import vdom from '@cocreate/vdom'
  import resolveCanvas from './resolveCanvas';

  export default resolveCanvas.then(function({ crdtCon, canvas, canvasDocument, canvasWindow }) {
    let vdomTargets = document.querySelector("[data-vdom_target]");
    let vdomRealDom = document.querySelector("[data-vdom_id]");
    vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
    vdomTargets.innerText = "";
    if (vdomRealDom && vdomTargets)
      window.vdomObject = vdom.initVdom({
        realdom: vdomRealDom,
        virtualDom: vdomTargets,
        ignore: '#dropMarker, script'
      });
  })
  