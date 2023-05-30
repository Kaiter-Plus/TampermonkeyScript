// ==UserScript==
// @name        抖音直播自动点赞
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/douyin=auto-like
// @author      Kaiter-Plus
// @description 网页版抖音直播添加自动点赞功能
// @version     0.01
// @license     BSD-3-Clause
// @match       *://live.douyin.com/*
// @icon        https://lf1-cdn-tos.bytegoofy.com/goofy/ies/douyin_web/public/favicon.ico
// @noframes
// @run-at      document-end
// ==/UserScript==

;(() => {
  // 点击事件层
  let clickModal = document.querySelector('.Zs4Pv2bD')
  // 创建一个点击元素
  const clickElement = document.createElement('div')
  clickElement.style.position = 'absolute'
  // 点击元素是否已经添加，防止重复添加
  let isAppend = false

  // 循环点击
  let timer = setInterval(() => {
    if (clickModal) {
      clickElement.style.left = `${Math.random() * clickModal.clientWidth}px`
      clickElement.style.top = `${Math.random() * clickModal.clientHeight}px`
      if (!isAppend) {
        clickModal.appendChild(clickElement)
        isAppend = true
      }
      clickElement.click()
    } else {
      clickModal = document.querySelector('.Zs4Pv2bD')
    }
  }, 300)
})()
