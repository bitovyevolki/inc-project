import { Ref, SVGProps, forwardRef } from 'react'

const EllipsisIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  const { fill = 'white', ...restProps } = props

  return (
    <svg
      ref={ref}
      width={'24'}
      {...restProps}
      fill={'none'}
      height={'24'}
      viewBox={'0 0 24 24'}
      xmlns={'http://www.w3.org/2000/svg'}
    >
      <g clipPath={'url(#clip0_309_4556)'}>
        <path
          d={
            'M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z'
          }
          fill={fill}
        />
        <path
          d={
            'M19 14C20.1046 14 21 13.1046 21 12C21 10.8954 20.1046 10 19 10C17.8954 10 17 10.8954 17 12C17 13.1046 17.8954 14 19 14Z'
          }
          fill={fill}
        />
        <path
          d={
            'M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14Z'
          }
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id={'clip0_309_4556'}>
          <rect fill={'white'} height={'24'} width={'24'} />
        </clipPath>
      </defs>
    </svg>
  )
}

const ForwardRef = forwardRef(EllipsisIcon)

export { ForwardRef as EllipsisIcon }
