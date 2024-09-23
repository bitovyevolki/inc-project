import React, { ReactNode, memo } from 'react'

import { GLSL, Node, Shaders } from 'gl-react'

const shadersColors = Shaders.create({
  colorify: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
uniform sampler2D children, colorScale;
float greyscale (vec3 c) { return 0.2125 * c.r + 0.7154 * c.g + 0.0721 * c.b; }
void main() {
  vec4 original = texture2D(children, uv);
  vec4 newcolor = texture2D(colorScale, vec2(greyscale(original.rgb), 0.5));
  gl_FragColor = vec4(newcolor.rgb, original.a * newcolor.a);
}
`,
  },
})

const shadersDefault = Shaders.create({
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
  console.log('FilterItem rendered') // Этот лог покажет, когда компонент рендерится

  return (
    <>
      <Node
        shader={shadersDefault.Saturate}
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
