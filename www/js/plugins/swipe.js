// based on https://gist.github.com/SleepWalker/da5636b1abcbaff48c4d
(function() {
  let touchstartX = 0;
  let touchstartY = 0;
  let touchendX = 0;
  let touchendY = 0;

  if (window.swipeloaded === true) return;
  window.swipeloaded = true;

  const handleGesture = (touchstartX, touchstartY, touchendX, touchendY) => {
    const delx = touchendX - touchstartX;
    const dely = touchendY - touchstartY;
    if(Math.abs(delx) > Math.abs(dely)){
      if(delx > 0) return "right"
      else return "left"
    }
    else if(Math.abs(delx) < Math.abs(dely)){
      if(dely > 0) return "down"
      else return "up"
    }
    else return "tap"
  }

  let swiping = false;
  const handleTouchStart = (event) => {
    if (swiping === false) {
      swiping = true;
      touchstartX = event.changedTouches[0].screenX;
      touchstartY = event.changedTouches[0].screenY;
    }
    event.stopPropagation();
    event.preventDefault();
  }

  const handleTouchEnd = (event) => {
    event.stopPropagation();
    event.preventDefault();

    if (swiping === true) {
      touchendX = event.changedTouches[0].screenX;
      touchendY = event.changedTouches[0].screenY;
      const direction = handleGesture(touchstartX, touchstartY, touchendX, touchendY);
      swiping = false;

      let button = null;
      switch (direction) {
        case 'left':
          button = document.querySelector("tp-yt-paper-icon-button.next-button");
          if (button) button.click();
          break;
        case 'right':
          const video = document.querySelector('video');
          if (video) video.currentTime = 0;
          setTimeout(() => {
            button = document.querySelector("tp-yt-paper-icon-button.previous-button");
            if (button) button.click();
          }, 500);
          break;
        default:
          return;
      }

      const cover = player.querySelector("img#cover-image");
      if (cover) {
        cover.setAttribute("src", "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN8XA8AAksBZG7LpHYAAAAASUVORK5CYII=");
      }
    }
  }

  const player = document.querySelector('ytmusic-player');
  if (player) {
    player.removeEventListener('touchstart', handleTouchStart);
    player.removeEventListener('touchend', handleTouchEnd);
    player.addEventListener('touchstart', handleTouchStart);
    player.addEventListener('touchend', handleTouchEnd);
  }
})();
