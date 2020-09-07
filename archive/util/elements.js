import { droppable, draggable, selectable, editable, hoverable } from '../../util/variables.js'
import domEditor from './domEditor';


function element(type, { displayName, selector, classes, attributtes, draggable, droppable, selectable, editable, hoverable }) {

  var dataset = {
    "data-type": type, // type calendar
    "data-name": displayName ? displayName : ''
  };
  if (typeof draggable === 'string') dataset[draggable] = draggable;
  if (typeof droppable === 'string') dataset[droppable] = droppable;
  if (typeof selectable === 'string') dataset[selectable] = selectable;
  if (typeof editable === 'string') dataset[editable] = editable;
  if (typeof hoverable === 'string') dataset[hoverable] = hoverable;

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
