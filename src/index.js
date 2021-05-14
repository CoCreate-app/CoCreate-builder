// import '@cocreate/render/src'
(async() => {
  // lazy loading because of webpack warning for large bundle size

  import ('@cocreate/sidenav')
  import ('@cocreate/modal')
  import ('@cocreate/fetch')
  import ('@cocreate/floating-label')
  import ('@cocreate/htmltags')
  import ('@cocreate/input')
  import ('@cocreate/text')
  import ('@cocreate/cursors')

})()
import ccCss from '@cocreate/cocreatecss';
import './style.css'

import attributes from '@cocreate/attributes'
import observer from '@cocreate/observer'
import vdom from '@cocreate/vdom'
import selected from '@cocreate/selected'
import toolbar from '@cocreate/toolbar'
import crdt from '@cocreate/crdt'
import input from '@cocreate/input'
import text from '@cocreate/text'
import cursors from '@cocreate/cursors'
import dnd from '@cocreate/dnd'
import classDomModifier from '@cocreate/domtext'
import select from '@cocreate/select'
import { UUID, configMatch } from '@cocreate/utils'

import elementConfig from './elementConfig';

function addScript(document, url) {
  let script = document.createElement("script");
  script.setAttribute('src', url)
  document.head.appendChild(script);
}

window.elementConfig = elementConfig;


let isDndFindDef = false;
let canvas, canvasDocument, canvasWindow, crdtCon, linkCrdtCon;
let ccAttributes, domModifier;



let defaultHtml = `<!DOCTYPE html><html>
	<head>
  <style>body {background: red;}</style>
	
	</head>
	<body data-element_id="body" style="padding:1;">
		
		<h1 data-element_id="t1" name="1">test 1</h1>
		<h1 data-element_id="t3" name="3">test 3</h1>
		<h1 data-element_id="t2" name="2">test 2</h1>
		<h1 data-element_id="t4" name="4">test 4</h1>
			

        
   
	</body>
</html>`;

// <script data-element_id="script1">
//     var config = {
//       apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
//       securityKey: 'f26baf68-e3a9-45fc-effe-502e47116265',
//       organization_Id: '5de0387b12e200ea63204d6c'
//     }
//     window.config = config;
// </script>


async function resolveCanvas() {
  try {
    canvas = document.querySelector("#canvas");
    if (!canvas)
      console.error("builder config failed, can not find canvas iframe");

    crdtCon = {
      collection: canvas.getAttribute('data-collection'),
      document_id: canvas.getAttribute('data-document_id'),
      name: canvas.getAttribute('name'),

    };
    window.crdtCon = crdtCon;
    crdt.init(crdtCon);


    canvasWindow = canvas.contentWindow;
    canvasDocument = canvasWindow.document || canvas.contentDocument;
    canvasDocument.ccdefaultView = canvasWindow;
    return new Promise(function(resolve, reject) {

      setTimeout(() => {
        let html = crdt.getText({ crud: false, ...crdtCon });
        
        canvasDocument.documentElement.remove();
        canvasDocument.append((new DOMParser().parseFromString(defaultHtml, "text/html")).documentElement);

        let apiInfo = document.createElement('script');
        apiInfo.innerHTML = `     var config = {
          apiKey: 'c2b08663-06e3-440c-ef6f-13978b42883a',
          securityKey: 'f26baf68-e3a9-45fc-effe-502e47116265',
          organization_Id: '5de0387b12e200ea63204d6c'
        }`
        canvasDocument.head.appendChild(apiInfo);

        let canvasScript = document.createElement('script');
        canvasScript.setAttribute('src', './CoCreate-builder-canvas.js');
        canvasScript.addEventListener('load', function(){
          console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>');
              canvasWindow.dispatchEvent(new CustomEvent("DOMContentLoaded", {"bubbles":true, "cancelable":false}))
    canvasWindow.dispatchEvent(new Event("DOMContentLoaded", {"bubbles":true, "cancelable":false}))
    canvasWindow.dispatchEvent(new CustomEvent("load", {"bubbles":true, "cancelable":false}))
    canvasWindow.dispatchEvent(new Event("load", {"bubbles":true, "cancelable":false}))
        } )
        canvasDocument.head.appendChild(canvasScript);


        resolve()



    

      }, 500)
    })


  }
  catch (error) {
    console.error("canvas not found init error", error, document.URL);
  }
}

