'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import MainLogo from '../logos/MainLogo'
import MobileLinkList from './MobileLinkList'
import { navLinks } from '@/constant'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <header className="header">
      <MainLogo />
      <nav className="flex gap-2">
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="Menu"
                width={32}
                height={32}
                className="cursor-pointer"
              />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64">
              <>
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="Logo"
                  width={152}
                  height={23}
                />
                <MobileLinkList links={navLinks} pathname={pathname} />
              </>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <Button asChild className="button bg-purple-gradient bg-cover">
            <Link href="/sign-in">Login</Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  )
}

export default MobileNav
