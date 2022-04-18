import defined from './defined'

const compareNumber = (a: number, b: number) => {
  return b - a;
}

class Event {
  private _listeners: Function[]
  private _scopes: object[]
  private _toRemove: number[]
  private _insideRaiseEvent: boolean

  constructor() {
    this._listeners = []
    this._scopes = []
    this._toRemove = []
    this._insideRaiseEvent = false
  }

  get numberOfListeners() {
    return this._listeners.length - this._toRemove.length
  }

  addEventListener(listener: Function, scope: object) {
    this._listeners.push(listener)
    this._scopes.push(scope)

    const event = this
    return () => {
      event.removeEventListener(listener, scope)
    }
  }

  removeEventListener(listener: Function, scope: object) {
    const listeners = this._listeners
    const scopes = this._scopes

    let index = -1
    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === listener && scopes[i] === scope) {
        index = i
        break
      }
    }

    if (index !== -1) {
      if (this._insideRaiseEvent) {
        //In order to allow removing an event subscription from within
        //a callback, we don't actually remove the items here.  Instead
        //remember the index they are at and undefined their value.
        this._toRemove.push(index)
        listeners[index] = undefined
        scopes[index] = undefined
      } else {
        listeners.splice(index, 1)
        scopes.splice(index, 1)
      }
      return true
    }

    return false
  }

  raiseEvent() {
    this._insideRaiseEvent = true;

    let i: number;
    const listeners = this._listeners;
    const scopes = this._scopes;
    let length = listeners.length;

    for (i = 0; i < length; i++) {
      const listener = listeners[i];
      if (defined(listener)) {
        listeners[i].apply(scopes[i], arguments);
      }
    }

    //Actually remove items removed in removeEventListener.
    const toRemove = this._toRemove;
    length = toRemove.length;
    if (length > 0) {
      toRemove.sort(compareNumber);
      for (i = 0; i < length; i++) {
        const index = toRemove[i];
        listeners.splice(index, 1);
        scopes.splice(index, 1);
      }
      toRemove.length = 0;
    }

    this._insideRaiseEvent = false;
  }
}

export default Event
