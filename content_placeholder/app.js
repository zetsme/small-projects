const header = document.getElementById('header');
const title = document.getElementById('title');
const excerpt = document.getElementById('excerpt');
const profileImg = document.getElementById('profile-img');
const fullName = document.getElementById('name');
const date = document.getElementById('date');

const animatedBgs = document.querySelectorAll('.animated-bg');
const animatedBgTexts = document.querySelectorAll('.animated-bg-text');

const getData = () => {
  header.innerHTML = `  <img
  src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80"
  alt="">`;
  title.innerHTML = 'Lorem ipsum dolor sit amet.';
  excerpt.innerHTML =
    ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur, dolor.';
  profileImg.innerHTML = ' <img src="http://randomuser.me/api/portraits/men/45.jpg" alt="">';
  fullName.innerHTML = 'John Doe';
  date.innerHTML = 'Oct 08, 2020';
  animatedBgs.forEach((bg) => bg.classList.remove('animated-bg'));
  animatedBgTexts.forEach((bg) => bg.classList.remove('animated-bg-text'));
};

setTimeout(getData, 2500);
