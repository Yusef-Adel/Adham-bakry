/* eslint-disable prettier/prettier */
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'
import Button from './components/Button'
import University from './pages/University'
import Departments from './pages/Departments'
import Costumes from './pages/Costumes'
import { useAuth } from './context/AuthProvider'
import Event from './pages/Event'
const Dashboard: React.FC = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col">
      <Nav />
      <div className="mx-24">
        <div className="flex items-center justify-between">
          <h1 className='text-lg'><span className='text-lg font-bold'>{user?.username}</span>👋 مرحبا</h1>
          <h1 className="py-10 pl-5 text-4xl font-semibold">لوحه التحكم</h1>
        </div>
        <div className="flex gap-2 justify-end">
          <Link to={'/dashboard/event'}>
            <Button text="الحفلات" />
          </Link>
          <Link to={'/dashboard/costumes'}>
            <Button text="الزي الرسمي" />
          </Link>
          <Link to={'/dashboard/departments'}>
            <Button text="الاقسام" />
          </Link>

          <Link to={'/dashboard/university'}>
            <Button text="الكليات" />
          </Link>
        </div>
        <div></div>
      </div>

      {/* Nested routes */}
      <Routes>
        <Route path="university" element={<University />} />
        <Route path="departments" element={<Departments  />} />
        <Route path="costumes" element={<Costumes />} />
        <Route path="event" element={<Event />} />
      </Routes>
    </div>
  )
}

export default Dashboard
