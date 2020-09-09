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
  window.parent.addEventListener('load', ()=>{
    window.initDnd({
      target: document,
      drop: "*",
      drag: "*",
    });
  })
  // dom.element(elementConfig); 
  console.log("build-config end");
});
