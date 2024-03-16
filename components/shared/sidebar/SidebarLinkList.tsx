import React from 'react'
import SidebarLink from './SidebarLink'

interface SidebarLinkListProps {
  links: SidebarLinkType[]
  pathname: string
  children?: React.ReactNode
}

const SidebarLinkList: React.FC<SidebarLinkListProps> = ({
  links,
  pathname,
  children,
}) => {
  return (
    <ul className="sidebar-nav_elements">
      {links.map((link) => (
        <SidebarLink
          key={link.route}
          link={link}
          isActive={pathname === link.route}
        />
      ))}
      {children}
    </ul>
  )
}

export default SidebarLinkList
