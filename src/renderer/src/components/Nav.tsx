/* eslint-disable prettier/prettier */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useAuth } from '@renderer/context/AuthProvider'

const Nav: React.FC = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()
  return (
    <div>
      <nav className="bg-black flex px-8 justify-between p-4 text-white text-2xl">
        <div>
          <a
            className="flex items-center gap-4 cursor-pointer"
            onClick={() => {
              logout()
              navigate('/')
            }}
          >
            {' '}
            <ArrowLeft /> تسجيل الخروج
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Link to={'/reservation'}>
            <div>اداره الحجوزات</div>
          </Link>
          <Link to={'/dashboard'}>
            <div>لوحه التحكم</div>
          </Link>
        </div>
      </nav>
    </div>
  )
}

export default Nav
