// ==UserScript==
// @name         网页翻译-扩展版本
// @author       Kaiter-Plus
// @namespace    https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/Translate/Translate_ext.js
// @description  给非中文的网页右下角添加一个google翻译图标对网页进行翻译，该版本主要适配手机浏览器： X浏览器、via浏览器等不支持油猴扩展的浏览器
// @version      1.44
// @license      BSD-3-Clause
// @icon         https://www.google.cn/favicon.ico
// @include      *://*
// @run-at       document-end
// @noframes
// @note         2021/03/18 网页整页翻译功能，稍微调整了布局
// @note         2021/03/20 添加了排除网站的功能
// @note         2021/12/12 脚本被某些有心人举报，被删除，重新上传
// ==/UserScript==

;(function () {
  'use strict'
  // 此处使用正则表达式排除不用进行翻译的网站
  const noTranslateDomain = [
    /^([0-9]+\.){3}[0-9]+/,
    /.*duyaoss\.com/,
    /.*lanzous\.com/,
    /.*w3school.*cn/,
    /.*iqiyi\.com/,
    /.*baidu.*/,
    /.*cnblogs\.com/,
    /.*csdn\.net/,
    /.*zhku\.edu\.cn/,
    /.*zhihuishu\.com/,
    /.*aliyuncs\.com/,
    /.*chaoxing\.com/,
    /.*youku\.com/,
    /.*examcoo\.com/,
    /.*mooc\.com/,
    /.*bilibili\.com/,
    /.*qq\.com/,
    /.*yy\.com/,
    /.*huya\.com/,
    /localhost/,
    /.*acfun\.cn/
  ]
  // 获取 head
  const head = document.head
  // 获取body
  const body = document.body
  // 获取当前页面的语言
  const lang = document.documentElement.lang.toLowerCase().substr(0, 2)
  // 获取网页使用的主要语言
  const mainLang = document.characterSet.toLowerCase().substr(0, 2)
  // 设置是否排除网站的标识
  let noTranslateDomainflag = false
  // 排除一些网站的翻译
  noTranslateDomain.every(reg => {
    if (reg.test(document.domain)) {
      noTranslateDomainflag = true
      return false
    } else {
      return true
    }
  })

  // 判断是不是中文，如果是则直接return，否则执行
  if (lang === 'zh' || mainLang === 'gb' || noTranslateDomainflag) {
    return
  } else {
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

    // 自定义样式，隐藏顶部栏
    createElement(
      `
      html,body{
        top: 0!important;
      }
      #google_translate_element {
        position: fixed;
        bottom: 60px;
        height: 21px;
        border-radius: 11px;
        left: 0px;
        transform: translateX(-75%);
        z-index: 10000000;
        overflow: hidden;
        box-shadow: 1px 1px 3px 0 #888;
        opacity: .5;
        transition: all .3s;
      }
      #google_translate_element .goog-te-gadget-simple {
        border: 0;
      }
      #google_translate_element .goog-te-gadget-simple span {
        margin-right: 0;
        border-radius: 11px;
      }
      #lb {
        display: inline-block;
      }
      .recoverPage {
        width: 4em;
        background-color: #fff;
        position: fixed;
        z-index: 10000000;
        bottom: 60px;
        right: 0px;
        transform: translateX(78%);
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
      .goog-te-banner-frame.skiptranslate {
        display: none
      }
      @media handheld, only screen and (max-width: 768px) {
        #google_translate_element {
          width: 104px;
        }
        #google_translate_element .goog-te-gadget>div:first-child {
          margin: 2px;
        }
        #google_translate_element .goog-te-combo {
          margin: 0;
          padding-top: 2px;
          border: none;
        }
        #goog-gt-tt {
          visibility: hidden!important;
          display: none!important;
        }
        .goog-text-highlight {
          background-color: inherit!important;
          box-shadow: 0 0 0 0 transparent!important;
        }
        .recoverPage {
          width: 2.8em;
          line-height: 2.8em;
          border-radius: 50%;
          opacity: .3;
          transform: translateX(0);
        }
        .recoverPage:hover {
          opacity: .3;
        }
      }
    `,
      'style',
      '',
      head
    )

    // 创建容器
    createElement('google_translate_element', 'div', 'id', body)

    // 初始化
    createElement(
      `function googleTranslateElementInit() {
        let google_translate_element = document.getElementById('google_translate_element')
        let timer = setInterval(function () {
          google_translate_element = document.getElementById('google_translate_element')
          if (google_translate_element) {
            clearInterval(timer)
            new google.translate.TranslateElement(
              {
                pageLanguage: 'auto',
                //包括的语言，中文简体，中文繁体，英语，日语，俄语
                includedLanguages: 'zh-CN,zh-TW,en,ja,ru',
                layout: /mobile/i.test(navigator.userAgent) ? 0 : 2,
              },
              'google_translate_element'
            )
            // 清除图片的请求，加快访问速度
            let img = [].slice.call(document.querySelectorAll('#goog-gt-tt img,#google_translate_element img'));
            img.forEach(function(v) {
              const a = v
              a.src = ''
              let b = a.outerHTML.replace(/<img(.*?)>/, () => {
                return '<span id="lb"' + RegExp.$1 +'></span>'
              })
              const c = document.createElement('div')
              c.innerHTML = b
              a.parentNode.insertBefore(c.children[0], a.parentNode.children[0])
              a.remove()
            });
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
        }, 300)
      }`,
      'script',
      '',
      head
    )

    // 导入翻译接口
    if (/quora/i.test(location.href)) {
      // 这里主要是适配quora
      createElement(
        '//translate.google.com/translate_a/element.js?&cb=googleTranslateElementInit',
        'script',
        'src',
        head
      )
    } else {
      createElement(
        '//translate.google.cn/translate_a/element.js?&cb=googleTranslateElementInit',
        'script',
        'src',
        head
      )
    }

    // 排除一些代码的翻译
    const noTranslateArray = ['.bbCodeCode', 'tt', 'pre[translate="no"]']
    noTranslateArray.forEach(selectorName => {
      ;[...document.querySelectorAll(selectorName)].forEach(node => {
        if (node.className.indexOf('notranslate') === -1) {
          node.classList.add('notranslate')
        }
      })
    })
  }
})()
