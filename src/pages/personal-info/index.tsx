// // import { Profile } from '@/src/entities/profile'
// import { Inter } from 'next/font/google'

import Link from 'next/link'

// const inter = Inter({ subsets: ['latin'] })

// export default function PersonalInfo() {
//   return <Profile />
// }

import React from 'react'

const PersonalInfo = () => {
  return (
    <div>
      <Link href={'/'}>back</Link>
      {/* <CreateNewPassword /> */}
    </div>
  )
}

export default PersonalInfo
