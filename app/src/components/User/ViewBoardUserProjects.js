import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { authAccessToken, authUserId } from '../../store/reducer/authSlice'

import './ViewBoardUserProjects.css'

import { getUserProjects } from '../../misc/services'

const ViewBoardUserProject = () => {
  // no prop
  // state
  const [userProjects, setUserProjects] = useState([])
  // store
  const token = useSelector(authAccessToken)
  const userId = useSelector(authUserId)
  // no param
  // no local variable

  useEffect(() => {
    getUserProjects(userId, token)
      .then(response => {
        if (response.status === 'ok') {
          setUserProjects(response.data)
        }
      })
      // .catch( error => {
      // })
  }, [userId, token])

  const _displayProjects = () => {
    return (
            <ul>
                { userProjects.map(project => <li key={project.id}><a href={project.html_url} target='_blank' rel='noreferrer'>{project.full_name}</a></li>)}
            </ul>
    )
  }

  return (
        <div className="user-projects">
        { // s'il y a des projets à afficher
            userProjects && userProjects.length > 0
              ? _displayProjects()
              : <p className="message">Il n&rsquo;y a pas de projets à afficher...</p>
        }
    </div>
  )
}

export default ViewBoardUserProject
