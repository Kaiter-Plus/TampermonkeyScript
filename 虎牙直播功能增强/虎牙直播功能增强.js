// ==UserScript==
// @name        虎牙直播功能增强
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/虎牙直播功能增强
// @author      Kaiter-Plus
// @description 给虎牙直播添加额外功能（同步时间、画面镜像、自动选择最高画、自动选领取百宝箱奖励、自动网页全屏）
// @version     1.4
// @license     BSD-3-Clause
// @match       *://*.huya.com/*
// @icon        https://www.huya.com/favicon.ico
// @noframes
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_notification
// @grant       GM_registerMenuCommand
// @run-at      document-end
// @note        2020/12/10 添加 “同步时间” 功能
// @note        2020/12/28 添加 “画面镜像” 功能
// @note        2021/01/29 代码重构
// @note        2021/03/01 添加 “自动选择最高画质” 功能，并同时提供配置开关，默认关闭
// @note        2021/03/02 添加 “自动选领取百宝箱奖励” 功能，并同时提供配置开关，默认关闭
// @note        2021/03/03 修改 更改配置时为不用重载界面
// @note        2021/03/04 修复了一个小 bug
// @note        2021/03/08 修复了最后两个宝箱不会领取的 bug
// @note        2021/03/10 紧急修复了宝箱不会领取的 bug
// @note        2021/03/12 添加了脚本的配置选项
// @note        2021/03/13 优化自动领取百宝箱逻辑
// @note        2021/03/22 添加 “自动网页全屏” 功能，并同时提供配置开关，默认关闭
// @note        2021/05/25 虎牙网站更新，修复脚本失效
// @note        2021/06/12 虎牙网站更新，再一次修复脚本失效，同时移除虎牙自带的节日广告
// ==/UserScript==
;(function () {
  'use strict'

  // 判断镜像状态
  let isReverse = false

  // 定时器
  const timer = {
    initTimer: null,
    hightestTimer: null,
    chestTimer: null
  }

  // 控制栏容器
  let headerContainer = null

  // 直播界面容器
  let controlContainer = null

  // 最高画质
  let hightestImageQuality = null

  // 所有宝箱
  let chests = null

  // 配置选项
  const config = [
    // 自动选择最高画质
    GM_getValue('isSelectedHightestImageQuality'),
    // 自动领取百宝箱奖励
    GM_getValue('isGetChest'),
    // 获取是否自动网页全屏
    GM_getValue('isFullScreen')
  ]

  // 初始化
  function init() {
    timer.initTimer = setInterval(() => {
      if (!controlContainer || chests.length <= 0) {
        headerContainer = document.querySelector('.duya-header-right div')
        controlContainer = document.getElementById('player-ctrl-wrap')
        // 使用数组保存
        chests = Array.from(document.querySelectorAll('#player-box .player-box-list li'))
      } else {
        clearInterval(timer.initTimer)
        hightestImageQuality = document.querySelector('.player-videotype-list').children[0]
        initStyle()
        initTools()
        removeAdvertisement()
      }
    }, 1000)
  }

  // 移除虎牙自带广告
  function removeAdvertisement() {
    let advertisement = document.querySelector('.duya-header-ad')
    const timer = setInterval(() => {
      if (advertisement) {
        advertisement.parentNode.removeChild(advertisement)
        clearInterval(timer)
      } else {
        advertisement = document.querySelector('.duya-header-ad')
      }
    })
  }

  // 初始化图标样式
  function initStyle() {
    GM_addStyle(`
        #J_global_user_tips{
          display: none;
        }
        .video-tools-icon {
          position: absolute;
          top: 11px;
        }
        .video-tools-icon .icon {
          fill: currentColor;
          cursor: pointer;
          color: #b2b4b4;
        }
        .video-tools-icon:hover .icon {
          fill: currentColor;
          color: #ff9600;
        }
        .hy-header-style-normal .config-position {
          top: 45px;
          left: -69px;
        }
        .hy-header-style-normal .hy-nav-title svg {
          position: relative;
          top: -6px;
          left: 24px;
          fill: currentColor;
          color: #555;
        }
        .hy-header-style-normal .hy-nav-title .title {
          position: relative;
          top: 7px;
          left: -19px;
          color: #555;
          font-size: 12px;
        }
        .hy-header-style-normal .hy-nav-title:hover svg,
        .hy-header-style-normal .hy-nav-title:hover .title {
          fill: currentColor;
          color: #ff9600;
        }
        .reset-style {
          height: 94px!important;
          width: 220px!important;
        }
        .config-arrow {
          position: absolute;
          top: 16px;
          right: 6px;
          width: 9px;
          height: 5px;
          overflow: hidden;
          transition: transform .5s;
          background: url(https://a.msstatic.com/huya/main3/assets/img/header/sprite/arrow_93ea4.png)
        }
        .hy-header-style-normal .hy-nav-title:hover .config-arrow {
          transform: rotate(180deg);
          background: url(https://a.msstatic.com/huya/main3/assets/img/header/sprite/arrow_on_e7b62.png)
        }
        .config-item {
          padding: 5px 15px;
          display: flex;
          justify-content: space-around;
        }
        .hidden-controls {
          bottom: -44px!important;
        }
        .show-controls {
          bottom: 0px!important;
        }
        @media handheld, only screen and (max-width: 1440px) {
          .duya-header-right>div>div:nth-child(1)>div:nth-child(4) {
            display: none;
          }
          .duya-header-right>div>div:nth-child(1)>div:nth-child(5) {
            display: none;
          }
        }
        @media handheld, only screen and (max-width: 1721px) {
          .duya-header-right>div>div:nth-child(1)>div:nth-child(1) {
            display: none;
          }
        }
        /* 自定义开关 */
        .switchButton {
          position: relative;
          width: 46px;
          z-index: 9999;
          user-select: none;
        }
        .switchButton-checkbox {
          display: none;
        }
        .switchButton-label {
          display: block;
          cursor: pointer;
          border: 1px solid #999999;
          border-radius: 20px;
          overflow: hidden;
        }
        .switchButton-inner {
          display: block;
          width: 200%;
          height: 18px;
          margin-left: -100%;
          overflow: hidden;
          transition: margin 0.3s ease-in 0s;
        }
        .switchButton-switch {
          position: absolute;
          display: block;
          width: 14px;
          height: 14px;
          margin: 2px;
          background: #bbbbbb;
          top: 0;
          bottom: 0;
          right: 25px;
          border: 1px solid #584c3d;
          border-radius: 14px;
          transition: all 0.3s ease-in 0s;
        }
        .switchButton-checkbox:checked+.switchButton-label .switchButton-inner {
          margin-left: 0;
        }
        .switchButton-checkbox:checked+.switchButton-label .switchButton-switch {
          right: 0px;
          background: #ff9600;
        }
      `)
  }

  // 初始化工具
  function initTools() {
    insertIcon()
    if (config[0]) selectedHightestImageQuality()
    if (config[1]) getChest()
    if (config[2]) fullScreen()
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

  // 创建配置选项
  function createConfigItem(configItems) {
    let str = ''
    for (const index in configItems) {
      str = str.concat(`
      <li class="config-item">
        <span style="flex: 1; font-size: 14px;">${configItems[index]}</span>
        <div class="switchButton">
          <input type="checkbox" class="switchButton-checkbox" id="ON_OFF${index}" ${config[index] ? 'checked' : ''} />
          <label class="switchButton-label" for="ON_OFF${index}">
            <span class="switchButton-inner"></span>
            <span class="switchButton-switch"></span>
          </label>
        </div>
      </li>
      `)
    }
    return str
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
    <svg t="1595680402158" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7532" width="22" height="22">
     <path d="M938.1888 534.016h-80.7936c0.4096-7.3728 0.6144-14.6432 0.6144-22.016 0-218.624-176.8448-400.7936-389.12-400.7936C257.024 111.2064 80.6912 293.1712 80.6912 512c0 218.7264 176.4352 400.7936 388.1984 400.7936 74.752 0 149.0944-22.016 208.1792-60.0064l42.7008 68.608c-75.0592 48.9472-161.9968 74.8544-250.7776 74.752C209.8176 996.1472 0 779.264 0 512S209.8176 27.8528 468.8896 27.8528C728.3712 27.8528 938.7008 244.736 938.7008 512c0 7.3728-0.2048 14.6432-0.512 22.016z m-261.12 318.7712z m-26.4192-158.1056L426.7008 556.032V291.9424h64v226.5088L689.5616 635.904l-38.912 58.7776z m245.3504-6.656L768 512h256L896 688.0256z" p-id="7533"></path>
    </svg>
    `,
      style: 'left: 96px;',
      eventListener: setVideoSync
    })

    // 镜像图标
    const rev = createTagIcon({
      tagName: 'div',
      id: 'ex-videoReverse',
      className: 'video-tools-icon',
      title: '镜像画面',
      innerHTML: `
      <svg t="1608364922280" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="977" width="22" height="22" xmlns:xlink="http://www.w3.org/1999/xlink">
        <path d="M99.4 909.8L430.8 792V219.8L99.4 102v807.8z m33.1-740.5l265.1 84.1v504.9l-265.1 84.2V169.3z m37.3 639.5h16.6V203h-16.6v605.8z m335.6-629.4H522v-61h-16.6v61z m0 80.1H522v-61.1h-16.6v61.1z m0 80.4H522v-61h-16.6v61z m0 80.1H522v-61h-16.6v61z m0 84H522v-61h-16.6v61z m0 80.1H522V523h-16.6v61.1z m0 80.4H522v-61.1h-16.6v61.1z m0 80.1H522v-61.1h-16.6v61.1z m0 78.3H522v-61.1h-16.6v61.1z m0 80.3H522v-61.1h-16.6v61.1zM857.5 203h-16.6v605.8h16.6V203z m-261 16.8V792l331.4 117.8V102L596.5 219.8z m298.3 622.7l-265.1-84.1v-505l265.1-84.2v673.3z" p-id="978"></path>
      </svg>
      `,
      style: 'left: 134px;',
      eventListener: setVideoRev
    })

    // 插入配置选项
    const settings = createTagIcon({
      tagName: 'div',
      id: '',
      className: 'hy-nav-item',
      title: '',
      innerHTML: `
      <div class="hy-nav-expand">
        <a class="hy-nav-title clickstat" href="javascript:void(0)">
          <i class="hy-nav-icon">
            <svg t="1614912323565" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3409" width="28" height="28"><path d="M384 891.306667a95.36 95.36 0 0 1-42.666667-9.813334A93.44 93.44 0 0 1 287.573333 789.333333l2.986667-40.32a52.906667 52.906667 0 0 0-44.373333-55.68l-39.893334-5.973333a94.933333 94.933333 0 0 1-39.253333-172.373333l33.28-22.826667a52.266667 52.266667 0 0 0 15.786667-69.12l-20.053334-35.2a94.933333 94.933333 0 0 1 110.08-138.026667l38.613334 11.733334a52.48 52.48 0 0 0 64-30.72l14.933333-37.546667a94.933333 94.933333 0 0 1 176.64 0l14.933333 37.546667a52.266667 52.266667 0 0 0 64 30.72l38.613334-11.733334a94.933333 94.933333 0 0 1 110.08 138.026667l-20.053334 35.2a52.266667 52.266667 0 0 0 15.786667 69.12l33.28 22.826667a94.933333 94.933333 0 0 1-39.253333 172.373333l-39.893334 5.973333a52.906667 52.906667 0 0 0-44.373333 55.68l2.986667 40.32a94.933333 94.933333 0 0 1-159.146667 76.586667l-29.866667-27.52a52.48 52.48 0 0 0-70.826666 0l-29.866667 27.52A93.44 93.44 0 0 1 384 891.306667zM277.333333 288a52.48 52.48 0 0 0-44.8 78.506667l20.266667 34.986666a95.573333 95.573333 0 0 1-28.8 125.653334L192 549.973333a52.266667 52.266667 0 0 0 21.333333 94.933334l40.106667 6.186666a95.146667 95.146667 0 0 1 80.213333 100.693334l-2.773333 40.32a52.266667 52.266667 0 0 0 87.68 42.666666l29.44-27.733333a95.146667 95.146667 0 0 1 128 0l29.653333 27.306667a52.266667 52.266667 0 0 0 87.68-42.666667l-2.773333-40.32a95.146667 95.146667 0 0 1 80.213333-100.693333l39.893334-5.76a52.266667 52.266667 0 0 0 21.333333-94.933334l-33.28-22.826666a95.573333 95.573333 0 0 1-28.8-125.653334l20.266667-34.986666a52.48 52.48 0 0 0-60.8-76.16l-38.613334 11.946666A95.36 95.36 0 0 1 576 246.186667l-14.933333-37.546667a52.266667 52.266667 0 0 0-97.28 0L448 246.186667a95.36 95.36 0 0 1-116.053333 56.106666l-38.613334-11.946666a53.76 53.76 0 0 0-16-2.346667z" p-id="3410"></path><path d="M512 646.4a134.4 134.4 0 1 1 134.4-134.4 134.613333 134.613333 0 0 1-134.4 134.4z m0-226.133333a91.733333 91.733333 0 1 0 91.733333 91.733333 91.946667 91.946667 0 0 0-91.733333-91.733333z" p-id="3411"></path></svg>
          </i>
          <span class="title">脚本设置</span>
          <i class="config-arrow"></i>
        </a>
        <div class="nav-expand-list nav-expand-follow config-position" style="width: 220px;">
            <i class="arrow"></i>
            <div id="J_hyHdFollowBox">
              <div class="subscribe-hd">
                <div class="subscribe-tit" style="padding: 12px 0 7px 15px;color: #666;font-size: 12px;">脚本配置选项</div>
              </div>
              <hr style="margin: 0 15px;" />
              <div class="subscribe-bd reset-style">
                <ul id="config-container" class="subscribe-list reset-style" style="overflow: hidden; padding: 0px;">
                  <div class="jspContainer reset-style" style="width: 220px; height: 150px;">
                    <div class="jspPane" style="top: 0px; left: 0px; width: 220px;">
                      ${createConfigItem(['自动选择最高画质', '自动领取百宝箱奖励', '自动网页全屏'])}
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      `,
      style: '',
      eventListener: configSettings
    })

    headerContainer.appendChild(settings)
    // 创建用于添加自定义功能图标的 fragment，避免多次回流（重排）
    const iconFragment = document.createDocumentFragment()
    iconFragment.appendChild(sync)
    iconFragment.appendChild(rev)
    controlContainer.insertBefore(iconFragment, controlContainer.childNodes[3])
  }

  // 同步时间功能
  function setVideoSync() {
    let videoNode = document.getElementById('hy-video')
    const buffered = videoNode.buffered
    if (buffered.length == 0) {
      // 暂停中
      return
    }
    videoNode.currentTime = buffered.end(0)
  }

  // 镜像画面功能
  function setVideoRev() {
    let videoNode = document.getElementById('hy-video')
    videoNode.style.transformOrigin = 'center'
    if (isReverse) {
      videoNode.style.transform = 'rotateY(0deg)'
      isReverse = false
    } else {
      videoNode.style.transform = 'rotateY(180deg)'
      isReverse = true
    }
  }

  // 选择最高画质功能
  function selectedHightestImageQuality() {
    if (hightestImageQuality.className === 'on') return
    hightestImageQuality.click()
    timer.hightestTimer = setInterval(() => {
      if (document.querySelector('.player-play-btn')) {
        document.querySelector('.player-play-btn')[0].click()
        document.querySelector('#player-tip-pause').remove()
        clearInterval(timer.hightestTimer)
      }
    }, 500)
  }

  // 自动领取宝箱
  function getChest() {
    timer.chestTimer = setInterval(() => {
      // 当最后一个还不是 undefined 时，说明还没有领取完，继续
      if (chests[chests.length - 1]) {
        // 遍历领取
        for (const item of chests) {
          // 如果是 undefined 则直接跳过
          if (!item) continue
          // 是否已经领取
          const num = item.querySelector('.player-box-stat4').style.visibility
          // 如果已经领取，把值设置为 undefined
          if (num === 'visible') {
            chests.splice(chests.indexOf(item), 1, (0)[0])
            continue
          }
          // 如果可以领取则领取，领取后把值设置为 undefined
          const get = item.querySelector('.player-box-stat3').style.visibility
          if (get === 'visible') {
            item.querySelector('.player-box-stat3').click()
            chests.splice(chests.indexOf(item), 1, (0)[0])
            document.querySelector('.player-chest-btn #player-box').style.display = 'none'
            break
          }
        }
      } else {
        // 领取完，清空数组，结束定时器
        chests = null
        clearInterval(timer.chestTimer)
      }
    }, 10000)
  }

  // 网页全屏功能
  function fullScreen() {
    // 获取 剧场模式 按钮并点击
    controlContainer.querySelector('#player-fullpage-btn').click()
    // 获取 右侧聊天框 并点击
    const danmuChat = document.querySelector('#player-fullpage-right-btn')
    if (Array.from(danmuChat.classList).indexOf('player-fullpage-right-open') === -1) {
      danmuChat.click()
    }
    // 隐藏 礼物栏
    document.querySelector('#player-gift-wrap').style.display = 'none'
    // 播放器高度设为 100%
    document.querySelector('#player-wrap').style.height = '100%'
    // 显示弹幕输入框
    controlContainer.querySelector('#player-full-input').style.display = 'block'
    // 隐藏 控制栏
    controlContainer.classList.add('hidden-controls')
    // 添加鼠标事件
    addEvent()
  }

  // 网页全屏后监听鼠标覆盖 / 移开事件
  function addEvent() {
    const mouseWrap = document.querySelector('#player-mouse-event-wrap')
    const danmuInput = controlContainer.querySelector('#player-full-input-txt')
    const fullpageBtn = controlContainer.querySelector('#player-fullpage-btn')
    mouseWrap.addEventListener('mousemove', throttle(showControls, 300))
    mouseWrap.addEventListener('mousemove', debounce(hiddenControls, 1200)) // 1.2s 后隐藏控制栏
    controlContainer.addEventListener('mouseover', showControls, true)
    // 回车显示并聚焦输入框
    document.addEventListener('keydown', e => {
      if (e.key.toLowerCase() === 'enter') {
        showControls()
        danmuInput.focus()
      }
    })
    // 回车发送弹幕
    danmuInput.addEventListener('keydown', e => {
      e.stopPropagation()
      if (e.key.toLowerCase() === 'enter') {
        controlContainer.querySelector('#player-full-input-btn').click()
      }
    })
    // 退出剧场模式是同时设置自动网页全屏为 false
    fullpageBtn.addEventListener('click', () => {
      headerContainer.querySelector('#ON_OFF2').click()
      location.reload()
    })
  }

  // 节流函数
  function throttle(fn, delay) {
    let valid = true
    return function () {
      if (!valid) {
        return false
      }
      valid = false
      setTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
  }

  // 防抖函数
  function debounce(fn, delay) {
    let timer = null
    return function () {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(fn, delay)
    }
  }

  // 显示 控制栏
  function showControls() {
    controlContainer.classList.add('show-controls')
    controlContainer.classList.remove('hidden-controls')
  }

  // 隐藏 控制栏
  function hiddenControls() {
    controlContainer.classList.remove('show-controls')
    controlContainer.classList.add('hidden-controls')
  }

  // 配置选项监听事件
  function configSettings(e) {
    const target = e.target
    if (target.tagName.toLowerCase() === 'input') {
      // 选择最高画质
      if (target.id === 'ON_OFF0') {
        switchFunction('isSelectedHightestImageQuality', target, selectedHightestImageQuality, timer.hightestTimer)
      }
      // 领取百宝箱奖励
      if (target.id === 'ON_OFF1') {
        switchFunction('isGetChest', target, getChest, timer.chestTimer)
      }
      // 网页全屏
      if (target.id === 'ON_OFF2') {
        switchFunction('isFullScreen', target, fullScreen, null)
      }
      e.stopPropagation()
    }
  }

  // 配置选项功能
  function switchFunction(key, target, fn, timer) {
    GM_setValue(key, target.checked)
    if (target.checked) {
      fn()
    } else {
      clearInterval(timer)
    }
  }

  // 初始化
  init()
})()
