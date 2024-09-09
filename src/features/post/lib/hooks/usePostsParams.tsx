import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'

export const usePostsParams = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const createQueryStringHandler = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    params.set(name, value)

    return params.toString()
  }

  const removeQueryParamHandler = (param: string) => {
    const params = new URLSearchParams(searchParams)

    params.delete(param)
    router.replace({ pathname, query: params.toString() }, undefined, { shallow: true })
  }

  const changeQueryHandler = (id: number) => {
    router.push(pathname + '?' + createQueryStringHandler('postId', String(id)))
  }

  return { changeQueryHandler, removeQueryParamHandler }
}
