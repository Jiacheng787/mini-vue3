import { createApp, h } from "./src/vue"

const Component = {
  data() {
    return {
      count: 0
    }
  },
  render() {
    return h(
      'div',
      null,
      [
        h(
          'span',
          null,
          String(this.count)
        ),
        h(
          'button',
          {
            onClick: () => {
              this.count++
            }
          },
          "Click"
        )
      ]
    )
  }
}

// calling this should actually mount the component.
createApp(Component, document.getElementById('app'))