import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LessonList from './components/LessonsList';
import LessonDetail from './components/LessonDetail';
import ProtectedRoute from './components/ProtectedRoute';
import UserProgress from './components/UserProgess';
import Login from './components/login';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Contact from './components/Contact';
import UserProfile from './components/UserProfile';
import SearchResults from './components/SearchResults';
import Reviews from './components/Reviews';


import './App.css'


function App() {


  return (
    <>
      <Router>
        <Routes>

          <Route path="/" element={<Navigate to="/home" />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<SignUp />} />

          <Route path="/home" element={<HomePage />} />

          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/reset-password" element={<ResetPassword />} />

      

          <Route path="/lessons" element={<ProtectedRoute><LessonList /></ProtectedRoute>} />

          <Route path="/lessons/:id" element={<ProtectedRoute><LessonDetail /></ProtectedRoute>} />

          <Route path="/userprogress" element={<ProtectedRoute><UserProgress /></ProtectedRoute>} />

          <Route path="/contact" element={<Contact />} />

          <Route path="/profile" element={<ProtectedRoute><UserProfile/></ProtectedRoute>} />

          <Route path="/search" element={<SearchResults/>} />

          <Route path="/reviews" element={<Reviews/>} />

          

        
        </Routes>
      </Router>
      

    </>
  )
}

export default App
