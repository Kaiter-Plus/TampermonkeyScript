// ==UserScript==
// @name        抖音直播自动点赞
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/douyin=auto-like
// @author      Kaiter-Plus
// @description 网页版抖音直播添加自动点赞功能
// @version     0.02
// @license     BSD-3-Clause
// @match       *://live.douyin.com/*
// @icon        https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/public/favicon.ico
// @noframes
// @run-at      document-end
// ==/UserScript==

;(() => {
  const CLICK_MODAL_CLASS = '.Zs4Pv2bD'
  // 点击事件层
  let clickModal = document.querySelector(CLICK_MODAL_CLASS)
  // 创建一个点击元素
  const clickElement = document.createElement('div')
  clickElement.style.position = 'absolute'
  // 点击元素是否已经添加，防止重复添加
  let isAppend = false

  // 循环点击
  let timer = setInterval(() => {
    if (clickModal) {
      clearLikeIcon()
      clickElement.style.left = `${Math.random() * clickModal.clientWidth}px`
      clickElement.style.top = `${Math.random() * clickModal.clientHeight}px`
      if (!isAppend) {
        clickModal.appendChild(clickElement)
        isAppend = true
      }
      clickElement.click()
    } else {
      clickModal = document.querySelector(CLICK_MODAL_CLASS)
    }
  }, 300)

  // 自动清理点赞之后留下的元素(抖音前端工程师长点心吧！无限添加元素，想卡死用户是吧！不会复用元素？)
  function clearLikeIcon() {
    if (clickModal.children.length > 30) {
      clickModal.textContent = ''
      isAppend = false
    }
  }
})()
