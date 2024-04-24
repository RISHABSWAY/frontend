import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaUsers } from "react-icons/fa";
import { BsChatSquareDots } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";


const Admin = () => {
  return (
    <>
    <header>
      <div className="container">
        <nav>
          <ul>
            <li><NavLink to='/admin/users'><FaUsers/>Users</NavLink></li>
            <li> <NavLink to='/admin/chats'><BsChatSquareDots/>chats</NavLink></li>
            <li><NavLink to='/admin/messages'><TiMessages/>messages</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
    <Outlet/>
    </>
  )
}

export default Admin