import { Dep } from "./dep"

export let activeEffect

export function watchEffect(effect) {
  activeEffect = effect
  effect()
  activeEffect = null
}

// proxy version
const reactiveHandlers = {
  get(target, key) {
    // how do we get the dep for this key?
    const value = getDep(target, key).value
    if (value && typeof value === 'object') {
      return reactive(value)
    } else {
      return value
    }
  },
  set(target, key, value) {
    getDep(target, key).value = value
    // 定义 Proxy 代理对象的 set 的时候需要返回 true
    // 否则会报错 Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'count'
    return true
  }
}

const targetToHashMap = new WeakMap()

function getDep(target, key) {
  let depMap = targetToHashMap.get(target)
  if (!depMap) {
    depMap = new Map()
    targetToHashMap.set(target, depMap)
  }

  let dep = depMap.get(key)
  if (!dep) {
    dep = new Dep(target[key])
    depMap.set(key, dep)
  }

  return dep
}

export function reactive(obj) {
  return new Proxy(obj, reactiveHandlers)
}