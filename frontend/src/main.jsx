import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements, useParams } from 'react-router-dom'
import './index.css'
import Layout from './Layout.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Chat from './pages/Chat.jsx'
import SetAvatar from './pages/SetAvatar.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='register' element={<Register/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='setAvatar' element={<SetAvatar/>}/>
      <Route path='' element={<Chat/>}/>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
