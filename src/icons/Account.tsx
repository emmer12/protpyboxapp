import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

function Account(props: SvgProps) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 30 30"
      fill="currentColor"
      {...props}
    >
      <Path
        d="M15 .125a14.875 14.875 0 100 29.75 14.875 14.875 0 000-29.75zm0 5.313a4.781 4.781 0 11-4.781 4.78A4.772 4.772 0 0115 5.439zm8.5 19.04a12.676 12.676 0 01-17 0v-.617a5.525 5.525 0 015.313-5.674h6.374A5.535 5.535 0 0123.5 23.83v.648z"
        fillRule="evenodd"

      />
    </Svg>
  )
}

export default Account
