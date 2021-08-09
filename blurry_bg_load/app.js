const loadText = document.querySelector('.loading-text');
const bg = document.querySelector('.section-bg');

const blurringBackground = () => {
  let load = 0;
  let interval;

  const scale = (number, inMin, inMax, outMin, outMax) => {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  };

  const blurring = () => {
    load++;
    if (load > 99) {
      clearInterval(interval);
    }
    loadText.textContent = `${load}%`;
    loadText.style.opacity = scale(load, 0, 100, 1, 0);
    bg.style.filter = `blur(${scale(load, 0, 100, 30, 0)}px)`;
  };

  return () => (interval = setInterval(blurring, 30));
};

const blur = blurringBackground();
blur();