function initAttributes() {

  // load cc attributes
  ccAttributes = attributes.init({
    document,
    exclude: '#ghostEffect, .vdom-item, #selectedElementcoc, #hoveredElementcoc',
    callback: ({
      value,
      type,
      property,
      element,
      unit
    }) => {
      if (canvasDocument.contains(element)) {
        let target = element.getAttribute("data-element_id");
        switch (type) {
          case 'attribute':
            domModifier.setAttribute({ target, name: property, value })
            break;
          case 'classstyle':
            domModifier.setClass({ target, classname: property, value: value + unit })
            break;
          case 'style':
            domModifier.setStyle({ target, styleName: property, value: value + unit })
            break;
          case 'innerText':
            domModifier.setInnerText({ target, value })
            break;

          default:
            console.error('ccAttribute to domModifier no action')
            // code
        }

      }


    },
  });
}


let hasInit = false;

function initDomText() {

  let html = crdt.getText({ crud: false, ...crdtCon });
  domModifier = new classDomModifier(html, canvasDocument.documentElement)
  window.insertTextList = [];
  domModifier.setCallback({
    addCallback: function({ value, position }) {
      let html = crdt.getText({ crud: false, ...crdtCon })
      // if (html)
      // window.insertTextList.push({
      //   value,
      //   position,
      //   virtual: html.substring(html.from - 20, html.from) +
      //     "\x1b[31m<here>\x1b[0m" +
      //     html.substring(html.from, html.from + 40)
      // })
      // else
      // window.insertTextList.push({ value, position, virtual: 'crdt.getText returned nothing' })
      crdt.insertText({
        crud: false,
        ...crdtCon,
        value,
        position,
      });
    },
    removeCallback: function({ from, to }) {
      crdt.deleteText({
        crud: false,
        ...crdtCon,
        position: from,
        length: to - from,
      });
    }
  })
  hasInit = true;
}


(async function init() {
  if (hasInit)
    return
  if (document.readyState === 'loading')
    window.addEventListener("load", async(e) => {
      await initBuilder()
    })
  else
    await initBuilder()


})()


async function initBuilder() {


  await resolveCanvas();

  initDomText()
  initAttributes()

  try {
    // domReader.register(canvasWindow)

    if (!isDndFindDef) {
      isDndFindDef = true;
      window.addEventListener("dndsuccess", (e) => {

        let {
          position,
          dragedEl,
          dropedEl,
          dropType,
          dragNextSib,
          dropNextSib
        } = e.detail;

        // check if it's vdom convert it to canvas
        if (dropedEl.classList.contains('vdom-item')) {
          let id = dropedEl.getAttribute("data-element_id");
          dropedEl = canvasDocument.querySelector(`[data-element_id="${id}"]`)
          id = dragedEl.getAttribute("data-element_id");
          dragedEl = canvasDocument.querySelector(`[data-element_id="${id}"]`)


          dropedEl.insertAdjacentElement(position, dragedEl);
        }
        else if (!canvasDocument.contains(dropedEl)) return; //probably not necss since we fixed groups
        switch (dropType) {
          case "data-draggable":
            domModifier.insertAdjacentElement({
              position,
              target: dropedEl.getAttribute("data-element_id"),
              element: dragedEl.getAttribute("data-element_id"),

            });

            break;
          case "data-cloneable":
            domModifier.insertAdjacentElement({
              position,
              target: dropedEl.getAttribute("data-element_id"),
              elementValue: dragedEl.outerHTML,
            });
            break;
        }
      });
    }

    dnd.initIframe({ isIframe: true, frame: canvas });
    dnd.init({
      mode: 'function',
      target: canvasDocument.body,
      onDnd: (element, request) => {
        // disable touch for dnd
        // element.style.touchAction = "none";

        for (let config of configMatch(elementConfig, element))
          for (let r of request)
            if (config[r.substr(5)] === true) return [element, r];
            else return;
      },
      onDndSuccess: (detail) => {
        if (!detail.dragedEl.getAttribute("data-element_id"))
          detail.dragedEl.setAttribute("data-element_id", UUID());
      },
    });
  }
  catch (error) {
    console.error("ccAttribute init error", error);

  }


  // try {

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
  // }
  // catch (error) {
  //   console.log('aaa', canvasDocument)
  //   // throw new Error(error)
  //   // console.error("toolbar init error", error, document.URL);
  // }


  try {
    selected.config({
      srcDocument: canvasDocument,
      destDocument: document,
      selector: "*",
      target: "[data-attributes]:not(.styleunit)",
      callback: (element, target) => {
        target.setAttribute('name', target.id + '-' + element.getAttribute('data-element_id'))
        target.setAttribute('data-attributes_target', `#${canvas.id};[data-element_id=${element.getAttribute('data-element_id')}]`);
      }
    });

  }
  catch (error) {
    console.error("selected2 init error", error, document.URL);
  }

  // initvdom
  try {
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

  }
  catch (error) {
    console.error("vdom init error", error, document.URL);
  }


  
}


export default { crdt }
