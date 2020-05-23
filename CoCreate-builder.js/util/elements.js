import { droppable, draggable, selectable } from '../../util/variables.js'

function domEditor({ obj, selector_type, selector, method, index, property, sub_property, value }) {

  if (!obj) {
    if (!document[selector_type])
      throw new Error('selector type not supported.')



    obj = document[selector_type](selector);

    if (!obj)
      return null;

  }


  if (index && obj[index])
    obj = obj[index];


  if (!method)
    return obj;

  let objs = (obj.length > 0) ? obj : [obj];

  let results = [];
  let element;
  objs.forEach(obj => {
    let result = apply_method({ obj, method, property, value })

    if (result)
      results.push(result);
    else
      element = obj[method]

  })
  if (element) return element;
  return results;
}


function apply_method({ obj, method, property, value }) {
  let results = [];

  if (typeof value == 'string')
    value = [value];

  if (method == 'style')
    if (value) {
      obj[method][property] = value;
      return;
    }
  else {
    return obj[method][property];
  }

  let querySection = method.split(".");
  let func = querySection.reduce((a, c) => a[c], obj);
  let lastEl = querySection.pop();
  let env = querySection.reduce((a, c) => a[c], obj);

  if (typeof env[lastEl] != 'function')
    if (value) {
      env[lastEl] = value;
      return;
    }
  else {
    return env[lastEl];
  }


  if (!value && typeof env[lastEl] == 'function')
    env[lastEl]();


  if (Array.isArray(value)) {
    value.forEach(e => {
      let result = func.call(env, e)
      results.push(result)
    });
  }
  else if (typeof value == 'object') {
    Object.entries(value).forEach((e) => {
      let result = func.apply(env, e)
      results.push(result)
    });
  }
  return results;
}






function element(type, { displayName, selector, classes, attributtes, draggable, droppable, selectable, editable, hoverable }) {

  var dataset = {
    "data-CoC-type": type, // type calendar
    "data-CoC-name": displayName ? displayName : ''
  };
  if (typeof draggable === 'string') dataset[draggable] = draggable;
  if (typeof droppable === 'string') dataset[droppable] = droppable;
  if (typeof selectable === 'string') dataset[selectable] = selectable;
  if (typeof editable === 'string') dataset['data-CoC-editable'] = editable;
  if (typeof hoverable === 'string') dataset['data-CoC-hoverable'] = hoverable;

  domEditor({ selector_type: 'querySelectorAll', selector, method: 'setAttribute', value: dataset });
  // unkown use case and cause exception! I will make them work in a way that corresponds our requirement when needed
  // domEditor({ selector_type: 'querySelectorAll', selector, method: 'classList.add', value: classes = [] });
  // domEditor({ selector_type: 'querySelectorAll', selector, method: 'setAttribute', value: attributtes = [] });

}




element('default', {
  selector: ['body, body *'],
  draggable: 'true',
  droppable: 'true',
  hoverable: 'true',
  selectable: 'true',
  editable: 'true',
  // toolbar: { 'test': 'testing this' },
});

element('form', {
  selector: ['form'],
  editable: 'true'
});

element('input', {
  selector: 'input',
  editable: 'false'
});

element('textarea', {
  selector: 'textarea',
  editable: 'false'
});

element('select', {
  selector: 'select',
  editable: 'false'
});

/*
element('default', {
  displayName: '',
  selector: ['body, body *'],
  classes: ['test'],
  attributtes: { 'test': 'testing this' },
  draggable: 'true',
  droppable: 'true',
  hoverable: 'true',
  selectable: 'true',
  editable: 'true'
});
*/
