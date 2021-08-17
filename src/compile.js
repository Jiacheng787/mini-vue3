export function mount(vnode, container, anchor) {
  const el = document.createElement(vnode.tag)
  vnode.el = el
  // props
  if (vnode.props) {
    for (const key in vnode.props) {
      if (key.startsWith('on')) {
        el.addEventListener(key.slice(2).toLowerCase(), vnode.props[key])
      } else {
        el.setAttribute(key, vnode.props[key])
      }
    }
  }
  if (vnode.children) {
    if (typeof vnode.children === 'string') {
      el.textContent = vnode.children
    } else {
      vnode.children.forEach((child) => {
        mount(child, el)
      })
    }
  }
  if (anchor) {
    container.insertBefore(el, anchor)
  } else {
    container.appendChild(el)
  }
}