import { dropMarker, boxMarker, boxMarkerTooltip, getCoc, closestChild } from './util/common'
import selectorUtil from './util/selectorUtil';
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




let topleft = ['left', 'top'];

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

function DND() {
  this.dragedEl;
  this.dropedEl;
  this.position;
  this.id;
  this.dragStart = (e, el, id) => {
    // #broadcast
    // domEditor({
    //   obj: selectorUtil.cssPath( this.dropedEl),
    //   method: 'insertAdjacentElement',
    //   value: { param1: [this.position, selectorUtil.cssPath(this.dragedEl)] }
    // });
    this.id = id;
    console.log({
      comment: 'dragStart',
    })
    dfonclk.onActive(e.target)
    selectBoxMarker.hide(onRemove)
    greenDropMarker.hide();
    el.setAttribute('CoC-dragging', true)
    this.dragedEl = el;
  }

  this.dragEnd = (e) => {
    try {
      if (this.position) {
        if (this.dropedEl === this.dragedEl)
          throw 'dnd cancelled. you can dnd on the same element.'

        // in future we should also disable hover and tag name in dragOver method
        // parent can't be draged into children
        if (this.dragedEl.contains(this.dropedEl))
          throw 'dnd cancelled, you can\'t dnd from parent to its children.'

        // #broadcast

        // broadcast the object inside the domEditor
        // it's serializable
        // domEditor({
        //   obj: selectorUtil.cssPath(this.dropedEl),
        //   method: 'insertAdjacentElement',
        //   value: { param1: [this.position, selectorUtil.cssPath(this.dragedEl)] }
        // });
        console.log({
          comment: 'dragEnd',
          obj: this.id ? this.id : selectorUtil.cssPath(this.dropedEl),
          method: 'insertAdjacentElement',
          value: { param1: [this.position, selectorUtil.cssPath(this.dragedEl)] }
        })
        this.id = null;
        this.dropedEl.insertAdjacentElement(this.position, this.dragedEl);

      }
    }
    catch (e) {
      console.error(e)
    }
    finally {
      greenDropMarker.hide()
      this.position = null;
      if (this.dragedEl)
        this.dragedEl.removeAttribute('CoC-dragging')
      dfonclk.onInactive(e.target)
      console.log('dnd completed')
    }
  }

  this.dragOver =
    (e, el) => {
      // el is the element hovered
      if (el.children.length === 0) {
        // place top or bottom inside the element
        let [orientation, closestEl] = closestChild([e.x, e.y], [el]);
        greenDropMarker.draw(el, el, orientation, true);
        hoverBoxMarker.draw(el)
        tagNameTooltip.draw(el)
        this.position = topleft.includes(orientation) ? "afterbegin" : "beforeend";
        this.dropedEl = el;
      }
      else {
        // find closest child and put outside the child element on top or bottom relating to that child,
        let [orientation, closestEl] = closestChild([e.x, e.y], el.children);
        greenDropMarker.draw(el, closestEl, orientation, false);
        hoverBoxMarker.draw(el)
        tagNameTooltip.draw(el)
        this.position = topleft.includes(orientation) ? "beforebegin" : "afterend";
        this.dropedEl = closestEl;
      }
    }
}




let dnd = new DND();

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
