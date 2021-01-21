// ==UserScript==
// @name         中国大学MOOC视频中题目自动跳过
// @namespace    https://gitee.com/Kaiter-Plus/TampermonkeyScript/tree/master/MOOCSkipQuestion
// @version      0.1
// @description  中国大学MOOC,icourse163视频中题目自动跳过，移除弹题元素，防止暂停（本脚本仅供学习使用，请在24小时内删除！）
// @author       Kaiter
// @match        *://www.icourse163.org/learn/*
// @grant        none
// ==/UserScript==

(function() {
  setInterval(function(){
    let question = document.querySelector('.u-btn.u-btn-default.cont.j-continue')
    if (question) {
      question.parentNode.remove()
    }
    let video = document.querySelector('video')
    if (video.paused) {
      video.play()
    }
  }, 5000)
})();