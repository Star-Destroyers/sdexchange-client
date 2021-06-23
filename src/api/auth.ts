import { HTTP } from '@/http'

function logout () {
  localStorage.removeItem('user')
}

async function handleLoginResponse (response: Response) {
  const json = await response.json()
  if (!response.ok) {
    if (response.status === 401) {
      logout()
    }

    const error = response.statusText
    throw new Error(error)
  }

  return json
}

async function login (username: string, password: string) {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)
  const options = {
    method: 'POST',
    body: formData
  }

  const response = await fetch(`${process.env.VUE_APP_API_ROOT}/auth/token`, options)
  const user = await handleLoginResponse(response)
  if (user.access_token) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  return user
}

async function me () {
  return await HTTP.get('/auth/users/me')
}

export const authService = {
  login,
  logout,
  me
}
