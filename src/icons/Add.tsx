import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function Add(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <Path d="M8 15A7 7 0 118 1a7 7 0 010 14zm0 1A8 8 0 108 0a8 8 0 000 16z" />
      <Path d="M8 4a.5.5 0 01.5.5v3h3a.5.5 0 010 1h-3v3a.5.5 0 01-1 0v-3h-3a.5.5 0 010-1h3v-3A.5.5 0 018 4z" />
    </Svg>
  )
}

export default Add
