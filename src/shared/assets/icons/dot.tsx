import { Ref, SVGProps, forwardRef } from 'react'

const DotIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      fill={'none'}
      height={'4'}
      ref={ref}
      viewBox={'0 0 4 4'}
      width={'4'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <circle cx={'2'} cy={'2'} fill={'white'} r={'2'} />
    </svg>
  )
}

const ForwardRef = forwardRef(DotIcon)

export { ForwardRef as DotIcon }
