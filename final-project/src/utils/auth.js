export const BASE_URL = 'https://api.yaelk.students.nomoredomainssbs.ru';

const checkResponse = async ( res ) => {
  const asyncFunc = await res.json()
  if (res.ok) {
    return asyncFunc;
  }
  return Promise.reject(res);
}

export const register = async (user) => {
  try {
    const res = await fetch (`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            email: user.email,
            password: user.password,
            name: user.name,
        }),
    });
    return checkResponse(res);
  } catch (e) {
    console.log('error in register:', e)
  }
}

export const signIn = ( user ) => {
  return fetch (`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  })
    .then(checkResponse)
    .then((res) => {
      if (res.token) {
        localStorage.setItem('jwt', res.token);
        localStorage.setItem('name', user.name);
        return res;
      } else {
        return;
      }
    });
};

export const checkToken = ( token ) => {
  return fetch (`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ token }`,
      'Access-Control-Allow-Origin': '*',
    }
  })
  .then(res => {return checkResponse(res)})
}