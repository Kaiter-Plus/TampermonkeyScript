// ==UserScript==
// @name         网页翻译
// @author       Kaiter-Plus
// @namespace    https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/Translate
// @description  给每个非中文的网页右下角（可以调整到左下角）添加一个google翻译图标,直接调用 Google 的翻译接口对非中文网页进行翻译
// @version      1.63
// @license      BSD-3-Clause
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
// ==/UserScript==

;(function () {
  'use strict'

  // 取消没有用的图片请求
  const pointTimer = setInterval(() => {
    const banner = document.getElementById(':2.container')
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
      tip: {
        open: '✅',
        close: '❌'
      },
      click: setShowTip
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
    GM_notification({
      text: `已${item.value ? item.tip.open : item.tip.close}[${item.name}] 功能`,
      title: '网页翻译',
      timeout: 1000
    })
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

  // 位置信息样式
  let positionStyle = null
  // 设置按钮位置
  function setButtonPosition() {
    if (positionStyle) positionStyle.parentNode.removeChild(positionStyle)
    positionStyle = GM_addStyle(`
      #google_translate_element {
        ${GM_getValue('position') ? 'left' : 'right'}: 0;
        transform: translateX(${GM_getValue('position') ? '-' : ''}85%);
      }
      .recoverPage {
        ${GM_getValue('position') ? 'left' : 'right'}: 0;
        transform: translateX(${GM_getValue('position') ? '-' : ''}73%);
      }
      @media handheld, only screen and (max-width: 768px) {
        #google_translate_element {
          transform: translateX(${GM_getValue('position') ? '-' : ''}60%);
        }
        .recoverPage {
          transform: translateX(0);
        }
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

  // 判断是不是中文，不是则执行
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
        position: fixed;
        bottom: 30px;
        height: 21px;
        border-radius: 11px;
        z-index: 10000000;
        overflow: hidden;
        box-shadow: 1px 1px 3px 0 #888;
        opacity: .5;
        transition: all .3s;
        background-color: #646cff;
      }
      #google_translate_element .goog-te-gadget-simple {
        border: 0;
        background-color: transparent;
      }
      #google_translate_element .goog-te-gadget-simple span {
        margin-right: 0;
        border-radius: 11px;
        color: rgba(255, 255, 255, .87);
      }
      [id=":2.container"].skiptranslate {
        display: none;
      }
      #lb {
        display: inline-block;
      }
      .recoverPage {
        width: 4em;
        background-color: #646cff;
        color: rgba(255, 255, 255, .87);
        position: fixed;
        z-index: 10000000;
        bottom: 60px;
        user-select: none;
        text-align: center;
        font-size: small;
        line-height: 2em;
        border-radius: 1em;
        box-shadow: 1px 1px 3px 0 #888;
        opacity: .5;
        transition: all .3s;
      }
      #google_translate_element:hover, .recoverPage:hover {
        opacity: 1;
        transform: translateX(0);
      }
      .recoverPage:active {
        box-shadow: 1px 1px 3px 0 #888 inset;
      }
      #google_translate_element .goog-te-gadget-simple {
        width: 100%;
      }
      @media handheld, only screen and (max-width: 768px) {
        #google_translate_element {
          width: 104px;
          color: unset;
          background-color: #fff;
        }
        #google_translate_element .goog-te-combo {
          margin: 0;
          padding-top: 2px;
          border: none;
          color: unset;
          background-color: transparent;
        }
        .recoverPage {
          width: 1.5em;
          color: unset;
          line-height: 1.5em;
          background-color: #fff;
        }
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
            //包括的语言，中文简体，中文繁体，英语，日语，俄语
            includedLanguages: 'zh-CN,zh-TW,en,ja,ru',
            /*
             * 0，原生select，并且谷歌logo显示在按钮下方。
             * 1，原生select，并且谷歌logo显示在右侧。
             * 2，完全展开语言列表，适合pc。
             */
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
        const recoverPage = document.createElement('div')
        recoverPage.setAttribute('class', 'notranslate recoverPage')
        recoverPage.innerText = '原'
        document.body.appendChild(recoverPage)
        // 点击恢复原网页
        recoverPage.onclick = () => {
          const phoneRecoverIframe = document.getElementById(':1.container') // 移动端
          const PCRecoverIframe = document.getElementById(':2.container') // PC端
          if (phoneRecoverIframe) {
            const recoverDocument = phoneRecoverIframe.contentWindow.document
            recoverDocument.getElementById(':1.restore').click()
          } else if (PCRecoverIframe) {
            const recoverDocument = PCRecoverIframe.contentWindow.document
            recoverDocument.getElementById(':2.restore').click()
          }
        }
      }
    `,
      'script',
      '',
      head
    )

    // 导入翻译接口
    createElement(
      'https://translate.google.com/translate_a/element.js?&cb=googleTranslateElementInit',
      'script',
      'src',
      head
    )

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

    // 针对一些网站排除一些无需翻译的文字
    const noTranslateList = [
      {
        site: 'cratchapixel.com',
        selector: ['span.MathJax']
      }
    ]
    noTranslateList.forEach(item => {
      if (~document.domain.indexOf(item.site)) {
        item.selector.forEach(selectorName => {
          let timer = null
          let classList = document.querySelectorAll(selectorName)
          if (!classList[0]) {
            timer = setInterval(() => {
              classList = document.querySelectorAll(selectorName)
              if (classList[0]) {
                clearInterval(timer)
                ;[...classList].forEach(node => {
                  if (!~node.className.indexOf('notranslate')) {
                    node.classList.add('notranslate')
                  }
                })
              }
            })
          }
        })
      }
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
