import { activeEffect } from "./reactive"

export class Dep {
  // imeplement this
  subscribers = new Set()

  constructor(value) {
    this._value = value
  }

  get value() {
    this.depend()
    return this._value
  }

  set value(value) {
    this._value = value
    this.notify()
  }

  depend() {
    if (activeEffect) {
      this.subscribers.add(activeEffect)
    }
  }

  notify() {
    this.subscribers.forEach((effect) => {
      effect()
    })
  }
}