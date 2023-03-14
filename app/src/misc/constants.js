// export const API_BASE_URL_TEST = process.env.REACT_APP_SERVER_URL
// export const ACCESS_TOKEN_NAME = 'login_access_token'
export const API_BASE_URL = process.env.REACT_APP_API_EP_URI
// export const API_BASE_URL = "http://localhost:9000"
// export const USER_SESSION = "user_session"
// export const API_VERSION = "/api/v1"
export const ACCESS = [
  { id: 0, shortName: 'guest', name: 'Invité' },
  { id: 1, shortName: 'user', name: 'Utilisateur' },
  { id: 2, shortName: 'admin', name: 'Administrateur' }
]

export const getNameAccessFromId = (accessId) => {
  const result = ACCESS.find(item => item.id === accessId).name
  return result
}

export const getNameAccessFromId = (accessId) => {
    let result = ACCESS.find( item => item.id === accessId).name
    return result
}