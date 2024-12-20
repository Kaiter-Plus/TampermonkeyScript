setInterval(function () {
  let question = document.querySelector('.u-btn.u-btn-default.cont.j-continue')
  if (question) {
    (question.parentNode as HTMLElement)?.remove()
  }
  let video = document.querySelector('video')
  if (video?.paused) {
    video.play()
  }
}, 5000)