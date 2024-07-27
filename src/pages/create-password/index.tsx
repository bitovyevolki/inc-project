import { CreateNewPassword } from '@/src/entities/create-password/ui/CreateNewPassword'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function CreatePassword() {
  return (
    <>
      <CreateNewPassword />
      <Link href="/">back</Link>
    </>
  )
}
