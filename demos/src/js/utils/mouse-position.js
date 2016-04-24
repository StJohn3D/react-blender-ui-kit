class MousePosition {
  constructor() {
    if (document && document.addEventListener) {
      document.addEventListener('mousemove', this.onMouseMove)
      document.addEventListener('scroll', this.onScroll)
    }
    this.current = {
      clientX: 0, clientY: 0, scrollY: 0, scrollX: 0,
    }
  }

  onMouseMove = e => {
    this.current.clientX = e.clientX
    this.current.clientY = e.clientY
    //console.log(`mouse moved to ${e.clientX},${e.clientY}`)
  }

  onScroll = e => {
    this.current.scrollX = window.scrollX
    this.current.scrollY = window.scrollY
    //console.log(`screen scrolled to ${e.scrollX},${e.scrollY}`)
  }
}

var mousePosition = new MousePosition()
export default mousePosition
