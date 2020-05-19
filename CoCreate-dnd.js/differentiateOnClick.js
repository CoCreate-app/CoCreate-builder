// when simualting dnd with mouse events, we have to define other mesures to listen on "onClick" event as
// a mouse event trigger all mouse life cycle (mouse down, mouse up, onClick) we redefine the onClick event


var onClick = new Event('onClickCoCreate');

export function differentiateOnClick() {

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
