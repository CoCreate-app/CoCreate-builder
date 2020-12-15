let elementConfig = [{
    selector: "*",
    editable: false,
    draggable: true,
    droppable: true,
    selectable: true,
    hoverable: true,
  },
  {
    selector: "h1, h2, h3, h4, h5, h6, p, span, blockquote",
    editable: true,
    draggable: true,
    droppable: false,
    selectable: true,
    hoverable: true,
  },
  {
    selector: "input",
    editable: false,
    draggable: false,
    droppable: false,
  },
  {
    selector: "textarea",
    editable: false,
  },
  {
    selector: "select",
    editable: false,
  },
  {
    selector: "div.quill",
    draggable: true,
    droppable: false,
    selectable: true,
    hoverable: false,
  },
  {
    selector: "div.nav",
    tagName: "navbar",
    draggable: true,
    droppable: true,
    selectable: true,
    hoverable: true,
  },
  {
    selector: "div.floating-label_field",
    draggable: true,
    droppable: false,
    selectable: false,
    hoverable: false,
  },
  {
    selector: "div.ql-editor *",
    draggable: false,
    droppable: false,
    // selectable: false,
    // hoverable: false,
  },
  {
    tagName: "icon",
    selector: "a.menu_icon",
    editable: false,
    draggable: false,
    droppable: false,
    selectable: true,
    hoverable: true,
  },
  {
    selector: "a.menu_icon span",
    selectable: false,
    hoverable: false,
  },
  {
    selector: "menu_icon.span",
    editable: false,
    draggable: false,
    droppable: false,
    selectable: false,
    hoverable: false,
    selectable2: true,
  },
].reverse();

function addScript(document, url) {
  let script = document.createElement("script");
  script.setAttribute('src', url)
  document.head.appendChild(script);
}
window.elementConfig = elementConfig;

let canvasHtmlTagEvnt = false;
window.testMap = new Map();
window.addEventListener("load", () => {
  // setInterval(() => {
  //     let html = document.querySelector(
  //     '[data-document_id="5edee53c3e956152355a3442"]'
  //   ).value;

  //   if (!window.testMap.has(html.length)) window.testMap.set(html.length, html);
  // }, 5);
  initBuilder();
});


window.addEventListener("CoCreateHtmlTags-rendered", (e) => {
  initBuilder();

  // document
  //   .querySelector('iframe#canvas')
  //   .removeAttribute("data-document_id");
});



function initCanvas() {

  window.CoCreateObserver.add({
    name: "quill",
    observe: ["childlist"],
    include: ".quill",
    task: (mutationsList) => {
      console.log(mutationsList);
    },
  });
}

let crdtCon;
let isDndFindDef = false;

