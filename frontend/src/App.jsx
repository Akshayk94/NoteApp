import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import AppNavbar from './components/AppNavbar'
import { Route, Routes } from 'react-router-dom'
import NotesPage from './pages/NotesPage'
import CreateNotePage from './pages/CreateNotePage'
import EditNotePage from './pages/EditNotePage'
import NoteDetailsPage from './pages/NoteDetailsPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <>
      <AppNavbar/>
      <Routes>
          <Route path="/" element={<NotesPage/>}></Route>
          <Route path="/notes/new" element={<CreateNotePage/>}></Route>
          <Route path="/notes/edit/:id" element={<EditNotePage/>}></Route>
          <Route path="/notes/:id" element={<NoteDetailsPage/>}></Route>
          <Route path="*" element={<NotFoundPage/>}></Route>
      </Routes>
    </>
  )
}

export default App
