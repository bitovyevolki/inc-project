import { CreateNewPassword } from '@/src/entities/create-password/ui/CreateNewPassword'
import Link from 'next/link'

export default function CreatePassword() {
  return (
    <div>
      <Link href="/">back</Link>
      <CreateNewPassword />
    </div>
  )
}
