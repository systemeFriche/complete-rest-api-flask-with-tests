import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import App from './App'

const initialAuthStore = {
  accessToken: '',
  refreshToken: '',
  userId: null
}
const initialUsersStore = {
  status: 'void',
  data: [],
  error: null
}

const mockStore = configureMockStore()
const store = mockStore({ auth: initialAuthStore, users: initialUsersStore })

test('renders landing page', () => {
  render(
    <Provider store={ store }>
      <App />
    </Provider>
  )
  expect(screen.getByText('BOILERPLATE API-FLASK-REACT')).toBeInTheDocument()
})
