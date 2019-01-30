import config from './config'

// Borrowed from https://stackoverflow.com/a/15724300
function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2)
    return parts.pop().split(";").shift();
}

export function request(url, method, request) {
  return fetch(config.api + url, {
    method: method,
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'X-CSRF-Token': '1',
      'Content-Type': 'application/json',
    },
    body: request ? JSON.stringify(request) : null,
  }).then((response) => {
    console.log(response)
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

export function getFtpURL(id, token) {
  if(token) {
    let url = new URL(id, config.ftp)
    url.username = token
    return url.toString()
  } else {
    return (new URL(id, config.ftp)).toString()
  }
}

export const defaultUserId = '00000000-0000-0000-0000-000000000000'
