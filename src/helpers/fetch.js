const baseUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = async (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  if(method === 'GET') {
    const response = await fetch(url);
    return await response.json();
  } else {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
}

export const fetchWithToken = async (endpoint, data, method = 'GET') => {
  const url = `${baseUrl}/${endpoint}`
  const token = localStorage.getItem('token') || '';
  if (method === 'GET') {
    const response = await fetch(url, {
      headers: {
        'x-token': token
      }
    });
    return await response.json();
  } else {
    const response = await fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        'x-token': token
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }
}