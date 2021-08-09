const resultEl = document.getElementById('result');
const filterEl = document.getElementById('filter');
const refreshBtn = document.getElementById('refresh');

const clearResult = () => (resultEl.innerHTML = '');

const createUserList = () => {
  let listItems = [];
  let page = 1;
  let ready = false;

  clearResult();

  const fetchUsers = async () => {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?results=50&inc=name,location,picture&page=${page}`
      );
      const { results } = await res.json();

      results.forEach((user) => {
        const li = document.createElement('li');

        li.innerHTML = `
        <img src="${user.picture.large}" alt="${user.name.first}" />
        <div class="user__info">
          <h4>${user.name.first} ${user.name.last}</h4>
          <p>${user.location.city}, ${user.location.country}</p>
        </div>
      `;
        //
        listItems.push(li);
        resultEl.appendChild(li);
      });
      ready = true;
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm) {
      ready = false;
    } else {
      ready = true;
    }

    listItems.forEach((item) => {
      if (item.textContent.toLowerCase().includes(searchTerm.toLowerCase())) {
        item.classList.remove('hide');
      } else {
        item.classList.add('hide');
      }
    });
  };

  const fetchMore = (e) => {
    const { scrollTop, scrollHeight } = e.target;
    if (scrollTop + 700 >= scrollHeight && ready) {
      ready = false;
      page++;
      fetchUsers(page);
    }
  };

  const fetchFromStart = () => {
    listItems = [];
    page = 1;
    clearResult();
    fetchUsers();
  };

  return { fetchUsers, filterData, fetchMore, fetchFromStart };
};

const { fetchUsers, filterData, fetchMore, fetchFromStart } = createUserList();

fetchUsers();

filterEl.addEventListener('input', filterData);

resultEl.addEventListener('scroll', fetchMore);

refreshBtn.addEventListener('click', fetchFromStart);
