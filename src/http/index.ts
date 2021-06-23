async function handleResponse (response: Response) {
  const json = await response.json()
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('user')
      location.reload(true)
    }

    const error = response.statusText
    throw new Error(error)
  }

  return json
}

function authHeader () {
  const storedUser = localStorage.getItem('user')
  if (storedUser != null) {
    const user = JSON.parse(storedUser)
    if (user.access_token) {
      return { Authorization: 'Bearer ' + user.access_token }
    }
  }
  return { Authorization: '' }
}

function defaultHeaders () {
  return {
    'Content-Type': 'application/json',
    ...authHeader()
  }
}

async function doFetch (path: string, options = {}) {
  const response = await fetch(`${process.env.VUE_APP_API_ROOT}${path}`, options)
  return await handleResponse(response)
}

async function get (path: string, options = { headers: {} }) {
  const requestOptions = {
    ...options,
    method: 'GET',
    headers: {
      ...defaultHeaders(),
      ...options.headers
    }
  }
  return await doFetch(path, requestOptions)
}

async function post (path: string, data: Record<string, never>, options = { headers: {} }) {
  const requestOptions = {
    ...options,
    method: 'POST',
    headers: {
      ...defaultHeaders(),
      ...options.headers
    },
    body: JSON.stringify(data)
  }

  return await doFetch(path, requestOptions)
}

async function patch (path: string, data: Record<string, never>, options = { headers: {} }) {
  const requestOptions = {
    ...options,
    method: 'PATCH',
    headers: {
      ...defaultHeaders(),
      ...options.headers
    },
    body: JSON.stringify(data)
  }

  return await doFetch(path, requestOptions)
}

async function _delete (path: string, options = { headers: {} }) {
  const requestOptions = {
    ...options,
    method: 'DELETE',
    headers: {
      ...defaultHeaders(),
      ...options.headers
    }
  }

  return await doFetch(path, requestOptions)
}

export const HTTP = {
  get,
  post,
  patch,
  delete: _delete
}
