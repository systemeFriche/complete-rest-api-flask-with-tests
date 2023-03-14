import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { authAccessToken } from '../../store/reducer/authSlice'

// import { useHook } from '../../misc/useHook'
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import Board from '../Board/Board'
import NewUser from '../User/NewUser'
import User from '../User/User'
import Login from '../Auth/Login'

import './App.css'

// TODO : faire gérer les erreurs et le loading via le store ?
// TODO : dans la réponse des requêtes status = ok ou nok, si ok champ data si nok champ error et ce message qui sera ensuite affichée
// TODO : créer un composant erreur pour afficher le retour erreur
// TODO : gérer un loader avec transparence et petite roue qui tourne plutôt que message en rouge qui s'affiche
// TODO : remettre à plat gestion des codes HTTP (pb isOK ne permet pas d'avoir de la finesse dans le retour erreur en fonction des différents cas)
// TODO : chercher la mise à jour du store via websocket, store gère socket

const App = () => {
  // no prop
  // no state
  // store
  const token = useSelector(authAccessToken) // token = "xxxx"
  // no param
  // local variables
  const isConnected = token !== ''
  // const data = useHook();
  // console.log(data);

  return (
    <div className="root-content">
    <Router>
      { isConnected && <NavBar /> }
      <Routes>
          <Route exact path="/" element={ isConnected ? <Home /> : <Login /> } />
          <Route exact path="/board" element={ isConnected ? <Board /> : <Login /> } />
          <Route exact path="/newUser" element={ isConnected ? <NewUser /> : <Login /> } />
          <Route exact path="/user/:id" element={ isConnected ? <User /> : <Login /> } />
      </Routes>
    </Router>
    </div>
  )
}

export default App
