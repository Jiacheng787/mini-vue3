import { mount } from "./compile"

export function patch(n1, n2) {
  // Implement this
  // 1. check if n1 and n2 are of the same type
  if (n1.tag !== n2.tag) {
    // 2. if not, replace
    const parent = n1.el.parentNode
    const anchor = n1.el.nextSibling
    parent.removeChild(n1.el)
    mount(n2, parent, anchor)
    return
  }

  const el = (n2.el = n1.el)

  // 3. if yes
  // 3.1 diff props
  const oldProps = n1.props || {}
  const newProps = n2.props || {}
  for (const key in newProps) {
    const newValue = newProps[key]
    const oldValue = oldProps[key]
    if (newValue !== oldValue) {
      if (newValue != null) {
        el.setAttribute(key, newValue)
      } else {
        el.removeAttribute(key)
      }
    }
  }
  for (const key in oldProps) {
    if (!(key in newProps)) {
      el.removeAttribute(key)
    }
  }
  // 3.2 diff children
  const oc = n1.children
  const nc = n2.children
  if (typeof nc === 'string') {
    if (nc !== oc) {
      el.textContent = nc
    }
  } else if (Array.isArray(nc)) {
    if (Array.isArray(oc)) {
      // array diff
      const commonLength = Math.min(oc.length, nc.length)
      for (let i = 0; i < commonLength; i++) {
        patch(oc[i], nc[i])
      }
      if (nc.length > oc.length) {
        nc.slice(oc.length).forEach((c) => mount(c, el))
      } else if (oc.length > nc.length) {
        oc.slice(nc.length).forEach((c) => {
          el.removeChild(c.el)
        })
      }
    } else {
      el.innerHTML = ''
      nc.forEach((c) => mount(c, el))
    }
  }
}