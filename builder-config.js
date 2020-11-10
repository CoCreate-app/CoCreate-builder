// come to bottom

let elementConfig = [
  {
    displayname: "default",
    selector: ["*"],
    hoverable: "true",
    selectable: "true",
    editable: "true",
    // draggable: "true",
    // droppable: "true",
    
    // toolbar: { 'test': 'testing this' },
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
  {
    displayname: "body",
    selector: ["body"],
  },
];
window.elementConfig = elementConfig;

window.addEventListener("load", () => {
  let canvas = document.querySelector("#canvas");
  if (!canvas)
    console.error("builder config failed, can not find canvas iframe");
  let canvasDocument = canvas.contentWindow.document || canvas.contentDocument;

  // init dnd
  // window.initElement({
  //   target: canvasDocument.body,
  //   dropable: "*",
  //   draggable: "*",
  //   beforeDndSuccess: function({ dragedEl, dropType })
  //   {
  //     //add
  //     if (dropType === "data-cloneable") {
  //     let body = document.createElement("body");
  //     body.appendChild(dragedEl.cloneNode(true));
  //     dom.element(elementConfig, {
  //       context: body,
  //       setAttribute: "setHiddenAttribute",
  //     });
  //     return { dragedEl: body.children[0] }
  //   }
  //   }
  // });
  // window.initElement({
  //   target: canvasDocument.body,
  //   shallDnd: function (element){
  //     return [element, 'data-draggable']
  //   },
  //   beforeDndSuccess: function({ dragedEl, dropType })
  //   {
  //     //add
  //     if (dropType === "data-cloneable") {
  //     let body = document.createElement("body");
  //     body.appendChild(dragedEl.cloneNode(true));
  //     dom.element(elementConfig, {
  //       context: body,
  //       setAttribute: "setHiddenAttribute",
  //     });
  //     return { dragedEl: body.children[0] }
  //   }
  //   }
  // });


try{
  // init selected
      window.selected2({
        elementSelector:'*',
        targetSelector: 'input[data-style]',
        source: 'data-element_id',
        destination: 'data-style_target',
        wrap: '[data-element_id=$1]',
      })
      
      window.selected2({
        elementSelector:'*',
        targetSelector: 'input[data-attribute_sync]',
        source: 'data-element_id',
        destination: 'data-attribute_target',
        wrap: '[data-element_id=$1]',
        
      })
}catch(error){
    console.log('aaaaaa', error)

}



  // initvdom
  let vdomTargets = document.querySelector("[data-vdom_target]");
  let vdomRealDom = document.querySelector("[data-vdom_id]");
  vdomRealDom = vdomRealDom.contentDocument.body.parentNode;
  if (window.CoCreateVdom && vdomRealDom && vdomTargets)
    window.vdomObject = window.CoCreateVdom.initVdom({
      realdom: vdomRealDom,
      virtualDom: vdomTargets,
    });
  else console.error("builder config failed to create vdom instance");
});
