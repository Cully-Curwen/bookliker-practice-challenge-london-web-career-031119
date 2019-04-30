class API {
  // url list
  static baseUrl = 'http://localhost:3000/';
  static booksUrl = this.baseUrl + 'books';
  static usersUrl = this.baseUrl + 'users';

  // API working methods
  static getBooks = () => this.get(this.booksUrl);
  static updateBook = book => this.patch(this.booksUrl + `/${book.id}`, book)

  // Restful Url Methods
  static get = (url) => {
  return fetch(url)
    .then(resp => resp.json())
  };

  static post = (url, data) =>{
     return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
  };

  static patch = (url, data) => {
    return fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(resp => resp.json())
  };

  static delete = (url) => { 
    return fetch(url, {
      method: 'DELETE'
    }).then(resp => resp.json())
  };  
}