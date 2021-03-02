// ==UserScript==
// @name        COCO漫画收藏更新排序
// @namespace   Violentmonkey Scripts
// @match       *://*.cocomanhua.com/dynamic/user/subscription
// @grant       none
// @version     0.2
// @author      Kaiter-Plus
// @description COCO 漫画“我的收藏”界面根据“更新日”进行排序
// @note        2021/03/01 COCO 漫画 我的收藏 界面根据 更新日进行排序
// @note        2021/03/02 保留表格标题
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

  // 获取更新时间戳
  function getDateTime(DOM) {
    return new Date(DOM.children[0].children[3].innerHTML).getTime()
  }
})()
