/* Elements */
const player = document.querySelector('.player');
const viewer = player.querySelector('video.viewer');
const progressBar = player.querySelector('div.progress');
const progressFilled = player.querySelector('div.progress__filled');
const playButton = player.querySelector('button.toggle');
const sliders = player.querySelectorAll('input.player__slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreen = player.querySelector('[data-action="fullscreen"');

/* Flags */
let mousedown = false;

/* Functions */
function handleProgressBar() {
  const percent = (viewer.currentTime/viewer.duration) * 100;
  progressFilled.style.width = `${percent}%`;
  progressFilled.style.flexBasis = `${percent}%`;
}

function handleProgressBarUpdate(e) {
  const currentTime = (e.offsetX / progressBar.offsetWidth) * viewer.duration;
  viewer.currentTime = currentTime;
}

function skip() {

  if (seekedTime >= viewer.duration) {
    viewer.currentTime = viewer.duration;
    return;
  }
  viewer.currentTime = viewer.currentTime + parseFloat(this.dataset.skip);
}

function handleSliderUpdate() {
  viewer[this.name] = this.value;
}

function togglePlay() {
  const method = viewer.paused ? 'play' : 'pause';
  viewer[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  playButton.textContent = icon;
}

function toggleFullscreen() {
  if (viewer.requestFullscreen) {
    viewer.requestFullscreen();
  } else if (viewer.webkitRequestFullscreen) {
    viewer.webkitRequestFullscreen();
  } else if (viewer.mozRequestFullScreen) {
    viewer.mozRequestFullScreen();
  }
}

/* Event listeners */
progressBar.addEventListener('click', handleProgressBarUpdate);
progressBar.addEventListener('mousedown', () => mousedown = true);
document.addEventListener('mouseup', () => mousedown = false);
progressBar.addEventListener('mousemove', (e) => mousedown && handleProgressBarUpdate(e));

viewer.addEventListener('click', togglePlay);
viewer.addEventListener('play', updateButton);
viewer.addEventListener('pause', updateButton);
viewer.addEventListener('timeupdate', handleProgressBar);

playButton.addEventListener('click', togglePlay);

fullscreen.addEventListener('click', toggleFullscreen);

skipButtons.forEach(button => button.addEventListener('click', skip));

sliders.forEach(slider => slider.addEventListener('change', handleSliderUpdate));
sliders.forEach(slider => slider.addEventListener('mousemove', handleSliderUpdate));
