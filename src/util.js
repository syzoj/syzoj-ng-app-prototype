import config from './config'

export function request(url, method, request) {
  return fetch(config.api + url, {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: request ? JSON.stringify(request) : null,
  }).then((response) => {
    if(response.status >= 500)
      throw "Internal server error: " + url + ": " + response.status
    return response.json()
  }).then((response) => {
    if(response.session) {
      localStorage.setItem('syzoj-session', JSON.stringify(response.session))
    }
    if(response.error)
      throw response.error
    return response.data
  })
}

export function getSession() {
  let val = localStorage.getItem('syzoj-session')
  if(!val) {
    localStorage.setItem('syzoj-session', '{}')
    val = '{}'
  }
  return JSON.parse(val)
}

export function getGitURL(id, token) {
    console.log(id, config.git)
  if(token) {
    let url = new URL(id, config.git)
    url.username = token
    console.log(url.toString())
    return url.toString()
  } else {
    console.log(new URL(id, config.git))
    return new URL(id, config.git).href
  }
}

export const defaultUserId = '00000000-0000-0000-0000-000000000000'
