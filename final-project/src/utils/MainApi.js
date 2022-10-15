import React from 'react';

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
    return Promise.reject(`Error ${res.status}`);
  }

  getUserInformation() {
    const authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return fetch (`${this._baseUrl}/users/me`, {
      headers: {
        ...this._headers,
        Authorization: authorization,
        'Access-Control-Allow-Origin': '*',
      }
    })
      .then(this._checkResponse)
  }

  getSavedArticles() {
    const authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        Authorization: authorization,
        'Access-Control-Allow-Origin': '*',
      },
    }).then(this._getResponseData);
  }

  saveArticles(newsCard) {
    const authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return fetch(`${this._baseUrl}/articles`, {
      headers: {
        ...this._headers,
        Authorization: authorization,
        'Access-Control-Allow-Origin': '*',
      },
      method: 'post',
      body: JSON.stringify({
        keyword: localStorage.getItem('currentKeyword'),
        title: newsCard.title,
        text: newsCard.text,
        date: newsCard.date,
        source: newsCard.source,
        link: newsCard.link,
        image: newsCard.image,
      }),
    }).then(this._getResponseData);
  }

  deleteArticle(id) {
    const authorization = `Bearer ${localStorage.getItem('jwt')}`;
    return fetch(`${this._baseUrl}/articles/${id}`, {
      headers: {
        ...this._headers,
        Authorization: authorization,
        'Access-Control-Allow-Origin': '*',
      },
      method: 'DELETE',
    }).then(this._getResponseData);
  }
}

const api = new MainApi({
    baseUrl: "https://api.yaelk.students.nomoredomainssbs.ru",
    headers: {
      "Content-Type": "application/json",
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
});

export default api;