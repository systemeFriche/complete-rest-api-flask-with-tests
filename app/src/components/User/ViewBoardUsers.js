import PropTypes from 'prop-types'

import './ViewBoardUsers.css'

import ViewUser from './ViewUser'

const ViewBoardUsers = ({ users }) => {
  // prop
  // users : [{access: 2, id: 1, username: "fguntz"},{...},{...}]
  // no state
  // no store
  // no param
  // no local variable

  return (
        <div className="users-list">
        { // s'il y a des users à afficher
            users.length > 0
              ? users.map(user =>
                    <ViewUser key={user.id} user={user}/>)
              : <p className="message">Il n&rsquo;y a pas d&rsquo;utilisateurs à afficher...</p>
        }
    </div>
  )
}

ViewBoardUsers.propTypes = {
  users: PropTypes.array.isRequired
}

export default ViewBoardUsers
