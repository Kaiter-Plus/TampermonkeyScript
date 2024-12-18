interface Position {
  top: number
  left: number
}

enum DIRECTION {
  UP = -1, DOWN = 1
}

// 默认速度
let defaultSpeed: number = 5
// 定时器id
let currentFrameId: number = 0
// 记录上一次执行的时间
let prevTIme: number = 0
// 按下的位置
const pressPosition: Position = { top: 0, left: 0 }

// 初始化速度
const speed: string = GM_getValue('speed')
speed ? (defaultSpeed = +speed) : GM_setValue('speed', defaultSpeed)

// 创建一个滚动容器
const scrollContainer = GM_addElement(document.body, 'div', {
  id: 'scroll-container',
  class: 'scroll-container'
})
scrollContainer.addEventListener('mousedown', press)

// 创建自动向上的按钮
const scrollUp = GM_addElement(scrollContainer, 'div', {
  id: 'scroll-up',
  class: 'scroll-up'
})
scrollUp.addEventListener('mouseover', () => {
  autoScroll(DIRECTION.UP)
})
scrollUp.addEventListener('mouseout', stopScroll)

// 创建速度显示
const scrollSpeed = GM_addElement(scrollContainer, 'div', {
  id: 'scroll-speed',
  class: 'scroll-speed',
  textContent: speed
})
scrollSpeed.addEventListener('wheel', settingSpeed)

// 创建自动向下的按钮
const scrollDown = GM_addElement(scrollContainer, 'div', {
  id: 'scroll-down',
  class: 'scroll-down'
})
scrollDown.addEventListener('mouseover', () => {
  autoScroll(DIRECTION.DOWN)
})
scrollDown.addEventListener('mouseout', stopScroll)

// 自动滚动
function autoScroll(direction: DIRECTION) {
  scroll(direction)
}

// 滚动
function scroll(direction: DIRECTION) {
  currentFrameId = window.requestAnimationFrame(time => {
    if (!prevTIme) prevTIme = time
    const elapsed = (time - prevTIme) / 1000
    // 每 50ms 执行一次
    window.scrollBy(0, defaultSpeed * 10 * direction * elapsed)
    prevTIme = time
    scroll(direction)
  })
}

// 停止滚动
function stopScroll() {
  prevTIme = 0
  window.cancelAnimationFrame(currentFrameId)
}

// 设置滚动速度
function settingSpeed(e: WheelEvent) {
  e.preventDefault()
  if (e.deltaY < 0) defaultSpeed += 1
  else defaultSpeed -= 1
  scrollSpeed.textContent = `${defaultSpeed}`
  GM_setValue('speed', defaultSpeed)
}

// 按下事件
function press(e: MouseEvent) {
  // 设置只有在速度显示区域才能拖动
  if ((e.target as HTMLElement).id === 'scroll-speed') {
    // 记录位置
    pressPosition.top = e.clientY - (e.currentTarget as HTMLDivElement).offsetTop
    pressPosition.left = e.clientX - (e.currentTarget as HTMLDivElement).offsetLeft
    // 修改样式显示
    scrollSpeed.style.cursor = 'move'
    // 开始监听移动事件
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', release)
  }
}

// 移动事件
function move(e: MouseEvent) {
  const top = e.clientY - pressPosition.top
  const left = e.clientX - pressPosition.left
  scrollContainer.style.right = `unset`
  scrollContainer.style.top = `${top}px`
  scrollContainer.style.left = `${left}px`
}

// 抬起事件
function release() {
  // 修改样式显示
  scrollSpeed.style.cursor = 's-resize'
  // 清除事件
  document.removeEventListener('mousemove', move)
  document.removeEventListener('mouseup', release)
}

// 添加自定义样式
GM_addStyle(`
    .scroll-container {
      position: fixed;
      top: 50%;
      right: 10px;
      z-index: 99999;
      text-align: center;
      transform: translateY(-50%);
      border-radius: 20px;
      overflow: hidden;
      background-color: rgba(204, 204, 204, 0.4);
      line-height: 40px;
      color: rgba(60, 60, 67, .92);
    }
    .scroll-up,
    .scroll-down {
      width: 40px;
      height: 40px;
      text-align: center;
    }
    .scroll-up::after,
    .scroll-down::after {
      content: '';
      display: inline-block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      box-sizing: border-box;
      border-width: 2px;
      border-style: solid;
    }
    .scroll-up::after {
      transform: rotate(-45deg);
      border-color: rgba(60, 60, 67, .92) rgba(60, 60, 67, .92) transparent transparent;
      margin-top: 14.3425px;
    }
    .scroll-down::after {
      transform: rotate(-45deg);
      border-color: transparent transparent rgba(60, 60, 67, .92) rgba(60, 60, 67, .92);
      margin-top: 8.685px;
    }
    .scroll-up:hover,
    .scroll-down:hover {
      background-color: rgba(204, 204, 204, 0.8);
    }

    .scroll-speed {
      font-size: 18px;
      user-select: none;
      cursor: s-resize;
    }
  `)