import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      this is Home
      <div>
        <Link to="/todo">Todo</Link>
      </div>
    </div>
  )
}

export default Home
