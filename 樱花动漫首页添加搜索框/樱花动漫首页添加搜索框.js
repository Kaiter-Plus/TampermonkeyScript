// ==UserScript==
// @name        樱花动漫首页添加搜索框
// @namespace   https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/樱花动漫首页添加搜索框
// @include     *://*.imomoe.*/
// @grant       none
// @version     0.1
// @author      Kaiter-Plus
// @description 给樱花动漫的首页添加一个搜索框
// @note        2021/1/16 下午5:16:42 添加搜索框
// ==/UserScript==
;(function () {
  'use strict'
  // 获取搜索框的父元素
  const search = document.getElementsByClassName('so l')[0]
  // 添加搜索框
  search.innerHTML = `
      <form name="formsearch" id="formsearch" action="/search.asp" method="post">
        <input type="text" name="searchword" class="input">
        <input class="but" id="searchbutton" value="" type="submit">
      </form>
    `
})()
