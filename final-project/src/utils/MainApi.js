import React from 'react';
const authorization = `Bearer ${localStorage.getItem('jwt')}`;

class MainApi extends React.Component {
  constructor(props) {
    super(props);
    const headers = props.headers;
    this._baseUrl = props.baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Error ${res.status} : ${res.data}`);
  }

  getUserInformation() {
    return fetch (`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(this._checkResponse)
  }

  getSavedArticles() {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*',
      },
    }).then(this._checkResponse);
  }

  saveArticles({title, description, publishedAt, urlToImage, url, source }) {
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*',
      },
      method: 'POST',
      body: JSON.stringify({
        keyword: localStorage.getItem('currentKeyword'),
        title,
        text: description,
        date: publishedAt,
        source: source.name,
        link: url,
        image: urlToImage,
      }),
    }).then(this._checkResponse);
  }

  deleteArticle(article) {
    return fetch(`${this._baseUrl}/articles/${article._id}`, {
      headers: {
        ...this._headers,
        'Authorization': authorization,
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
    }).then(this._checkResponse);
  }
}

const api = new MainApi({
    baseUrl: "https://api.news-explorer-yaelk.students.nomoredomainssbs.ru",
    headers: {
      "Content-Type": "application/json",
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
});

export default api;