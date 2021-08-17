import { mount } from "./compile"
import { patch } from "./patch"
import { reactive, watchEffect } from "./reactive"

export function h(tag, props, children) {
  return { tag, props, children }
}

export function createApp(Component, container) {
  // implement this
  const state = reactive(Component.data())
  let isMount = true
  let prevTree
  watchEffect(() => {
    const tree = Component.render.call(state)
    if (isMount) {
      mount(tree, container)
      isMount = false
    } else {
      patch(prevTree, tree)
    }
    prevTree = tree
  })
}
