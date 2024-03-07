import React from 'react'
import Sidebar from '@/components/shared/sidebar/Sidebar'
import MobileNav from '@/components/shared/mobile-nav/MobileNav'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="root">
      <Sidebar />
      <MobileNav />
      <div className="root-container">
        <div className="wrapper">{children}</div>
      </div>
    </main>
  )
}

export default Layout
