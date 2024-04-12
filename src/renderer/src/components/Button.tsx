/* eslint-disable prettier/prettier */
import React from 'react'

interface ButtonProps {
  text: string
  icon?: JSX.Element // Define the icon prop
  onClick?: () => void // Define the onClick prop
}

const Button: React.FC<ButtonProps> = ({ text, icon, onClick }) => {
  return (
    <div>
      <a
        className="rounded-md flex gap-2  bg-transparent border border-blue-500 text-blue-500 hover:bg-gray-600 hover:border-none hover:text-white font-bold px-4 py-2   "
        href="#"
        onClick={onClick}
      >
        {icon && <span className="">{icon}</span>} {/* Render the icon if provided */}
        {text}
      </a>
    </div>
  )
}

export default Button
