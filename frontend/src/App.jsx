import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LessonList from './components/LessonsList';
import LessonDetail from './components/LessonDetail';
import ProtectedRoute from './components/ProtectedRoute';
import UserProgress from './components/UserProgess';
import Login from './components/login';


import './App.css'

function App() {


  return (
    <>
      <Router>
        <Routes>

          <Route path="/login" element={<Login />} />

          <Route path="/lessons" element={<ProtectedRoute><LessonList /></ProtectedRoute>} />

          <Route path="/lessons/:id" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />

          <Route path="/userprogress" element={<ProtectedRoute><UserProgress /></ProtectedRoute>} />

          

        
        </Routes>
      </Router>
      

    </>
  )
}

export default App
