// ==UserScript==
// @name        抖音直播自动点赞
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/douyin=auto-like
// @author      Kaiter-Plus
// @description 网页版抖音直播添加自动点赞功能
// @version     0.12
// @license     BSD-3-Clause
// @match       *://live.douyin.com/*
// @icon        https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/public/favicon.ico
// @noframes
// @run-at      document-end
// @grant       unsafeWindow
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_notification
// @grant       GM_registerMenuCommand
// @grant       GM_unregisterMenuCommand
// ==/UserScript==

;(() => {
  // 多久点击一次
  const CLICK_DURATION = 150
  // 点击层的类名
  const CLICK_MODAL_CLASS = '.LO5TGkc0'
  // 点击事件层
  let clickModal = document.querySelector(CLICK_MODAL_CLASS)
  // 定时器
  let timer = null
  // 清除【手速太快】提示的定时器
  let removeTipTimer = null

  // 循环点击
  let prevTImestamp = 0 // 记录上一次执行的时间
  function autoClick(timestamp) {
    const duration = timestamp - prevTImestamp
    if (duration >= CLICK_DURATION) {
      if (clickModal) {
        clearLikeIcon()
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

  // 自动清理点赞之后留下的元素(抖音前端工程师长点心吧！无限添加元素，想卡死用户是吧！不会复用元素？)
  function clearLikeIcon() {
    if (clickModal.children.length > 30) {
      clickModal.textContent = ''
    }
  }

  // 移除【您手速太快了，请休息一下】提示
  let prevRemoveTipTImestamp = 0
  function removeTip(timestamp) {
    const duration = timestamp - prevRemoveTipTImestamp
    if (duration >= CLICK_DURATION) {
      const reg = /.*手速太快.*/
      const toastContainer = document.getElementById('toastContainer')
      if (toastContainer) {
        Array.from(toastContainer.children).forEach(element => {
          if (reg.test(element.textContent)) {
            element.style.display = 'none'
          }
        })
      }
      const toast = document.querySelector('[data-e2e="toast"]')
      if (toast && reg.test(toast.textContent)) {
        toast.style.display = 'none'
      }
    }
    prevRemoveTipTImestamp = timestamp
    removeTipTimer = requestAnimationFrame(removeTip)
  }

  // 菜单
  const menu = [
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
  const menuRegister = []

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
  function menuSwitch(item) {
    // 设置数据
    item.value = !item.value
    GM_setValue(item.key, item.value)
    // 系统通知
    if (item.showNotification) {
      GM_notification({
        text: `已${item.value ? item.tip.open : item.tip.close}[${item.name}] 功能`,
        title: '抖音自动点赞',
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
    if (GM_getValue('switch')) autoClick(0)
    else cancelAnimationFrame(timer)
  }

  function init() {
    clickModal = document.querySelector(CLICK_MODAL_CLASS)
    registerMenuCommand()
    removeTip()
    if (GM_getValue('switch')) autoClick(0)
  }

  init()
})()
