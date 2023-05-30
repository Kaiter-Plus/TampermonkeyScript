// ==UserScript==
// @name        抖音直播自动点赞
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/douyin=auto-like
// @author      Kaiter-Plus
// @description 网页版抖音直播添加自动点赞功能
// @version     0.03
// @license     BSD-3-Clause
// @match       *://live.douyin.com/*
// @icon        https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/public/favicon.ico
// @noframes
// @run-at      document-end
// ==/UserScript==

;(() => {
  // 多久点击一次
  const CLICK_DURATION = 150
  // 点击层的类名
  const CLICK_MODAL_CLASS = '.Zs4Pv2bD'
  // 点击事件层
  let clickModal = document.querySelector(CLICK_MODAL_CLASS)
  // 定时器
  let timer = null
  // 记录上一次执行的时间
  let prevTImestamp = 0

  // 循环点击
  function autoClick(timestamp) {
    const duration = timestamp - prevTImestamp
    if (duration >= CLICK_DURATION) {
      if (clickModal) {
        clearLikeIcon()
        // 获取元素的坐标
        const rect = clickModal.getBoundingClientRect()
        const x = rect.bottom - Math.random() * 200
        const y = rect.right - Math.random() * 200
        // 创建模拟点击事件
        const clickEvent = new MouseEvent('click', {
          view: window,
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

  autoClick(0)

  // 自动清理点赞之后留下的元素(抖音前端工程师长点心吧！无限添加元素，想卡死用户是吧！不会复用元素？)
  function clearLikeIcon() {
    if (clickModal.children.length > 30) {
      clickModal.textContent = ''
    }
  }
})()
