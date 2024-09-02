import { Ref, SVGProps, forwardRef } from 'react'

const ArrowLeftIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      fill={'none'}
      height={16}
      ref={ref}
      width={16}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={'url(#a)'}>
        <path d={'m10.3 11-3-3 3-3-1-1-4 4 4 4 1-1Z'} fill={'currentColor'} />
      </g>
      <defs>
        <clipPath id={'a'}>
          <path d={'M0 0h16v16H0z'} fill={'var(--light-100)'} />
        </clipPath>
      </defs>
    </svg>
  )
}

const ForwardRef = forwardRef(ArrowLeftIcon)

export { ForwardRef as ArrowLeftIcon }
