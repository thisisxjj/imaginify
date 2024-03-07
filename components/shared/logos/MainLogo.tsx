import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MainLogo = () => {
  return (
    <Link className="sidebar-logo" href="/">
      <Image
        src="/assets/images/logo-text.svg"
        width={180}
        height={28}
        alt="Logo"
      />
    </Link>
  )
}

export default MainLogo
