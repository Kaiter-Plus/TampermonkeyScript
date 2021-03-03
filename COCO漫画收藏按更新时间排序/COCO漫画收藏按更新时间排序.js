// ==UserScript==
// @name        COCO漫画收藏按更新时间排序
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/COCO漫画收藏按更新时间排序
// @match       *://*.cocomanhua.com/dynamic/user/subscription
// @grant       none
// @version     0.4
// @author      Kaiter-Plus
// @description COCO 漫画“我的收藏”界面根据“更新日”进行排序
// @grant       GM_addStyle
// @note        2021/03/01 COCO 漫画 我的收藏 界面根据 更新日进行排序
// @note        2021/03/02 保留表格标题
// @note        2021/03/03 最新的更新标题标为红色，更加显眼
// @note        2021/03/04 更新访问过的最新标题为黑色，不用自己记有没有访问过了
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
