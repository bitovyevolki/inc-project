import { type Ref, type SVGProps, forwardRef } from 'react'

const BlueBellIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'currentColor'}
    height={'24px'}
    ref={ref}
    viewBox={'0 0 24 24'}
    width={'24px'}
    {...props}
  >
    <rect x="-3" y="-2" width="24" height="24" fill="#397DF6" />
  </svg>
)

const ForwardRef = forwardRef(BlueBellIcon)

export { ForwardRef as BlueBellIcon }
