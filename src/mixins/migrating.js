export default {
  mounted() {
    if (process.env.NODE_ENV === 'production') return
    if (!this.$vnode) return
    // eslint-disable-next-line
    const { props = {}, events = {} } = this.getMigratingConfig()
    const { data, componentOptions } = this.$vnode
    const definedProps = data.attrs || {}
    const definedEvents = componentOptions.listeners || {}

    for (let propName in definedProps) {
      if (definedProps.hasOwnProperty(propName) && props[propName]) {
        console.warn(`[Migrating][${this.$options.name}][Attribute]: ${props[propName]}`)
      }
    }

    for (let eventName in definedEvents) {
      if (definedEvents.hasOwnProperty(eventName) && events[eventName]) {
        console.warn(`[Migrating][${this.$options.name}][Event]: ${events[eventName]}`)
      }
    }
  },
  methods: {
    getMigratingConfig() {
      return {
        props: {},
        events: {}
      }
    }
  }
}
