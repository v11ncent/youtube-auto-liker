const log = (message) => {
  const tag = 'YouTube Auto Liker';
  const time = new Date().toLocaleTimeString();
  const formattedTime = date.substring(0, time.length - 3); // Remove ' AM' and ' PM' from datetime string
  console.log(`[${tag}][${formattedTime}] ${message}`);
}

const likeVideo = (button) => {
  const isLiked = button.getAttribute('aria-pressed') === 'true' ? true : false;

  if (!isLiked) {
    button.click();
    log('Liked video');
  }
}

// Since YouTube is a SPA, observe DOM for changes
// We can wait for the new video & like button to exist before liking the video
const observeYouTubeApp = () => {
  const target = document.querySelector('ytd-app');
  const buttonTagName = 'like-button-view-model'.toUpperCase();

  const callback = (mutations, observer) => {
    for (const mutation of mutations) {
      const element = mutation.target;

      if (element.tagName === buttonTagName) {
        const likeButton = element.querySelector('like-button-view-model button');
        likeButton && likeVideo(likeButton);
      };
    }
  }

  const observer = new MutationObserver(callback);
  observer.observe(target, { childList: true, subtree: true });
}

observeYouTubeApp();