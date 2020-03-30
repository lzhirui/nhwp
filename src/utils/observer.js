let observer = {
  arr: [],
  $on(event, cb) {
    this.arr[event] = [cb]
  },
  $emit(event, ...msg) {
    this.arr[event].map(i => {
      i(...msg)
    })
  },
  $destory(event) {
    delete this.arr[event]
  }
}
export default observer
