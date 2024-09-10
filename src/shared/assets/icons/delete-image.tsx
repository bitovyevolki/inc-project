import { Ref, SVGProps, forwardRef } from 'react'

const DeleteImageIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => {
  return (
    <svg
      fill={'none'}
      height={'6'}
      ref={ref}
      viewBox={'0 0 6 6'}
      width={'6'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <path
        d={
          'M3.70497 3.00009L5.85497 0.855093C5.94912 0.760941 6.00202 0.633244 6.00202 0.500093C6.00202 0.366942 5.94912 0.239245 5.85497 0.145093C5.76082 0.0509409 5.63312 -0.00195313 5.49997 -0.00195312C5.36682 -0.00195312 5.23912 0.0509409 5.14497 0.145093L2.99997 2.29509L0.85497 0.145093C0.760818 0.0509409 0.63312 -0.00195313 0.499969 -0.00195312C0.366819 -0.00195312 0.239121 0.0509409 0.144969 0.145093C0.0508176 0.239245 -0.00207639 0.366942 -0.00207639 0.500093C-0.00207639 0.633244 0.0508176 0.760941 0.144969 0.855093L2.29497 3.00009L0.144969 5.14509C0.0981053 5.19157 0.0609082 5.24687 0.0355239 5.3078C0.0101396 5.36873 -0.00292969 5.43409 -0.00292969 5.50009C-0.00292969 5.5661 0.0101396 5.63145 0.0355239 5.69238C0.0609082 5.75331 0.0981053 5.80861 0.144969 5.85509C0.191451 5.90196 0.246751 5.93915 0.307681 5.96454C0.368611 5.98992 0.433964 6.00299 0.499969 6.00299C0.565975 6.00299 0.631328 5.98992 0.692258 5.96454C0.753188 5.93915 0.808488 5.90196 0.85497 5.85509L2.99997 3.70509L5.14497 5.85509C5.19145 5.90196 5.24675 5.93915 5.30768 5.96454C5.36861 5.98992 5.43396 6.00299 5.49997 6.00299C5.56598 6.00299 5.63133 5.98992 5.69226 5.96454C5.75319 5.93915 5.80849 5.90196 5.85497 5.85509C5.90183 5.80861 5.93903 5.75331 5.96442 5.69238C5.9898 5.63145 6.00287 5.5661 6.00287 5.50009C6.00287 5.43409 5.9898 5.36873 5.96442 5.3078C5.93903 5.24687 5.90183 5.19157 5.85497 5.14509L3.70497 3.00009Z'
        }
        fill={'white'}
      />
    </svg>
  )
}

const ForwardRef = forwardRef(DeleteImageIcon)

export { ForwardRef as DeleteImageIcon }
