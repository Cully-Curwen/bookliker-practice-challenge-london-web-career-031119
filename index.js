const state = {
  books: [],
  currentUser: {"id":1, "username":"pouros"},
  selectedBook: {}
}

window.onload = () => {
  API.getBooks()
    .then(books => books.map(book => state.books.push(book)))
    .then(booksList);
};

const booksList = () => {
  const list = document.getElementById('list');
  state.books.map( book => list.appendChild(book_li(book)) );
};

const book_li = (bookObj) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = bookObj.title;
  li.id = bookObj.id;
  li.onclick = () => {
    state.selectedBook = bookObj;
    render();
  }
  li.appendChild(p);
  return li;
};

const render = () => {
  const show_pannel = document.getElementById('show-panel');
  show_pannel.innerHTML = '';
  thumbnail();
}

const currentUserNotlike = () => {
  return state.selectedBook.users.every(user => user.id != state.currentUser.id)
}

const likeBook = () => {
  let users = state.selectedBook.users;
  if (currentUserNotlike()) {
    state.selectedBook.users.push(state.currentUser);
    API.updateBook(state.selectedBook)
    .then(resp => {
      state.selectedBook = resp;
      render();
    });
  } else {
    state.selectedBook.users = users.filter(user => user.id != state.currentUser.id);
    API.updateBook(state.selectedBook)
      .then(resp => {
        state.selectedBook = resp;
        render();
      });
  };
}

const thumbnail = () => {
  const show_pannel = document.getElementById('show-panel');
  const container = document.createElement('div');
  const title = document.createElement('h1');
  title.innerText = state.selectedBook.title;
  const img = document.createElement('img');
  img.src = state.selectedBook.img_url;
  const description = document.createElement('p');
  description.innerText = state.selectedBook.description;
  const btnLike = document.createElement('button');
  btnLike.innerText = currentUserNotlike() ? "Like Book" : "Unlike Book";
  btnLike.onclick = likeBook;
  const likesList = document.createElement('ul');
  state.selectedBook.users.map(user_li).map(el => likesList.appendChild(el));

  container.appendChild(title);
  container.appendChild(img);
  container.appendChild(description);
  container.appendChild(likesList);
  container.appendChild(btnLike);
  show_pannel.appendChild(container);
}

const user_li = (userObj) => {
  const li = document.createElement('li');
  const p = document.createElement('p');
  p.innerText = userObj.username;
  li.id = userObj.id;
  li.appendChild(p);
  return li;
}