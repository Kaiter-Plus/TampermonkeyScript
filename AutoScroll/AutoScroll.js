// ==UserScript==
// @name        自动滚动
// @author      Kaiter-Plus
// @description 给网页添加自动向上、向下滚动的按钮，对于看文章，看小说，看漫画等场景下使用极为舒适
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/AutoScroll
// @include     *://*
// @grant       none
// @version     1.0
// @license     BSD-3-Clause
// @noframes
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_addElement
// ==/UserScript==
;(function () {
  'use strict'

  // 默认速度
  let defaultSpeed = 5
  // 定时器id
  let currentFrameId = 0
  // 记录上一次执行的时间
  let prevTIme = 0

  // 初始化速度
  const speed = GM_getValue('speed')
  speed ? (defaultSpeed = +speed) : GM_setValue('speed', defaultSpeed)

  // 创建一个滚动容器
  const scrollContainer = GM_addElement(document.body, 'div', {
    id: 'scroll-container',
    class: 'scroll-container'
  })

  // 创建自动向上的按钮
  const scrollUp = GM_addElement(scrollContainer, 'div', {
    class: 'scroll-up',
    id: 'scroll-up'
  })
  scrollUp.addEventListener('mouseover', () => {
    autoScroll(-1)
  })
  scrollUp.addEventListener('mouseout', stopScroll)

  // 创建速度显示
  const scrollSpeed = GM_addElement(scrollContainer, 'div', {
    class: 'scroll-speed',
    textContent: speed
  })
  scrollSpeed.addEventListener('wheel', settingSpeed)

  // 创建自动向下的按钮
  const scrollDown = GM_addElement(scrollContainer, 'div', {
    class: 'scroll-down',
    id: 'scroll-down'
  })
  scrollDown.addEventListener('mouseover', () => {
    autoScroll(1)
  })
  scrollDown.addEventListener('mouseout', stopScroll)

  // 自动滚动
  function autoScroll(direction) {
    scroll(direction)
  }

  // 滚动
  function scroll(direction) {
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
  function settingSpeed(e) {
    e.preventDefault()
    if (e.deltaY < 0) defaultSpeed += 1
    else defaultSpeed -= 1
    scrollSpeed.textContent = defaultSpeed
    GM_setValue('speed', defaultSpeed)
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
})()
