// ==UserScript==
// @name        自动滚动
// @author      Kaiter-Plus
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/AutoScroll
// @include     *://*
// @grant       none
// @version     0.1
// @license     BSD-3-Clause
// @noframes
// @grant       GM_addStyle
// @description 给网页添加两个个自动向上、向下滚动的按钮（本脚本还在编写阶段）
// ==/UserScript==
;(function () {
  'use strict'

  // 获取 head
  const head = document.head

  // 获取 body
  const body = document.body

  // 创建网页元素方法
  function createElement(text, tagName, attr) {
    const element = document.createElement(tagName)
    if (attr) {
      for (let key in attr) {
        element[key] = attr[key]
      }
    }
    element.innerHTML = text
    return element
  }

  // 创建一个滚动容器
  const scrollContainer = createElement('', 'div', {
    id: 'scroll-container',
    className: 'scroll-container'
  })

  body.appendChild(scrollContainer)

  // 创建自动向上的按钮
  const autoUp = createElement('', 'div', {
    className: 'auto-up',
    id: 'auto-up'
  })
  scrollContainer.appendChild(autoUp)

  // 创建自动向下的按钮
  const autoDown = createElement('', 'div', {
    className: 'auto-down',
    id: 'auto-down'
  })
  scrollContainer.appendChild(autoDown)

  // 添加自定义样式
  GM_addStyle(`
    .scroll-container {
      position: fixed;
      top: 50%;
      right: 10px;
      z-index: 99999;
      text-align: center;
      transform: translateY(-50%);
    }
    .auto-up, .auto-down {
      width: 40px;
      height: 40px;
      line-height: 40px;
      margin-bottom: 5px;
      border-radius: 50%;
      text-align: center;
      background-color: rgba(204, 204, 204, .4);
    }
    .auto-up::after, .auto-down::after {
      content: "";
      display: inline-block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      box-sizing: border-box;
      border-width: 2px;
      border-style: solid;
    }
    .auto-up::after{
      transform: rotate(-45deg);
      border-color: #fff #fff transparent transparent;
      margin-top: 14.3425px;
    }
    .auto-down::after {
      transform: rotate(-45deg);
      border-color: transparent transparent #fff #fff;
      margin-top: 8.685px;
    }
    .auto-up:hover, .auto-down:hover {
      background-color: rgba(204, 204, 204, .8);
    }
  `)

  // 向上滚动
  let autoUpTimer = null
  autoScroll(autoUp, autoUpTimer, -1)

  // 向下滚动
  let autoDownTimer = null
  autoScroll(autoDown, autoDownTimer, 1)

  // 添加鼠标覆盖移出事件监听
  function autoScroll(target, timer, scrollPixel) {
    target.onmouseover = () => {
      clearInterval(timer)
      timer = setInterval(() => {
        window.scrollBy(0, scrollPixel)
      }, 10)
    }
    target.onmouseout = () => {
      clearInterval(timer)
    }
  }
})()
