import { CreateNewPassword } from '@/src/features/auth/create-password'
import Link from 'next/link'

const CreatePassword = () => {
  return (
    <div>
      <Link href={'/'}>back</Link>
      <CreateNewPassword />
    </div>
  )
}

export default CreatePassword
