// 多久点击一次
const CLICK_DURATION: number = 300
// 点击层的类名
const CLICK_MODAL_CLASS: string = '.like-btn'
// 点击事件层
let clickModal = document.querySelector(CLICK_MODAL_CLASS)
// 定时器
let timer: number | null = null

// 循环点击
let prevTImestamp = 0 // 记录上一次执行的时间
function autoClick(timestamp: number) {
  const duration = timestamp - prevTImestamp
  if (duration >= CLICK_DURATION + Math.random() * 100 - 50) {
    if (clickModal) {
      // 获取元素的坐标
      const rect = clickModal.getBoundingClientRect()
      const x = rect.top + Math.random() * 50 + 50
      const y = rect.left + Math.random() * 50 + 50
      // 创建模拟点击事件
      const clickEvent = new MouseEvent('click', {
        view: unsafeWindow,
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
      })
      // 触发模拟点击事件
      clickModal.dispatchEvent(clickEvent)
    } else {
      clickModal = document.querySelector(CLICK_MODAL_CLASS)
    }
    prevTImestamp = timestamp
  }
  timer = requestAnimationFrame(autoClick)
}

interface Tip {
    open: string
    close: string
}

interface MenuItem {
    key: string
    name: string
    value: boolean
    showNotification: boolean
    tip: Tip
    click: () => void
}

// 菜单
const menu: MenuItem[] = [
  {
    key: 'switch',
    name: '自动点赞',
    value: true,
    showNotification: true,
    tip: {
      open: '✅',
      close: '❌'
    },
    click: switchFn
  }
]

// 保存已注册的菜单
const menuRegister: number[] = []

// 配置默认菜单
menu.forEach(v => {
  if (GM_getValue(v.key) === undefined || GM_getValue(v.key) === null) GM_setValue(v.key, v.value)
})

// 注册菜单
function registerMenuCommand() {
  if (menuRegister.length === menu.length) {
    menuRegister.forEach(v => {
      GM_unregisterMenuCommand(v)
    })
  }
  menu.forEach((v, i) => {
    v.value = GM_getValue(v.key)
    menuRegister[i] = GM_registerMenuCommand(`${v.value ? v.tip.open : v.tip.close} ${v.name}`, () => {
      menuSwitch(v)
    })
  })
}

// 切换菜单
function menuSwitch(item: MenuItem) {
  // 设置数据
  item.value = !item.value
  GM_setValue(item.key, item.value)
  // 系统通知
  if (item.showNotification) {
    GM_notification({
      text: `已${item.value ? item.tip.open : item.tip.close}[${item.name}] 功能`,
      title: ' Bilibili 自动点赞',
      timeout: 1000
    })
  }
  // 如果有点击事件，执行
  if (item.click) item.click()
  // 重新注册
  registerMenuCommand()
}

// 切换开关
function switchFn() {
  if (GM_getValue('switch')) timer = requestAnimationFrame(autoClick)
  else cancelAnimationFrame(timer!)
}

function init() {
  clickModal = document.querySelector(CLICK_MODAL_CLASS)
  registerMenuCommand()
  if (GM_getValue('switch')) timer = requestAnimationFrame(autoClick)
}

// 延迟 3 秒开始， 获取必要数据
setTimeout(() => {
  init()
}, 3000)