// ==UserScript==
// @name        自动滚动
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/AutoScroll
// @include     *://*
// @grant       none
// @version     0.1
// @author      Kaiter-Plus
// @noframes
// @description 给网页添加两个个自动向上、向下滚动的按钮（本脚本还在编写阶段）
// ==/UserScript==
;(function () {
  'use strict'

  // 获取 head
  const head = document.head

  // 获取 body
  const body = document.body

  // 创建网页元素方法
  function createElement(text, tagName, attr, parent) {
    const element = document.createElement(tagName)
    if (attr) {
      for (let key in attr) {
        element[key] = attr[key]
      }
    }
    element.innerHTML = text
    parent.appendChild(element)
  }

  // 创建一个滚动容器
  createElement(
    '',
    'div',
    {
      id: 'scroll-container',
      className: 'scroll-container',
    },
    body
  )

  // 创建自动向上的按钮
  createElement(
    '',
    'div',
    {
      className: 'auto-up',
      id: 'auto-up',
    },
    document.querySelector('#scroll-container')
  )

  // 创建自动向下的按钮
  createElement(
    '',
    'div',
    {
      className: 'auto-down',
      id: 'auto-down',
    },
    document.querySelector('#scroll-container')
  )

  // 添加自定义样式
  createElement(
    [
      '.scroll-container {',
      '  position: fixed;',
      '  top: 50%;',
      '  right: 10px;',
      '  z-index: 99999;',
      '  text-align: center;',
      '  transform: translateY(-50%);',
      '}',
      '.auto-up, .auto-down {',
      '  width: 40px;',
      '  height: 40px;',
      '  line-height: 40px;',
      '  margin-bottom: 5px;',
      '  border-radius: 50%;',
      '  text-align: center;',
      '  background-color: rgba(204, 204, 204, .4);',
      '}',
      '.auto-up::after, .auto-down::after {',
      '  content: "";',
      '  display: inline-block;',
      '  width: 16px;',
      '  height: 16px;',
      '  font-size: 16px;',
      '  box-sizing: border-box;',
      '  border-width: 2px;',
      '  border-style: solid;',
      '}',
      '.auto-up::after{',
      '  transform: rotate(-45deg);',
      '  border-color: #fff #fff transparent transparent;',
      '  margin-top: 14.3425px;',
      '}',
      '.auto-down::after {',
      '  transform: rotate(-45deg);',
      '  border-color: transparent transparent #fff #fff;',
      '  margin-top: 8.685px;',
      '}',
      '.auto-up:hover, .auto-down:hover {',
      '  background-color: rgba(204, 204, 204, .8);',
      '}',
    ].join('\n'),
    'style',
    '',
    head
  )

  // 向上滚动
  const autoUp = document.querySelector('#auto-up')
  let autoUpTimer = null
  autoUp.onmouseover = () => {
    clearInterval(autoUpTimer)
    autoUpTimer = setInterval(() => {
      window.scrollBy(0, -1)
    }, 10)
  }
  autoUp.onmouseout = () => {
    clearInterval(autoUpTimer)
  }

  // 向下滚动
  const autoDown = document.querySelector('#auto-down')
  let autoDownTimer = null
  autoDown.onmouseover = () => {
    clearInterval(autoDownTimer)
    autoDownTimer = setInterval(() => {
      window.scrollBy(0, 1)
    }, 10)
  }
  autoDown.onmouseout = () => {
    clearInterval(autoDownTimer)
  }
})()
