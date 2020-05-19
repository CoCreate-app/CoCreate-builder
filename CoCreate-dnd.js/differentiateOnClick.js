// when simualting dnd with mouse events, we have to define other mesures to listen on "onClick" event as
// a mouse event trigger all mouse life cycle (mouse down, mouse up, onClick) we redefine the onClick event



export function onClickLeftEvent() {

  this._lastEl = null;
  this._time = null;

  document.addEventListener('mousedown', e => {
    if (e.which === 1) {
      this._lastEl = e.el;
      this._time = new Date().getTime()
    }
  })

  document.addEventListener('mouseup', e => {
    let newTime = new Date().getTime();
    if (this._lastEl == e.target && newTime < this._time + 500) {
      const event = new CustomEvent('CoCreateClickLeft', {
        bubbles: true
      });
      e.target.dispatch(event)
    }

  })

}
