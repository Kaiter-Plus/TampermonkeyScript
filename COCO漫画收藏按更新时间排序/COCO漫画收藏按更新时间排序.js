// ==UserScript==
// @name        COCO漫画收藏按更新时间排序
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/COCO漫画收藏按更新时间排序
// @match       *://*.cocomanhua.com/dynamic/user/subscription
// @grant       none
// @version     0.1
// @author      Kaiter-Plus
// @description 2021/3/1 下午2:54:47
// ==/UserScript==
;(function () {
  'use strict'
  const container = document.getElementsByClassName('fed-user-list fed-part-rows fed-back-whits')[0]
  const all = document.getElementsByClassName('fed-padding-x fed-part-rows fed-line-top')
  // 实现排序
  container.innerHTML = Array.from(all)
    .sort((a, b) => getDateTime(b) - getDateTime(a))
    .map(item => item.outerHTML)
    .join('')

  // 获取更新时间戳
  function getDateTime(DOM) {
    return new Date(DOM.children[0].children[3].innerHTML).getTime()
  }
})()
