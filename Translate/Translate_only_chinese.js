// ==UserScript==
// @name         网页翻译——翻译为中文
// @author       Kaiter-Plus
// @namespace    https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/Translate/Translate_only_chinese.js
// @description  给每个非中文的网页右下角（可以调整到左下角）添加一个google翻译图标，该版本为中文翻译版本，只把外语翻译为中文
// @version      0.22
// @license      BSD-3-Clause
// @require      https://greasyfork.org/scripts/441796-google-translate-supported-languages/code/Google%20Translate%20Supported%20Languages.js?version=1030327
// @include      *://*
// @exclude      /^(http|https).*[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/
// @exclude      /.*duyaoss\.com/
// @exclude      /.*lanzous\.com/
// @exclude      /.*w3school.*cn/
// @exclude      /.*iqiyi\.com/
// @exclude      /.*baidu.*/
// @exclude      /.*cnblogs\.com/
// @exclude      /.*csdn\.net/
// @exclude      /.*zhku\.edu\.cn/
// @exclude      /.*zhihuishu\.com/
// @exclude      /.*aliyuncs\.com/
// @exclude      /.*chaoxing\.com/
// @exclude      /.*youku\.com/
// @exclude      /.*examcoo\.com/
// @exclude      /.*mooc\.com/
// @exclude      /.*bilibili\.com/
// @exclude      /.*qq\.com/
// @exclude      /.*yy\.com/
// @exclude      /.*huya\.com/
// @exclude      /localhost/
// @exclude      /.*acfun\.cn/
// @exclude      /.*eleme\.cn/
// @exclude      /.*douyin\.com/
// @icon         data:image/png;base64,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
// @noframes
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_notification
// @grant        GM_registerMenuCommand
// @grant        GM_unregisterMenuCommand
// @note         2021/04/13 新建副本，只把其它语言翻译为中文
// @note         2021/06/12 适配了移动端
// @note         2021/07/14 排除抖音，防止可能出现的 bug
// @note         2021/09/19 优化开启关闭自动检测中文逻辑
// @note         2021/12/12 应用户反馈，去除显示“提供更好的翻译建议”弹框
// @note         2021/12/14 直接使用 https 获取谷歌翻译接口（防止有可能火狐浏览器无法用于翻译本地文件的bug）@古海沉舟
// @note         2021/12/21 优化菜单切换逻辑，优化交互体验
// @note         2021/12/28 优化判断网页是否是中文逻辑
// @note         2022/01/08 修复上一个版本更新后大多数网站不能使用的 Bug, 解决一些网站开启脚本之后不能滚动
// @note         2022/01/10 修复访问站内 http 链接自动跳转 https 的问题
// @note         2022/01/18 增加排除网页元素
// @note         2022/03/09 增加排除网页元素
// @note         2022/03/19 增加配置选项【显示翻译建议】，默认关闭，打开之后通过悬浮文字可以看到原文
// @note         2022/03/20 修复默认不是隐藏【更好的翻译选项】的 bug
// @note         2022/03/20 众望所归，终于可以不用开加速器就可以直接翻译了，速度飞快
// @note         2022/03/20 修复开启显示【更好的翻译建议】无法自动消失的 bug
// @note         2022/03/23 添加【翻译】快捷键：Ctrl + Alt + T, 【还原】快捷键：Ctrl + Alt + R
// @note         2022/03/27 修改【翻译】快捷键：Alt + T, 【还原】快捷键：Alt + R
// @note         2022/03/28 修改【翻译】快捷键：Ctrl + Shift + Alt + T, 【还原】快捷键：Ctrl + Shift + Alt + R
// @note         2022/04/06 添加自定义快捷键选项
// ==/UserScript==

