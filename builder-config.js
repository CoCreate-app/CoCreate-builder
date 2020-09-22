// come to bottom

let elementConfig = [
  {
    displayname: "default",
    selector: ["body, body *"],
    hoverable: "true",
    selectable: "true",
    editable: "true",
    // toolbar: { 'test': 'testing this' },
  },
  {
    displayname: "body",
    selector: ["body, body"],
  },
  {
    displayname: "form",
    selector: ["form"],
    editable: "true",
  },
  {
    displayname: "input",
    selector: "input",
    editable: "false",
  },
  {
    displayname: "textarea",
    selector: "textarea",
    editable: "false",
  },
  {
    displayname: "select",
    selector: "select",
    editable: "false",
  },
];
window.elementConfig = elementConfig;

window.addEventListener("load", () => {
  console.log("build-config start");
  window.parent.addEventListener("load", () => {
    // init dnd
    window.initDnd({
      target: document,
      drop: "*",
      drag: "*",
    });

    // initvdom
    let vdomTargets = window.parent.document.querySelector(
      "[data-vdom_target]"
    );
    let vdomRealDom = window.parent.document.querySelector("[data-vdom_id]");
    vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
    window.vdomInit({ realdom: vdomRealDom, virtualDomContainer: vdomTargets });
  });
  // dom.element(elementConfig);
  console.log("build-config end");
});
