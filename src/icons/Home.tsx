import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function Home(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 29 27"
      fill="currentColor"
      {...props}
    >
      <Path
        d="M28.4 13.279L15.224.296A1.021 1.021 0 0014.5 0a1.034 1.034 0 00-.723.296L.6 13.279A2.008 2.008 0 000 14.708c0 1.113.918 2.018 2.047 2.018h1.389v9.265c0 .558.457 1.009 1.023 1.009h7.994v-7.066h3.583V27h8.506c.566 0 1.024-.451 1.024-1.01v-9.264h1.388c.544 0 1.065-.21 1.449-.593a2.001 2.001 0 00-.003-2.854z"
        fillRule="evenodd"
        {...props}
      />
    </Svg>

  )
}

export default Home
