// ==UserScript==
// @name        bilibili直播功能增强
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/bilibili直播功能增强
// @author      Kaiter-Plus
// @description 给 Bilibili 直播添加额外功能
// @version     0.1
// @license     BSD-3-Clause
// @match       *://live.bilibili.com/*
// @icon        https://www.bilibili.com/favicon.ico
// @noframes
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_notification
// @grant       GM_registerMenuCommand
// @run-at      document-end
// @note        2020/12/10 添加 “同步时间” 功能
// ==/UserScript==
;(function () {
  'use strict'

  // 直播界面容器
  let container = null

  // 定时器
  let timer = null

  // 初始化
  function init() {
    timer = setInterval(() => {
      if (!container) {
        container = document.querySelector('.bilibili-live-player-video-controller')
      } else {
        clearInterval(timer)
        initStyle()
        initTools()
      }
    }, 1000)
  }

  // 初始化图标样式
  function initStyle() {
    GM_addStyle(`
        .video-tools-icon {
          position: absolute;
          top: 25px;
          left: 176px;
        }
        .video-tools-icon .icon {
          fill: currentColor;
          color: #fff;
          cursor: pointer;
        }
      `)
  }

  // 初始化工具
  function initTools() {
    insertIcon()
  }

  // 创建功能图标
  function createTagIcon(option) {
    const tag = document.createElement(option.tagName)
    tag.id = option.id
    tag.className = option.className
    tag.title = option.title
    tag.innerHTML = option.innerHTML
    tag.style = option.style
    tag.addEventListener('click', option.eventListener)
    return tag
  }

  // 插入图标
  function insertIcon() {
    // 同步时间图标
    const sync = createTagIcon({
      tagName: 'div',
      id: 'ex-videosync',
      className: 'video-tools-icon',
      title: '同步时间',
      innerHTML: `
      <svg t="1615991735395" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6428" width="18" height="18">
        <path d="M847.971181 144.925669a490.095459 490.095459 0 0 0-695.848515 0A495.343282 495.343282 0 0 0 69.053469 256.089917a38.654695 38.654695 0 0 0-3.199892 29.055019 37.566732 37.566732 0 0 0 69.245663 7.679741 420.209818 420.209818 0 0 1 70.397624-94.076825 414.833999 414.833999 0 0 1 589.100118 0 419.633837 419.633837 0 0 1 121.851888 296.757985 419.633837 419.633837 0 0 1-121.851888 296.757984 414.897997 414.897997 0 0 1-589.100118 0c-21.759266-21.887261-41.022615-46.078445-57.598056-72.317559a37.758726 37.758726 0 0 0-11.647607-11.711605l60.093972-51.454263-164.474449-31.166948v172.154189l49.534329-42.494565a36.222777 36.222777 0 0 0 2.815904 5.375818c19.455343 30.910957 42.238574 59.517991 67.837711 85.373119a490.095459 490.095459 0 0 0 695.912513 0 495.727269 495.727269 0 0 0 143.867144-350.51617 495.663271 495.663271 0 0 0-143.867144-350.580168m-49.598326 195.83339a37.758726 37.758726 0 0 1-14.463512 22.52724l-266.870993 197.945319a37.566732 37.566732 0 0 1-30.270978 6.591778l-257.463311-55.870114a36.798758 36.798758 0 0 1-23.42321-16.639439 39.038682 39.038682 0 0 1-4.991831-28.927024 37.758726 37.758726 0 0 1 44.286505-28.799028l240.823872 52.286236 253.111458-187.833661a37.502734 37.502734 0 0 1 52.798218 8.063728 38.398704 38.398704 0 0 1 6.463782 30.590968" p-id="6429"></path>
      </svg>
    `,
      style: '',
      eventListener: setVideoSync
    })

    // 创建用于添加自定义功能图标的 fragment，避免多次回流（重排）
    const iconFragment = document.createDocumentFragment()
    iconFragment.appendChild(sync)
    container.appendChild(iconFragment)
  }

  // 同步时间功能
  function setVideoSync() {
    let videoNode = document.querySelector('video.bilibili-live-player-video-stream')
    const buffered = videoNode.buffered
    if (buffered.length == 0) {
      // 暂停中
      return
    }
    videoNode.currentTime = buffered.end(0)
  }

  // 初始化
  init()
})()
