import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface MobileLinkListProps {
  links: SidebarLinkType[]
  pathname: string
}

interface MobileLinkProps {
  link: SidebarLinkType
  isActive: boolean
}

const MobileLink: React.FC<MobileLinkProps> = ({ link, isActive }) => {
  return (
    <li
      className={cn(
        isActive && 'gradient-text',
        'p-18 flex whitespace-nowrap text-dark-700'
      )}
    >
      <Link className="sidebar-link" href={link.route}>
        <Image src={link.icon} alt="Link Logo" width={24} height={24} />
        {link.label}
      </Link>
    </li>
  )
}

const MobileLinkList: React.FC<MobileLinkListProps> = ({ links, pathname }) => {
  return (
    <ul className="header-nav_elements">
      {links.map((link) => (
        <MobileLink
          key={link.route}
          link={link}
          isActive={link.route === pathname}
        />
      ))}
    </ul>
  )
}

export default MobileLinkList
