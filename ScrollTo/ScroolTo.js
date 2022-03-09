// ==UserScript==
// @name        双击 T 滚动到顶部
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/ScrollTo
// @include     *://*
// @grant       none
// @version     0.1
// @author      Kaiter-Plus
// @license     BSD-3-Clause
// @noframes
// @description 给网站添加双击 T 键返回顶部的功能
// @note        2022/3/9 给网站添加双击 T 键返回顶部的功能 (为什么是双击 T 键呢？因为代表 ToTop)
// ==/UserScript==

;(function () {
  'use strict'

  // 生成贝塞尔曲线
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d / 2
    if (t < 1) {
      return (c / 2) * t * t + b
    }
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  // 使用 requestAnimationFrame 进行平滑滚动
  var requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60)
      }
    )
  })()

  // 移动到固定数值(这么写是为了适配不同的浏览器的实现机制不同。是吧，某狐浏览器)
  function move(amount) {
    document.documentElement.scrollTop = amount
    document.body.parentNode.scrollTop = amount
    document.body.scrollTop = amount
  }

  // 获取当前已滚动的高度
  function position() {
    return document.documentElement.scrollTop || document.body.parentNode.scrollTop || document.body.scrollTop
  }

  // 滚动函数
  function scrollTo(to, duration, callback) {
    const start = position()
    const change = to - start
    const increment = 20
    let currentTime = 0
    duration = typeof duration === 'undefined' ? 500 : duration
    var animateScroll = function () {
      currentTime += increment
      var val = Math.easeInOutQuad(currentTime, start, change, duration)
      move(val)
      if (currentTime < duration) {
        requestAnimFrame(animateScroll)
      } else {
        if (callback && typeof callback === 'function') {
          callback()
        }
      }
    }
    animateScroll()
  }

  // 上次点击 T 的时间
  let prevTime = 0

  // 添加键盘按下事件
  document.addEventListener('keydown', e => {
    if (e.key.toLowerCase() === 't') {
      const time = +new Date()
      if (prevTime > 0 && time - prevTime <= 300) {
        scrollTo(0)
      } else {
        prevTime = time
      }
    }
  })
})()
