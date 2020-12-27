import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function Person(props: SvgProps) {
  return (
    <Svg
      width={40}
      height={40}
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <Path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 100-6 3 3 0 000 6z" />
    </Svg>
  )
}

export default Person
