const data = [
  {
    src: 'https://images.unsplash.com/photo-1628430827096-91f40c1d33c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=701&q=80',
    title: 'Brown monkey sitting on the ground',
    bgColor: '#555646',
  },
  {
    src: 'https://images.unsplash.com/photo-1628480136171-92d7f58c1c22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=991&q=80',
    title: 'Man in black shirt riding a motorcycly',
    bgColor: '#c27a7b',
  },
  {
    src: 'https://images.unsplash.com/photo-1628432365762-b06f2f9e5fdd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    title: 'Water droplets on glass panel',
    bgColor: '#d78b66',
  },
  {
    src: 'https://images.unsplash.com/photo-1628414832152-aafba4dec0d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    title: 'Corgy puppy on wooden log',
    bgColor: '#d9a57b',
  },
  {
    src: 'https://images.unsplash.com/photo-1628200166841-f02371d4b9d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    title: 'Girl in red long sleeve shirt',
    bgColor: '#af0114',
  },
];
const slider = document.querySelector('.slider');
const slideRight = document.querySelector('.slider__right');
const slideLeft = document.querySelector('.slider__left');
const upBtn = document.querySelector('.btn__up');
const downBtn = document.querySelector('.btn__down');

const init = () => {
  data.forEach((item, index) => {
    const textDiv = document.createElement('div');
    textDiv.style.backgroundColor = item.bgColor;
    const textEl = document.createElement('h2');
    textEl.textContent = item.title;
    textDiv.appendChild(textEl);
    slideLeft.appendChild(textDiv);

    const rightImage = document.createElement('div');
    rightImage.style.backgroundImage = `url(${data[data.length - 1 - index].src})`;
    slideRight.appendChild(rightImage);
  });
};
init();

const sliderChange = () => {
  let activeSlideIndex = 0;
  slideLeft.style.top = `-${(data.length - 1) * 100}vh`;

  return (direction) => {
    const sliderHeight = slider.clientHeight;
    if (direction === 'up') {
      activeSlideIndex++;
      if (activeSlideIndex > data.length - 1) {
        activeSlideIndex = 0;
      }
    } else if (direction === 'down') {
      activeSlideIndex--;
      if (activeSlideIndex < 0) {
        activeSlideIndex = data.length - 1;
      }
    }
    slideRight.style.transform = `translateY(-${activeSlideIndex * sliderHeight}px)`;
    slideLeft.style.transform = `translateY(${activeSlideIndex * sliderHeight}px)`;
  };
};

const changeSlide = sliderChange();

upBtn.addEventListener('click', () => changeSlide('up'));
downBtn.addEventListener('click', () => changeSlide('down'));
