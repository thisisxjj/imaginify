'use client'

import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from '../../ui/button'
import MainLogo from '../logos/MainLogo'
import SidebarLinkList from './SidebarLinkList'
import { usePathname } from 'next/navigation'
import { navLinks } from '@/constant'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <div className="flex size-full flex-col gap-4">
        <MainLogo />

        <nav className="sidebar-nav">
          <SignedIn>
            <SidebarLinkList links={navLinks.slice(0, 6)} pathname={pathname} />
            <SidebarLinkList links={navLinks.slice(6)} pathname={pathname}>
              <li className="flex-center cursor-pointer gap-2 p-4">
                <UserButton afterSignOutUrl="/" showName />
              </li>
            </SidebarLinkList>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
