import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import Layout from './components/Layout'
import Login from './pages/Login'
import Registration from './pages/Registration'
import Dasboard from './pages/Dasboard'
import BlogDetails from './pages/BlogDetails'
import DashboardLayout from './components/Layout/DashboardLayout'
import NewBlogPost from './pages/NewBlogPost'
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/blog/:slug' element={<BlogDetails />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
        </Route>
        <Route path='/dashboard' element={<DashboardLayout />} >
          <Route index element={<Dasboard />} />
          <Route path='/dashboard/new-blog' element={<NewBlogPost />} />
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App