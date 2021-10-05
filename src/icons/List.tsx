import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"


interface SvgRefined extends SvgProps{
  size?:number
}
function List(props: SvgRefined) {
  return (
    <Svg
      width={props.size || 24}
      height={24}
      viewBox="0 0 27 30"
      fill="currentColor"
      {...props}
    >
      <Path
        d="M2.268 16.901l9.548 11.644c.836.97 1.81 1.455 2.924 1.455.995 0 1.85-.303 2.567-.91l8.295-7.095c.796-.727 1.253-1.637 1.372-2.729.12-1.01-.179-2-.895-2.97L16.531 4.651c-1.035-1.374-2.387-2.244-4.058-2.608L4.177.104C3.382-.139 2.626.044 1.91.65l-1.015.91C.298 2.003 0 2.731 0 3.741l.477 8.672c.2 1.739.796 3.234 1.79 4.487zM3.7 2.591l8.415 2.061c.875.202 1.75.748 2.625 1.637l9.549 11.643c.318.324.418.688.298 1.092 0 .242-.179.586-.537 1.03l-8.295 7.096c-.279.242-.617.354-1.015.333-.397-.02-.696-.171-.895-.454L4.297 15.386c-.756-.97-1.134-1.961-1.134-2.972L2.566 3.5 3.7 2.59zm3.402 4.244c0 .364-.12.667-.358.91a1.205 1.205 0 01-.896.364c-.358 0-.656-.122-.895-.364a1.245 1.245 0 01-.358-.91c0-.364.12-.667.358-.91.239-.242.537-.363.895-.363.359 0 .657.12.896.364.238.242.358.545.358.91zm.656 9.036l11.697 3.76h.418c.557 0 .974-.304 1.253-.91.12-.324.1-.647-.06-.97a1.293 1.293 0 00-.716-.668l-11.697-3.76c-.318-.161-.646-.161-.984 0-.339.162-.567.405-.687.728-.238.93.02 1.537.776 1.82zm9.549 5.821c0 .526-.18.98-.537 1.365-.359.384-.816.576-1.373.576s-1.015-.192-1.373-.576a1.934 1.934 0 01-.537-1.365c0-.525.19-.98.567-1.364.378-.384.826-.576 1.343-.576s.965.192 1.343.576c.378.384.567.839.567 1.364zm-3.82-10.309c0 .526-.189.98-.567 1.365-.378.384-.825.576-1.342.576-.518 0-.965-.192-1.343-.576a1.88 1.88 0 01-.567-1.365c0-.525.179-.98.537-1.364.358-.384.816-.576 1.373-.576.556 0 1.014.192 1.372.576.358.384.537.839.537 1.364z"
        fillRule="evenodd"
       {...props}

      />
    </Svg>
  )
}

export default List
