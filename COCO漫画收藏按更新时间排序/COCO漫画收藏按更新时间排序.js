// ==UserScript==
// @name        COCO漫画收藏按更新时间排序
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/COCO漫画收藏按更新时间排序
// @match       *://*.cocomanhua.com/dynamic/user/subscription
// @match       *://*.cocomanga.com/dynamic/user/subscription
// @match       *://*.colamanhua.com/dynamic/user/subscription
// @match       *://*.colamanga.com/dynamic/user/subscription
// @version     0.80
// @author      Kaiter-Plus
// @icon        https://www.colamanga.com/favicon.ico
// @description COCO 漫画“我的收藏”界面根据“更新日”进行排序
// @grant       GM_addStyle
// ==/UserScript==
;(function () {
  'use strict'
  const container = document.getElementsByClassName('fed-user-list fed-part-rows fed-back-whits')[0]
  const all = document.getElementsByClassName('fed-padding-x fed-part-rows fed-line-top')
  // 实现排序
  container.innerHTML =
    document.getElementsByClassName('fed-padding-x fed-part-rows')[0].outerHTML +
    Array.from(all)
      .sort((a, b) => getDateTime(b) - getDateTime(a))
      .map(item => item.outerHTML)
      .join('')

  // 添加最新更新样式
  GM_addStyle(`
    .lastUpdate a {
      color: red;
    }
    .lastUpdate a:visited {
      color: #000;
    }
    .lastUpdate a:hover {
      color: #27ae60;
    }
  `)

  // 获取更新时间戳
  function getDateTime(DOM) {
    const updateTime = new Date(DOM.children[0].children[3].innerHTML).getTime()
    if (new Date(updateTime).toLocaleDateString() === new Date().toLocaleDateString()) {
      DOM.classList.add('lastUpdate')
    }
    return updateTime
  }
})()
