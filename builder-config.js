let elementConfig = [
  {
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

window.elementConfig = elementConfig;

let canvasHtmlTagEvnt = false;
window.testMap = new Map();
window.addEventListener("load", () => {
  // setInterval(() => {
  //     let html = document.querySelector(
  //     '[data-document_id="5edda7608d5c7a7d656edecd"]'
  //   ).value;

  //   if (!window.testMap.has(html.length)) window.testMap.set(html.length, html);
  // }, 5);
  initBuilder();
});
window.addEventListener("CoCreateHtmlTags-rendered", (e) => initBuilder());
function sendCrdtPayload(findPos, crdt) {
  let html = CoCreate.getDataCrdt(crdt);

  let pos1, pos2;
  switch (findPos.method) {
    case "insertAdjacentElement":
      pos1 = new findPosition({
        html,
        tagName: findPos.target.el.tagName,
        target: findPos.target.el.getAttribute("data-element_id"),
        nextSibling: findPos.target.nextSibling,
        skip: findPos.target.skip,
        method: "removeElement",
      });

      pos2 = new findPosition({
        html,
        tagName: findPos.element.el.tagName,
        target: findPos.element.el.getAttribute("data-element_id"),
        nextSibling: findPos.element.nextSibling,
        skip: findPos.element.skip,
        method: "insertAdjacentElement",
        property: findPos.property,
      });

      if (pos2.from >= pos1.to) {
        pos2.from -= pos1.to - pos1.from;
      }

      CoCreate.deleteDataCrdt({
        ...crdt,
        position: pos1.from,
        length: pos1.to - pos1.from,
      });

      CoCreate.insertDataCrdt({
        ...crdt,
        value: findPos.target.el.outerHTML,
        position: pos2.from,
      });
      break;
    case "style.set":
      pos1 = new findPosition({
        html,
        target: findPos.target,
        tagName: findPos.tagName,
        property: findPos.property,
        method: "style.set",
      });
      if (pos1.context == "attribute")
        findPos.value = ` style="${findPos.property}:${findPos.value};"`;
      else findPos.value = ` ${findPos.property}:${findPos.value}`;

      if (pos1.to)
        CoCreate.insertDataCrdt({
          ...crdt,
          position: pos1.from,
          length: pos1.to - pos1.from,
        });

      CoCreate.insertDataCrdt({
        ...crdt,
        value: findPos.value,
        position: pos1.from,
      });
      break;
    default:
    // code
  }
}

let isDndFindDef = false;
function initBuilder() {
  let canvas = document.querySelector("#canvas");
  if (!canvas)
    console.error("builder config failed, can not find canvas iframe");
  let canvasWindow = canvas.contentWindow;
  let canvasDocument = canvasWindow.document || canvas.contentDocument;
  canvasWindow.addEventListener("load", (e) => initBuilder("iframe", e));
  domEditor({
    context: canvasDocument,
    selector_type: "querySelectorAll",
    selector: "*",
    idGenerator: CoCreateUtils.UUID,
  });
  // if (type !== 'iframe') return;
  // init dnd
  // console.log("1111111111 iframe loaded inside builder config");
  // if (!window.testMap.has(canvasDocument))
  //   window.testMap.set(canvasDocument, []);
  // if (canvasDocument.body)
  //   window.testMap.get(canvasDocument).push("init " + type + e);
  // else window.testMap.get(canvasDocument).push("init with no body " + type);
  function getNextTarget(element) {
    let i = 0,
      tagName = element.tagName;
    while (element && !element.nextElementSibling) {
      element = element.parentElement;
      if (element.tagName === tagName) i++;
    }
    // if (element.nextElementSibling.tagName === tagName) i++;
    if (element)
      return [element.nextElementSibling.getAttribute("data-element_id"), i];
    else return [undefined, undefined];
  }

  if (!isDndFindDef) {
    isDndFindDef = true;
    window.addEventListener("dndsuccess", (e) => {
      let {
        position,
        dragedEl,
        dropedEl,
        dropType,
        path,
        dragNextSib,
        dropNextSib,
      } = e.detail;

      let pos, pos2;
      switch (dropType) {
        case "data-draggable":
          sendCrdtPayload(
            {
              method: "insertAdjacentElement",
              property: position,
              target: {
                el: dragedEl,

                nextSibling: dragNextSib[0],
                skip: dragNextSib[1],
              },
              element: {
                el: dropedEl,
                nextSibling: dropNextSib[0],
                skip: dropNextSib[1],
              },
            },
            {
              collection: "module_activities",
              document_id: "5edda7608d5c7a7d656edecd",
              name: "html",
            }
          );

          break;
        case "data-cloneable":
          break;
      }
    });
  }
  window.CoCreateDnd.initIframe({ document, window });
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
      detail.dragNextSib = getNextTarget(detail.dragedEl);
      detail.dropNextSib = getNextTarget(detail.dropedEl);
      if (!detail.dragedEl.getAttribute("data-element_id"))
        detail.dragedEl.setAttribute("data-element_id", CoCreateUtils.UUID());
    },
  });

  window.ccStyle.addFilter(".vdom-item");
  window.ccStyle.init({
    isIframe: true,
    frame: canvas,
    onCollaboration: ({ value, dataProperty, dataAttribute, element }) => {
      sendCrdtPayload(
        {
          method: "style.set",
          property: dataProperty,
          target: element.getAttribute("data-element_id"),
          tagName: element.tagName,
          value,
        },
        {
          collection: "module_activities",
          document_id: "5edda7608d5c7a7d656edecd",
          name: "html",
        }
      );
    },
  });
  window.ccAttribute.addFilter(".vdom-item");
  window.ccAttribute.init({ isIframe: true, frame: canvas });

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

  // window.CoCreateToolbar.init('#abcElementcoc','mouseover', canvas)

  try {
    // init selected
    window.selected2({
      sourceDocument: canvasDocument,
      destDocument: document,
      elementSelector: "*",
      targetSelector: "[data-style]",
      source: "data-element_id",
      destination: "data-style_target",
      wrap: "[data-element_id=$1]",
    });

    window.selected2({
      sourceDocument: canvasDocument,
      destDocument: document,
      elementSelector: "*",
      targetSelector: "[data-attribute_sync]",
      source: "data-element_id",
      destination: "data-attribute_target",
      wrap: "[data-element_id=$1]",
    });

    // initvdom

    let vdomTargets = document.querySelector("[data-vdom_target]");
    let vdomRealDom = document.querySelector("[data-vdom_id]");
    vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
    vdomTargets.innerText = "";
    if (window.CoCreateVdom && vdomRealDom && vdomTargets)
      window.vdomObject = window.CoCreateVdom.initVdom({
        realdom: vdomRealDom,
        virtualDom: vdomTargets,
      });
  } catch (error) {
    console.log("builder error", error);
  }

  // });
}
