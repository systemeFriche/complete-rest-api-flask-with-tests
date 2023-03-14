import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { logout } from '../../store/reducer/authSlice'

import './NavBar.css'

const Navbar = () => {
  // no prop
  // no state
  // no store
  // no param
  // local variable
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const _logout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <nav className="main-menu">
      <ul>
        <li>
          <NavLink to="/" className="Nav_link" activeclassname="active">
            <div className="nav-text">
              Home
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/board" className="Nav_link" activeclassname="active">
            <div className="nav-text">
              Board
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/newUser" className="Nav_link" activeclassname="active">
            <div className="nav-text">
              New User
            </div>
          </NavLink>
        </li>
        <li>
          <div onClick={_logout} className="logout">Logout</div>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