;(function () {
  'use strict'

  // 所有支持的语言
  const supportedLanguages = window.kSupportedLanguages

  // 获取可以翻译的所有语言，防止请求被墙导致脚本不能使用
  const languagesTimer = setInterval(() => {
    const sandbox = document.querySelector('[sandbox=allow-scripts]')
    if (sandbox) {
      sandbox.srcdoc = `<!DOCTYPE html><body><script>(function(){var d="function"==typeof Object.create?Object.create:function(a){var b=function(){};b.prototype=a;return new b},f;if("function"==typeof Object.setPrototypeOf)f=Object.setPrototypeOf;else{var g;a:{var k={a:!0},l={};try{l.__proto__=k;g=l.a;break a}catch(a){}g=!1}f=g?function(a,b){a.__proto__=b;if(a.__proto__!==b)throw new TypeError(a+" is not extensible");return a}:null}var m=f,n=this||self,p=function(a){return a};var q={};var r;var t=function(a,b){if(b!==q)throw Error("Bad secret");this.g=a},u=function(){};t.prototype=d(u.prototype);t.prototype.constructor=t;if(m)m(t,u);else for(var v in u)if("prototype"!=v)if(Object.defineProperties){var w=Object.getOwnPropertyDescriptor(u,v);w&&Object.defineProperty(t,v,w)}else t[v]=u[v];t.prototype.toString=function(){return this.g.toString()};function x(a){if(void 0===r){var b=null;var c=n.trustedTypes;if(c&&c.createPolicy)try{b=c.createPolicy("goog#html",{createHTML:p,createScript:p,createScriptURL:p})}catch(e){n.console&&n.console.error(e.message)}r=b}b=r;b=null==b?void 0:b.createScriptURL(a);return new t(null!=b?b:a,q)};if(!function(){if(self.origin)return"null"===self.origin;if(""!==location.host)return!1;try{return window.parent.escape(""),!1}catch(a){return!0}}())throw Error("sandboxing error");window.addEventListener("message",function(a){var b=a.ports[0];a=a.data;var c=a.callbackName.split("."),e=window;"window"===c[0]&&c.unshift();for(var h=0;h<c.length-1;h++)e[c[h]]={},e=e[c[h]];e[c[c.length-1]]=function(y){b.postMessage(JSON.stringify(y))};c=document.createElement("script");a=x(a.url);if(a instanceof t)a=a.g;else throw Error("Unexpected type when unwrapping TrustedResourceUrl");c.innerHTML=${supportedLanguages};document.body.appendChild(c)},!0);}).call(this);</script></body>`
      clearInterval(languagesTimer)
    }
  }, 10)

  // 获取可以翻译的所有语言，防止请求被墙导致脚本不能使用
  const pointTimer = setInterval(() => {
    const banner = document.querySelector('.goog-te-banner-frame')
    if (banner) {
      const doc = banner.contentWindow.document || banner.contentDocument
      const imgs = doc.getElementsByTagName('img')
      for (let i = 0; i < imgs.length; i++) {
        imgs[i].src = ''
      }
      clearInterval(pointTimer)
    }
  }, 10)

  // 菜单
  const menu = [
    {
      key: 'position',
      name: '按钮位置',
      value: true,
      showNotification: true,
      tip: {
        open: '👈',
        close: '👉'
      },
      click: setButtonPosition
    },
    {
      key: 'isCheck',
      name: '自动检测中文',
      value: true,
      showNotification: true,
      tip: {
        open: '✅',
        close: '❌'
      },
      click: null
    },
    {
      key: 'isShowTip',
      name: '显示翻译建议',
      value: false,
      showNotification: true,
      tip: {
        open: '✅',
        close: '❌'
      },
      click: setShowTip
    },
    {
      key: 'setHotkey',
      name: '设置快捷键',
      value: false,
      showNotification: false,
      tip: {
        open: '',
        close: ''
      },
      click: openSettings
    }
  ]

  // 保存已注册的菜单
  const munuRegister = []

  // 配置默认菜单
  menu.forEach(v => {
    if (GM_getValue(v.key) === undefined || GM_getValue(v.key) === null) GM_setValue(v.key, v.value)
  })

  // 注册菜单
  function registerMenuCommand() {
    if (munuRegister.length === menu.length) {
      munuRegister.forEach(v => {
        GM_unregisterMenuCommand(v)
      })
    }
    menu.forEach((v, i) => {
      v.value = GM_getValue(v.key)
      munuRegister[i] = GM_registerMenuCommand(`${v.value ? v.tip.open : v.tip.close} ${v.name}`, () => {
        menuSwitch(v)
      })
    })
  }

  // 切换菜单
  function menuSwitch(item) {
    // 设置数据
    item.value = !item.value
    GM_setValue(item.key, item.value)
    // 系统通知
    if (item.showNotification) {
      GM_notification({
        text: `已${item.value ? item.tip.open : item.tip.close}[${item.name}] 功能`,
        title: '网页翻译',
        timeout: 1000
      })
    }
    // 如果有点击事件，执行
    if (item.click) item.click()
    // 重新注册
    registerMenuCommand()
  }

  // 获取 head
  const head = document.head
  // 获取body
  const body = document.body
  // 获取当前页面的语言
  const lang = document.documentElement.lang
  // 获取网页的标题
  const pageTitle = document.title
  // 获取网页使用的主要语言
  const mainLang = document.characterSet.toLowerCase()

  // 判断是不是中文网页
  function isChinesePage() {
    return (
      GM_getValue('isCheck') &&
      (lang.substring(0, 2) === 'zh' || mainLang.substring(0, 2) === 'gb' || /[\u4E00-\u9FFF]/.test(pageTitle))
    )
  }

  // 打开设置快捷键弹窗
  function openSettings() {
    document.querySelector('.hotkey-settings').classList.add('show')
    document.querySelector('.hotkey-settings__container').classList.add('show')
  }

  // 快捷键设置弹窗

  // 位置信息样式
  let positionStyle = null
  // 设置按钮位置
  function setButtonPosition() {
    if (positionStyle) positionStyle.parentNode.removeChild(positionStyle)
    positionStyle = GM_addStyle(`
      .buttonContainer {
        ${GM_getValue('position') ? 'left' : 'right'}: 0;
        transform: translateX(${GM_getValue('position') ? '-' : ''}80%);
      }
    `)
  }

  // 显示翻译建议信息
  let tipStyle = null
  function setShowTip() {
    if (tipStyle) tipStyle.parentNode.removeChild(tipStyle)
    tipStyle = GM_addStyle(`
      #goog-gt-tt {
        visibility: ${GM_getValue('isShowTip') ? 'visible' : 'hidden!important'};
        display: ${GM_getValue('isShowTip') ? 'block' : 'none!important'};
      }
      .goog-text-highlight {
        background-color: ${GM_getValue('isShowTip') ? '#c9d7f1' : 'inherit!important'};
        box-shadow: ${GM_getValue('isShowTip') ? '2 2 4 #99a' : '0 0 0 0 transparent!important'};
      }
    `)
  }

  // 注册菜单
  registerMenuCommand()

  const keyName = ['translate', 'recover']
  let currentKeyName = ''
  let hotkeys = GM_getValue('hotkeys')
  hotkeys = hotkeys
    ? hotkeys
    : {
        translate: [],
        recover: []
      }

  const exclude = /control|shift|alt/

  // 设置按钮
  function setting(keyName) {
    currentKeyName = keyName
    hotkeys[keyName] = []
    document.getElementById(`i-${keyName}`).value = '松开手指即可设置完成！'
    document.removeEventListener('keydown', clickHotkey)
    document.addEventListener('keyup', setHotkey)
  }

  // 开始设置
  function setHotkey(e) {
    if (!exclude.test(e.key.toLowerCase())) {
      if (e.ctrlKey) hotkeys[currentKeyName].push('ctrl')
      if (e.shiftKey) hotkeys[currentKeyName].push('shift')
      if (e.altKey) hotkeys[currentKeyName].push('alt')
      hotkeys[currentKeyName].push(e.key)
      // 判断快捷键是否重复
      const key = keyName[keyName.indexOf(currentKeyName) ? 0 : 1]
      if (hotkeys[key][0] && hotkeys[key].length === hotkeys[currentKeyName].length) {
        const isDuplicate = hotkeys[key].every(v => {
          return hotkeys[currentKeyName].indexOf(v) > -1
        })
        if (isDuplicate) {
          return (document.getElementById(`i-${currentKeyName}`).value = '重复了，请重新设置')
        }
      }
      GM_setValue('hotkeys', hotkeys)
      document.getElementById(`i-${currentKeyName}`).value = `${hotkeys[currentKeyName].join(' + ')}`
      // 设置完成移除事件
      document.removeEventListener('keyup', setHotkey)
    }
  }

  // 按键按下事件
  document.addEventListener('keydown', clickHotkey)

  // 快捷键
  function clickHotkey(e) {
    const keys = []
    if (!exclude.test(e.key.toLowerCase())) {
      if (e.ctrlKey) keys.push('ctrl')
      if (e.shiftKey) keys.push('shift')
      if (e.altKey) keys.push('alt')
      keys.push(e.key)
      let key = ''
      keyName.forEach(v => {
        if (hotkeys[v][0] && hotkeys[v].length === keys.length) {
          const isRight = hotkeys[v].every(v => {
            return keys.indexOf(v) > -1
          })
          if (isRight) {
            key = v
            return
          }
        }
      })
      if (key) document.getElementById(`${key}Button`).click()
    }
  }

  // 关闭按钮
  function closeSettings() {
    document.querySelector('.hotkey-settings').classList.remove('show')
    document.querySelector('.hotkey-settings__container').classList.remove('show')
    // 重新添加按键按下事件
    document.addEventListener('keydown', clickHotkey)
  }

  // 快捷键设置结构
  function inttSettingsUI() {
    // 主要容器
    const settings = document.createElement('div')
    settings.className = 'hotkey-settings'
    // 弹窗容器
    const container = document.createElement('div')
    container.className = 'hotkey-settings__container'
    // 关闭按钮
    const close = document.createElement('div')
    close.className = 'hotkey-settings__close'
    close.textContent = '×'
    close.addEventListener('click', closeSettings)
    // 标题
    const header = document.createElement('div')
    header.className = 'hotkey-settings__header'
    header.textContent = '快捷键设置'
    // 设置区域
    const content = document.createElement('div')
    content.className = 'hotkey-settings__content'
    // 提示
    const tip = document.createElement('div')
    tip.className = 'hotkey-settings__tip'
    tip.textContent = '目前支持的快捷键附加键有：Ctrl, Shift, Alt'
    // 设置区域内容
    keyName.forEach(v => {
      const contentItem = document.createElement('div')
      contentItem.className = 'hotkey-settings__content-item'
      const title = document.createElement('span')
      title.className = 'hotkey-settings__title'
      title.textContent = v === 'translate' ? '翻译：' : '还原：'
      const input = document.createElement('input')
      input.id = `i-${v}`
      input.disabled = true
      input.className = 'hotkey-input'
      if (hotkeys[v][0]) {
        input.value = hotkeys[v].join(' + ')
      } else {
        input.value = '还没有设置快捷键哦~'
      }
      input.setAttribute('type', 'text')
      const button = document.createElement('button')
      button.id = `b-${v}`
      button.className = 'hotkey-button'
      button.textContent = '设置'
      button.addEventListener('click', e => setting(v))
      contentItem.appendChild(title)
      contentItem.appendChild(input)
      contentItem.appendChild(button)
      content.appendChild(contentItem)
    })
    container.appendChild(close)
    container.appendChild(header)
    container.appendChild(content)
    container.appendChild(tip)
    settings.appendChild(container)
    document.body.appendChild(settings)
  }

  // 设置快捷键的样式
  function addHotkeyStyle() {
    GM_addStyle(`
      .hotkey-settings {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999999999;
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        color: #606266;
        visibility: hidden;
      }

      .hotkey-settings.show {
        visibility: visible;
      }

      .hotkey-settings .hotkey-settings__container {
        width: 400px;
        border-radius: 6px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 10%);
        background-color: #fff;
        transform: scale(0);
        position: relative;
        transition: transform 0.3s;
      }

      .hotkey-settings__container.show {
        transform: scale(1);
      }

      .hotkey-settings__container .hotkey-settings__close {
        width: 20px;
        height: 20px;
        line-height: 21px;
        border-radius: 50%;
        text-align: center;
        color: #fff;
        font-weight: bold;
        background-color: #F56C6C;
        position: absolute;
        top: -6px;
        right: -6px;
        user-select: none;
      }

      .hotkey-settings__container .hotkey-settings__close:hover {
        opacity: 0.7;
      }

      .hotkey-settings__container .hotkey-settings__header {
        padding: 0 12px;
        height: 30px;
        line-height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .hotkey-settings__container .hotkey-settings__content {
        padding: 0 12px;
      }

      .hotkey-settings__container .hotkey-settings__tip {
        padding: 12px;
        color: #909399;
      }

      .hotkey-settings__container .hotkey-settings__content .hotkey-settings__content-item {
        display: flex;
        align-items: center;
      }

      .hotkey-settings__container .hotkey-settings__content .hotkey-input {
        flex: 1;
        -webkit-appearance: none;
        background-color: #fff;
        background-image: none;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        margin: 6px 12px;
      }

      .hotkey-settings__container .hotkey-settings__content .hotkey-button {
        display: inline-block;
        height: 40px;
        line-height: 40px;
        white-space: nowrap;
        cursor: pointer;
        border: 1px solid #409eff;
        -webkit-appearance: none;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 0;
        transition: 0.1s;
        font-weight: 500;
        user-select: none;
        padding: 0 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #409eff;
      }

      .hotkey-settings__container .hotkey-settings__content .hotkey-button:hover {
        opacity: 0.5;
      }
    `)
  }

  addHotkeyStyle()
  inttSettingsUI()

  // 判断是不是中文，如果是则直接return，否则执行
  if (!isChinesePage()) {
    // 创建网页元素方法
    function createElement(html, nodeText, attr, parent) {
      const element = document.createElement(nodeText)
      if (attr) {
        element[attr] = html
      } else {
        element.innerHTML = html
      }
      parent.appendChild(element)
    }

    // 初始化按钮位置
    setButtonPosition()
    // 初始化是否显示更好的翻译建议
    setShowTip()

    // 设置网页自动把 http 升级为 https
    // const e = document.createElement('meta')
    // e.setAttribute('http-equiv', 'Content-Security-Policy')
    // e.setAttribute('content', 'upgrade-insecure-requests')
    // head.appendChild(e)

    // 自定义样式，隐藏顶部栏
    GM_addStyle(`
      html,body{
        top: 0!important;
      }
      #google_translate_element {
        display: none;
      }
      .buttonContainer {
        width: 6em;
        position: fixed;
        bottom: 30px;
        z-index: 10000000;
        user-select: none;
        overflow: hidden;
        text-align: center;
        font-size: 13px;
        line-height: 2em;
        border-radius: 1em;
        box-shadow: 1px 1px 3px 0 #888;
        opacity: .5;
        transition: all .3s;
      }
      .recoverPage, .translateButton {
        float: left;
        width: 50%;
        box-sizing: border-box;
      }
      .recoverPage {
        border-radius: 1em 0 0 1rem;
        background-color: #fff;
      }
      .translateButton {
        color: #fff;
        border-radius: 0 1rem 1rem 0;
        background-color: #55b9f3;
      }
      .buttonContainer:hover {
        opacity: 1;
        transform: translateX(0);
      }
      .recoverPage:active, .translateButton:active {
        box-shadow: 1px 1px 3px 0 #888 inset;
      }
      .goog-te-banner-frame.skiptranslate {
        display: none
      }
      #goog-gt-tt {
        visibility: hidden!important;
        display: none!important;
      }
      .goog-text-highlight {
        background-color: inherit!important;
        box-shadow: 0 0 0 0 transparent!important;
      }
    `)

    // 创建容器
    createElement('google_translate_element', 'div', 'id', body)

    // 初始化
    createElement(
      `
      function googleTranslateElementInit() {
        new google.translate.TranslateElement(
          {
            pageLanguage: 'auto',
            includedLanguages: 'zh-CN',
            layout: /mobile/i.test(navigator.userAgent) ? 0 : 2
          },
          'google_translate_element'
        )
        // 清除图片的请求，加快访问速度
        let img = [].slice.call(document.querySelectorAll('#goog-gt-tt img,#google_translate_element img'))
        img.forEach(function (v) {
          const a = v
          a.src = ''
          let b = a.outerHTML.replace(/<img(.*?)>/, () => {
            return '<span id="lb"' + RegExp.$1 + '></span>'
          })
          const c = document.createElement('div')
          c.innerHTML = b
          a.parentNode.insertBefore(c.children[0], a.parentNode.children[0])
          a.remove()
        })
        // 获取设备信息
        const device = navigator.userAgent.indexOf('Mobile')
        // 按钮容器
        const buttonContainer = document.createElement('div')
        buttonContainer.setAttribute('class', 'notranslate buttonContainer')
        document.body.appendChild(buttonContainer)
        // 恢复按钮
        const recoverPage = document.createElement('div')
        recoverPage.setAttribute('id', 'recoverButton')
        recoverPage.setAttribute('class', 'notranslate recoverPage')
        recoverPage.innerText = '恢复'
        buttonContainer.appendChild(recoverPage)
        // 点击恢复原网页
        recoverPage.onclick = () => {
          let recoverIframe = null
          if (~device) {
            // 移动端
            const recoverDocument = document.getElementById(':1.container').contentWindow.document
            recoverDocument.getElementById(':1.restore').click()
          } else {
            // PC端
            const recoverDocument = document.getElementById(':2.container').contentWindow.document
            recoverDocument.getElementById(':2.restore').click()
          }
        }
        // 翻译按钮
        let langIframe = document.querySelector('.goog-te-menu-frame')
        const langIframeTimer = setInterval(() => {
          if (langIframe) {
            const langDocument = langIframe.contentWindow.document || langIframe.contentDocument
            let translateLang
            const translateTimer = setInterval(() => {
              if (~device) {
                translateLang = document.querySelector('.goog-te-combo')
              } else {
                translateLang = langDocument.querySelectorAll('table a')[1]
              }
              if (translateLang) {
                clearInterval(translateTimer)
                // 添加翻译按钮
                const translateButton = document.createElement('div')
                translateButton.setAttribute('id', 'translateButton')
                translateButton.setAttribute('class', 'notranslate translateButton')
                translateButton.innerText = '翻译'
                buttonContainer.appendChild(translateButton)
                // 点击翻译
                translateButton.onclick = () => {
                  if (~device) {
                    const event = document.createEvent('HTMLEvents')
                    event.initEvent('change', true, true)
                    event.eventType = 'message'
                    document.querySelector('.goog-te-combo').dispatchEvent(event)
                  } else {
                    translateLang.click()
                  }
                }
              }
            }, 300)
            clearInterval(langIframeTimer)
          } else {
            langIframe = document.querySelector('.goog-te-menu-frame')
          }
        }, 300)
      }
    `,
      'script',
      '',
      head
    )

    // 导入翻译接口
    if (/quora/i.test(location.href)) {
      // 这里主要是适配quora
      createElement(
        'https://translate.google.com/translate_a/element.js?&cb=googleTranslateElementInit',
        'script',
        'src',
        head
      )
    } else {
      createElement(
        'https://translate.google.cn/translate_a/element.js?&cb=googleTranslateElementInit',
        'script',
        'src',
        head
      )
    }

    // 排除一些代码的翻译
    const noTranslateArray = [
      '.bbCodeCode',
      'tt',
      'pre[translate="no"]',
      'pre',
      '.post_spoiler_show',
      '.c-article-section__content sub',
      '.c-article-section__content sup',
      '.c-article-equation',
      '.mathjax-tex'
    ]
    noTranslateArray.forEach(selectorName => {
      ;[...document.querySelectorAll(selectorName)].forEach(node => {
        if (node.className.indexOf('notranslate') === -1) {
          node.classList.add('notranslate')
        }
      })
    })

    // 解决一些网站开启脚本之后不能滚动
    function CanIScroll() {
      const noScrollSite = ['curseforge.com']
      noScrollSite.forEach(site => {
        if (~document.domain.indexOf(site)) {
          GM_addStyle(`
            html {
              height: auto!important;
            }
          `)
        }
      })
    }
    CanIScroll()
  }
})()