function initBuilder() {

  try {
    let canvas = document.querySelector("#canvas");
    if (!canvas)
      console.error("builder config failed, can not find canvas iframe");
    crdtCon = {
      collection: canvas.getAttribute('data-collection'),
      document_id: canvas.getAttribute('data-document_id'),
      name: canvas.getAttribute('name'),
    };
    let canvasWindow = canvas.contentWindow;
    let canvasDocument = canvasWindow.document || canvas.contentDocument;
    canvasWindow.addEventListener("load", (e) => initBuilder("iframe", e));
    domEditor({
      context: canvasDocument,
      selector_type: "querySelectorAll",
      selector: "*",
      idGenerator: CoCreateUtils.UUID,
    });
  }
  catch (error) {
    console.error("canvas not found init error", error);    throw error;
  }

  try {
    if (!isDndFindDef) {
      isDndFindDef = true;
      window.addEventListener("dndsuccess", (e) => {
      
        let {
          position,
          dragedEl,
          dropedEl,
          dropType,
          dragNextSib,
          dropNextSib,
        } = e.detail;
        
        // check if it's out side of dnd
        if(!canvasDocument.contains(dropedEl)) return;
        switch (dropType) {
          case "data-draggable":
            sendCrdtPayload({
              method: "insertAdjacentElement",
              property: position,
              target: {
                target: dropedEl.getAttribute("data-element_id"),
                tagName: dropedEl.tagName,
                nextSibling: dropNextSib[0],
                skip: dropNextSib[1],
              },
              element: {
                target: dragedEl.getAttribute("data-element_id"),
                tagName: dragedEl.tagName,
                nextSibling: dragNextSib[0],
                skip: dragNextSib[1],
              },
            }, crdtCon);

            break;
          case "data-cloneable":
            sendCrdtPayload({
              method: "insertAdjacentElement",
              property: position,
              target: {
                target: dropedEl.getAttribute("data-element_id"),
                tagName: dropedEl.tagName,
                nextSibling: dropNextSib[0],
                skip: dropNextSib[1],
              },
              element: {
                value: dragedEl.outerHTML,
              },
            }, crdtCon);
            break;
        }
      });
    }

    window.CoCreateDnd.initIframe({ isIframe: true, frame: canvas });
    window.CoCreateDnd.initFunction({
      target: canvasDocument.body,
      onDnd: (element, request) => {
        //disable touch for dnd
        // element.style.touchAction = "none";

        for (let config of CoCreateUtils.configMatch(elementConfig, element))
          for (let r of request)
            if (config[r.substr(5)] === true) return [element, r];
            else return;
      },
      beforeDndSuccess: (detail) => {
        detail.dragNextSib = getNextSibling(detail.dragedEl);
        detail.dropNextSib = getNextSibling(detail.dropedEl);
        if (!detail.dragedEl.getAttribute("data-element_id"))
          detail.dragedEl.setAttribute("data-element_id", CoCreateUtils.UUID());
      },
    });
  }
  catch (error) {
    console.error("ccAttribute init error", error);
    throw error;
  }

  try {
  window.ccStyle.addFilter(".vdom-item");
  window.ccStyle.addFilter("#ghostEffect");
  window.ccStyle.init({
    isIframe: true,
    frame: canvas,
    onCollaboration: ({
      value,
      unit,
      dataProperty,
      dataAttribute,
      element,
    }) => {
      dataAttribute === "classstyle" ?
        sendCrdtPayload({
          method: "classstyle",
          property: dataProperty,
          target: element.getAttribute("data-element_id"),
          tagName: element.tagName,
          value,
          unit,
        }, crdtCon) :
        sendCrdtPayload({
          method: "style",
          property: dataProperty,
          target: element.getAttribute("data-element_id"),
          tagName: element.tagName,
          value,
          unit,
        }, crdtCon);
    },
  });
  }
    catch (error) {
      console.log("ccAttribute init error", error);
    }


  try {
    window.ccAttribute.addFilter(".vdom-item");
    window.ccAttribute.addFilter("#ghostEffect");
    window.ccAttribute.init({
      isIframe: true,
      frame: canvas,
      onCollaboration: ({ read, value, element }) => {
        sendCrdtPayload({
          method: "setAttribute",
          property: read,
          target: element.getAttribute("data-element_id"),
          tagName: element.tagName,
          value,
        }, crdtCon);
      },
    });
  }
  catch (error) {
    console.error("ccAttribute init error", error);    throw error;
  }

  try {
    window.CoCreateToolbar.init({
      selector: "#selectedElementcoc",
      event: "click",
      config: elementConfig,
      configKey: "selectable",
      frame: canvas,
    });

    window.CoCreateToolbar.init({
      selector: "#hoveredElementcoc",
      event: "mouseover",
      config: elementConfig,
      configKey: "hoverable",
      frame: canvas,
    });
  }
  catch (error) {
    console.error("toolbar init error", error);    throw error;
  }
  // window.CoCreateToolbar.init('#abcElementcoc','mouseover', canvas)

  // initvdom
  try {
    // init selected
    // make ccStyle work
    window.selected2({
      sourceDocument: canvasDocument,
      destDocument: document,
      elementSelector: "*",
      targetSelector: "[data-style]",
      source: "data-element_id",
      destination: "data-style_target",
      wrap: "[data-element_id=$1]",
    });

    // make ccAttribute work
    window.selected2({
      sourceDocument: canvasDocument,
      destDocument: document,
      elementSelector: "*",
      targetSelector: "[data-attribute_sync]",
      source: "data-element_id",
      destination: "data-attribute_target",
      wrap: "[data-element_id=$1]",
    });
  }
  catch (error) {
    console.error("selected2 init error", error);    throw error;
  }
  window.selected2({
    sourceDocument: canvasDocument,
    destDocument: document,
    elementSelector: "*",
    targetSelector: "[data-attribute_sync],[data-style]",
    source: "data-element_id",
    destination: "name",
    newValueCB:(src,dest,srcValue)=> dest.id + '-'  + srcValue
  });
  // initvdom
  try {
    let vdomTargets = document.querySelector("[data-vdom_target]");
    let vdomRealDom = document.querySelector("[data-vdom_id]");
    vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
    vdomTargets.innerText = "";
    if (window.CoCreateVdom && vdomRealDom && vdomTargets)
      window.vdomObject = window.CoCreateVdom.initVdom({
        realdom: vdomRealDom,
        virtualDom: vdomTargets,
      });
  
  }
  catch (error) {
    console.error("selected2 init error", error);    throw error;
  }
  let e = 6;
  // });
}
