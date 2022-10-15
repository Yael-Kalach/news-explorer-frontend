const API_KEY = '1bd2b0f946174ab3b3cbf8de375bd6ef';
const PAGE_SIZE = 100;

class NewsApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }
  getSearchArticles(keyword) {
    return fetch(
      `${
        this._baseUrl
      }?apiKey=${API_KEY}&q=${keyword}&from=${this._from()}&to=${this._to()}&pageSize=${PAGE_SIZE}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then(this._checkResponse);
  }
  _checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  };

  _to() {
    const currentDate = new Date().toJSON().slice(0, 10);
    return currentDate;
  }

  _from() {
    const date = new Date();
    const subtractWeek = new Date(date.setDate(date.getDate() - 7))
      .toJSON()
      .slice(0, 10);
    return subtractWeek;
  }
}

const newsApi = new NewsApi({
  baseUrl: 'https://nomoreparties.co/news/v2/everything',
});

export default newsApi;