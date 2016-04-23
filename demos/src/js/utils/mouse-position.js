class MousePosition {
  constructor() {
    if (document && document.addEventListener) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('scroll', this.onScroll)
    }
    this.clientX = 0
    this.clientY = 0
    this.scrollY = 0
    this.scrollX = 0
  }

  onMouseMove = e => {
    this.clientX = e.clientX
    this.clientY = e.clientY
    //console.log(`mouse moved to ${this.clientX},${this.clientY}`)
  }

  onScroll = e => {
    this.scrollX = window.scrollX
    this.scrollY = window.scrollY
    //console.log(`screen scrolled to ${this.scrollX},${this.scrollY}`)
  }
}

var mousePosition = new MousePosition()
export default mousePosition
