import { dropMarker, boxMarker, boxMarkerTooltip, getCoc } from './util/common'
import selectorUtil from './util/selectorUtil';
import VirtualDnd from './util/virtualDnd/virtualDnd';
import './util/elements';

document.mydnd = {}


let consolePrintedEl = null; // dev

const onAdd = (el) => {
  console.log({
    comment: 'onSelect',
    obj: selectorUtil.cssPath(el),
    method: 'setAttribute',
    value: ['id']
  })
  el.setAttribute('data-selected_users', 'id')
};


const onRemove = (lastEl) => {

  console.log({
    comment: 'onUnselect',
    obj: selectorUtil.cssPath(lastEl),
    method: 'removeAttribute',
  });

  lastEl.removeAttribute('data-selected_users')
}





let tagNameTooltip = new boxMarkerTooltip((el) => {
  let name = el.getAttribute('data-CoC-name');
  return name ? name : el.tagName;
});
let greenDropMarker = new dropMarker();
let hoverBoxMarker = new boxMarker("CoC-hovered", 1);
let selectBoxMarker = new boxMarker("CoC-selected", 2);

let dfonclk = new differentiateOnClick();

// &&disable native drag
document.addEventListener('dragstart', () => {
  return false;
})

document.addEventListener('selectstart', (e) => {
  let el = getCoc(e.target, 'data-CoC-draggable')
  if (el) e.preventDefault();
})
// &&disable native drag





let dnd = new VirtualDnd();

dnd.on('dragStart', (data) => {
  dfonclk.onActive(data.e.target)
  selectBoxMarker.hide(onRemove)
  greenDropMarker.hide();
})
dnd.on('dragEnd', (data) => {
  greenDropMarker.hide()
  dfonclk.onInactive(data.e.target)
})
dnd.on('dragOver', (data) => {
  greenDropMarker.draw(data.el, data.closestEl, data.orientation, !data.hasChild);
  hoverBoxMarker.draw(data.el)
  tagNameTooltip.draw(data.el)
})


document.mydnd = dnd;

// touch
document.addEventListener('touchstart', (e) => {
  console.log('touch start')
  let el = getCoc(e.target, 'data-CoC-draggable')
  if (!el) return;
  dnd.dragStart(e, el)

})

function touchEnd(e) {

  dnd.dragEnd(e);
  greenDropMarker.hide();
  hoverBoxMarker.hide();
  tagNameTooltip.hide();
}

document.addEventListener('touchend', (e) => {

  console.log('touch end')
  touchEnd(e)

})

document.onHostTouchEnd = (e) => {
  touchEnd(e)

}

document.addEventListener('touchmove', (e) => {
  console.log('touch move')

  //todo: check if why e.target doesn't change on touch move
  let touch = e.touches[0];
  let x = touch.clientX;
  let y = touch.clientY;
  let el = document.elementFromPoint(x, y);

  let onEl = el; // dev
  el = getCoc(el, 'data-CoC-droppable');
  if (!el) return;

  if (consolePrintedEl != el) {
    // dev
    console.log("you are on: \n", onEl, "\nDroping in: \n", el);
    consolePrintedEl = el;
  }

  dnd.dragOver({ x, y }, el)

})

document.onHostTouchMove = ({ x, y }) => {

  let el = document.elementFromPoint(x, y);
  if (!el) return; // it's out of iframe
  let onEl = el; // dev
  el = getCoc(el, 'data-CoC-droppable');
  if (!el) return;

  if (consolePrintedEl != el) { // dev
    // dev
    console.log("you are on: \n", onEl, "\nDroping in: \n", el);
    consolePrintedEl = el;
  }

  dnd.dragOver({ x, y }, el)

}
// touch


// mouse
document.addEventListener('mousedown', (e) => {
  console.log('mouse down', e);

  if (e.which != 1)
    return;

  let el = getCoc(e.target, 'data-CoC-draggable')
  if (!el) return;
  hoverBoxMarker.hide();
  tagNameTooltip.hide();
  dnd.dragStart(e, el);
})


document.addEventListener('mouseup', (e) => {
  console.log('mouse up', e);
  let el = getCoc(e.target, 'data-CoC-hoverable')
  if (!el) return;
  if (e.which != 1)
    return;

  dnd.dragEnd(e)


})

document.onHostMouseUp = (e) => {
  greenDropMarker.hide();
  dnd.dragEnd(e);
}



document.onHostMouseOver = (e) => {

  hoverBoxMarker.hide();
  tagNameTooltip.hide();

  dnd.position = null;

};



document.addEventListener('mouseover', (e) => {
  console.log('mouse over')
  let el = getCoc(e.target, 'data-CoC-hoverable');

  if (!el) {
    tagNameTooltip.hide(el);
    hoverBoxMarker.hide(el);
  }
  else {
    hoverBoxMarker.draw(el);
    tagNameTooltip.draw(el);

  }

  el = getCoc(e.target, 'data-CoC-droppable');

  if (!el || !dfonclk.isDraging) return;
  dnd.dragOver(e, el)


})
// mouse



// not working
document.addEventListener('click', (e) => {
  console.log('dnd: on click', e);

  if (dfonclk.isOnClick) {
    let el = getCoc(e.target, 'data-CoC-selectable');
    if (!el) return;


    selectBoxMarker.draw(el, onAdd, onRemove);
  }
})


function differentiateOnClick() {

  this.isOnClick = false;
  this.isDraging = false;

  this._lastEl = null;
  this._time = null;
  // @param el: el as e.target
  this.onActive = (el) => {
    this._lastEl = el;
    this._time = new Date().getTime()
    this.isDraging = true;
  }


  // @param el: el as e.target
  this.onInactive = (el) => {

    let newTime = new Date().getTime();
    if (this.isDraging) {
      if (this._lastEl == el && newTime < this._time + 500)
        this.isOnClick = true;
      else
        this.isOnClick = false;
    }
    this.isDraging = false;

  }

}
