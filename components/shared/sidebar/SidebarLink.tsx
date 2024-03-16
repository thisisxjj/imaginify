import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface SidebarLinkProps {
  link: SidebarLinkType
  isActive: boolean
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ link, isActive }) => {
  return (
    <li
      key={link.route}
      className={cn(
        'sidebar-nav_element group text-gray-700',
        isActive && 'bg-purple-gradient text-white'
      )}
    >
      <Link className="sidebar-link" href={link.route}>
        <Image
          src={link.icon}
          alt="Link Logo"
          width={24}
          height={24}
          className={cn(isActive && 'brightness-200')}
        />
        {link.label}
      </Link>
    </li>
  )
}

export default SidebarLink
