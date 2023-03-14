import { useEffect } from 'react'
import { useStore, useSelector } from 'react-redux'

import ViewBoardUsers from '../User/ViewBoardUsers'
import ViewBoardUserProjects from '../User/ViewBoardUserProjects'

import ViewBoardUserTasks from '../User/ViewBoardUserTasks'
import './Board.css'

import { users, selectFetchUsersStatus, selectFetchUsersError } from '../../store/reducer/usersSlice'

import { fetchUsers } from '../../misc/services'

const Board = () => {
  // no prop
  // no state
  // store
  const usersList = useSelector(users)
  const error = useSelector(selectFetchUsersError)
  const loading = useSelector(selectFetchUsersStatus) === 'void'
  // no param
  // local variables
  const store = useStore()

  const _displayError = () => {
    return (
        <div>
            <p className="message">{error}</p>
        </div>
    )
  }

  useEffect(() => {
    fetchUsers(store)
  }, [store])

  return (
    <div className="board">
      <h1>Board</h1>
      <h2>Les utilisateurs</h2>
      <p>Voici la liste des utilisateurs de ce site :</p>
      { loading && <p className="message">Loading...</p> }
      { !loading && error && _displayError() }
      { !loading && !error && <ViewBoardUsers users={ usersList }/> }
      <h2>Mes projets</h2>
      { !loading && !error && <ViewBoardUserProjects /> }
      <h2>Mes tâches</h2>
      { !loading && !error && <ViewBoardUserTasks/> }
    </div>
  )
}

export default Board
