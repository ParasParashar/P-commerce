'use client'
import { routes } from '@/lib/routes'
import React from 'react'
import NavBarItem from './NavItem'

const NavbarRoutes = () => {
  return (
    <div className=' gap-2 items-center hidden md:flex'>
       {routes.map((item:any)=>(
            <NavBarItem
            key={item.name}
            name={item.name}
            href={item.route}
            icon={item.icon}
            type='navbar'
            />
            ))}
    </div>
  )
}

export default NavbarRoutes
