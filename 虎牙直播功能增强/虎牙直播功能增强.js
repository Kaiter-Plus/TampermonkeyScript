// ==UserScript==
// @name        虎牙直播功能增强
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/虎牙直播功能增强
// @author      Kaiter-Plus
// @description 给虎牙直播添加额外功能
// @version     0.5
// @match       *://*.huya.com/\w*
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
// ==/UserScript==
;(function () {
  'use strict'

  // 判断镜像状态
  let isReverse = false

  // 定时器
  const timer = {
    initTimer: null,
    playTimer: null,
    chestTimer: null
  }

  // 直播界面容器
  let container = null

  // 最高画质
  let hightestImageQuality = null

  // 所有宝箱
  let chests = null

  // 配置选项
  const config = {
    // 获取是否自动选择最高画质
    isSelectedHightestImageQuality: GM_getValue('isSelectedHightestImageQuality'),
    // 是否自动领取宝箱
    isGetChest: GM_getValue('isGetChest')
    // 获取是否自动网页全屏
    // isFullScreen: GM_getValue('isFullScreen')
  }

  // 创建功能图标
  function createTagIcon(option) {
    const tag = document.createElement(option.tagName)
    tag.id = option.id
    tag.className = option.className
    tag.title = option.title
    tag.innerHTML = option.innerHTML
    tag.style = option.style
    tag.addEventListener('click', () => {
      option.eventListener()
    })
    return tag
  }

  // 初始化
  function init() {
    timer.initTimer = setInterval(() => {
      if (!container || chests.length <= 0) {
        container = document.getElementById('player-ctrl-wrap')
        chests = document.querySelectorAll('#player-box .player-box-list li')
      } else {
        hightestImageQuality = document.querySelector('.player-videotype-list').children[0]
        initStyle()
        initTools()
        clearInterval(timer.initTimer)
      }
    }, 1000)
  }

  // 初始化图标样式
  function initStyle() {
    GM_addStyle(`
        .video-tools-icon {
          position: absolute;
          top: 11px;
        }
        .video-tools-icon .icon {
          fill: currentColor;
          color: #b2b4b4;
        }
        .video-tools-icon:hover .icon {
          fill: currentColor;
          color: #fd9400;
        }
      `)
  }

  // 初始化工具
  function initTools() {
    insertIcon()
    config.isSelectedHightestImageQuality ? selectedHightestImageQuality() : null
    config.isGetChest ? getChest() : null
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

    container.insertBefore(sync, container.childNodes[3])
    container.insertBefore(rev, container.childNodes[4])
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
    timer.playTimer = setInterval(() => {
      if (document.querySelector('.player-play-btn')) {
        document.querySelector('.player-play-btn').click()
        document.querySelector('#player-tip-pause').remove()
        clearInterval(timer.playTimer)
      }
    }, 500)
  }

  // 自动领取宝箱
  function getChest() {
    timer.chestTimer = setInterval(() => {
      // 全部领取结束定时
      const lastIndex = chests.length - 1
      const lastFlag = chests[lastIndex].querySelector('.player-box-stat1')
      const lastGet = chests[lastIndex].querySelector('.player-box-stat3')
      if (lastFlag.style.visibility === 'hidden' && lastGet.style.visibility === 'hidden') {
        clearInterval(timer.chestTimer)
        return
      } else {
        // 遍历领取
        for (const index in chests) {
          let get = chests[index].querySelector('.player-box-stat3')
          if (get.style.visibility === 'visible') {
            get.click()
            let chestsContainer = document.querySelector('.player-chest-btn #player-box')
            chestsContainer.style.display = 'none'
          }
        }
      }
    }, 5000)
  }

  // 功能切换
  function switchSetting(settingConfig) {
    config[settingConfig.key] = !config[settingConfig.key]
    config[settingConfig.key] ? GM_notification(settingConfig.openString) : GM_notification(settingConfig.closeString)
    GM_setValue(settingConfig.key, config[settingConfig.key])
    if (!config[settingConfig.key]) {
      clearInterval(settingConfig.timer)
    } else {
      settingConfig.execute()
    }
  }

  function switchSelectedHIQ() {
    switchSetting({
      key: 'isSelectedHightestImageQuality',
      openString: '已开启自动选择最高画质',
      closeString: '已关闭自动选择最高画质',
      timer: timer.playTimer,
      execute: selectedHightestImageQuality
    })
  }

  function switchGetChest() {
    switchSetting({
      key: 'isGetChest',
      openString: '已开启自动领取百宝箱奖励',
      closeString: '已关闭自动领取百宝箱奖励',
      timer: timer.chestTimer,
      execute: getChest
    })
  }

  // 添加菜单配置项
  GM_registerMenuCommand('自动选择最高画质开关', switchSelectedHIQ)
  GM_registerMenuCommand('自动领取百宝箱奖励开关', switchGetChest)

  // 初始化
  init()
})()
