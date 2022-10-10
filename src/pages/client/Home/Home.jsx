import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth.js'
import Fundaciones from './Foundations.jsx'
const Home = () => {
 
  return (
    <div className='grow flex justify-center items-center'>
      <div className='container mx-auto grid gap-4  grid-cols-1 mt-3 lg:grid-cols-3'>
        <Fundaciones />
      </div>
    </div>
  )
}

export default Home