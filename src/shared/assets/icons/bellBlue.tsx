import { type Ref, type SVGProps, forwardRef } from 'react'

const BlueBellIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="18"
    height="20"
    viewBox="0 0 18 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
  >
    <rect x="-3" y="-2" width="24" height="24" fill="#397DF6" />
  </svg>
)

const ForwardRef = forwardRef(BlueBellIcon)

export { ForwardRef as BlueBellIcon }
