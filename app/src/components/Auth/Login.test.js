import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { loginUser } from '../../misc/services'
import { store } from '../../store/store'
import App from '../App/App'

const TestApp = () => {
  return (
    <Provider store={ store }>
      <App />
    </Provider>
  )
}

// mock function loginUser (API call)
jest.mock('../../misc/services', () => ({
  loginUser: jest.fn()
}))

test('renders login Page', () => {
  render(
    <TestApp />
  )
  expect(screen.getByDisplayValue('Se connecter')).toBeInTheDocument()
})

test('renders authentification error', async () => {
  render(
    <TestApp />
  )
  loginUser.mockImplementation(() =>
    Promise.resolve({
      status: 'Invalid credentials'
    })
  )

  fireEvent.click(screen.getByTestId('login-submit'))

  await waitFor(() => {
    expect(screen.getByText('Invalid credentials')).toBeInTheDocument()
  })
})

test('renders authentification success', async () => {
  render(
    <TestApp />
  )
  loginUser.mockImplementation(() =>
    Promise.resolve({
      status: 'ok',
      accessToken: 'fzKgaHdj3iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjc5NjU1MDQ5LCJqdGkiOiI4MjgwMDRjZi1mYzJhLTQxOGUtYTczZS1jZTQxZWE1M2M4YmMiLCJ0eXBlIjoiYWNjZXNzIiwic3ViIjoxLCJuYmYiOjE2Nzk2NTUwNDksImV4cCI6MTY3OTY1NTk0OSwiaXNfYWRtaW4iOnRydWV9.yG30BB9cc3zRwqpDgyvbJ7gAvJP1XuKWFyhHHI2hln0',
      refreshToken: 'fzKgaHdj3iJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3OTY1NTA0OSwianRpIjoiZGYxM2U2ZWEtMzZiOC00MDIzLWEzZjctMGY3MDNiMDZkYzZiIiwidHlwZSI6InJlZnJlc2giLCJzdWIiOjEsIm5iZiI6MTY3OTY1NTA0OSwiZXhwIjoxNjgyMjQ3MDQ5LCJpc19hZG1pbiI6dHJ1ZX0.5V2rsYMCIKPrmLTR9AmGTMSAapbTpe7hpp-T9sPSfQY',
      userId: 1

    })
  )

  fireEvent.click(screen.getByTestId('login-submit'))

  await waitFor(() => {
    expect(screen.findByText('Home'))
  })
})
