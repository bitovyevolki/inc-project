import React, { ReactNode, memo } from 'react'

import { GLSL, Node, Shaders } from 'gl-react'

const shaders = Shaders.create({
  Saturate: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D t;
uniform float contrast, saturation, brightness;
const vec3 L = vec3(0.2125, 0.7154, 0.0721);
void main() {
  vec4 c = texture2D(t, uv);
	vec3 brt = c.rgb * brightness;
	gl_FragColor = vec4(mix(
    vec3(0.5),
    mix(vec3(dot(brt, L)), brt, saturation),
    contrast), c.a);
}
`,
  },
})

type Option = {
  brightness: number
  contrast: number
  saturation: number
}

type Props = {
  children: ReactNode
  option: Option
}

export const FilterItem = memo(function FilterItem({ children, option }: Props) {
  return (
    <>
      <Node
        shader={shaders.Saturate}
        uniforms={{
          brightness: option.brightness,
          contrast: option.contrast,
          saturation: option.saturation,
          t: children,
        }}
      />
    </>
  )
})
