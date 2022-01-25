import { Dimensions } from "react-native";
import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const { width, height } = Dimensions.get("window");

const SvgComponent = (props: any) => (
  <Svg
    width={width }
    height={height * 0.6}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        d="m296.673 299.237-23.899-11.724v-10.078l8.517-.053c1.322-.008 2.608-.477 3.678-1.339 1.07-.863 1.87-2.077 2.288-3.471l5.983-19.957a7.788 7.788 0 0 0 .253-3.285 7.484 7.484 0 0 0-1.122-3.052 6.564 6.564 0 0 0-2.249-2.149 5.82 5.82 0 0 0-2.883-.773h-14.465v-9.378h18.159c1.432 0 2.821-.54 3.941-1.531 1.119-.992 1.904-2.376 2.224-3.927l4.121-19.929a7.814 7.814 0 0 0 .004-3.133 7.398 7.398 0 0 0-1.22-2.824 6.499 6.499 0 0 0-2.202-1.955 5.797 5.797 0 0 0-2.747-.698h-22.28v-2.345c0-.616-.109-1.225-.321-1.794a4.757 4.757 0 0 0-.914-1.522 4.217 4.217 0 0 0-1.368-1.016 3.848 3.848 0 0 0-1.614-.357c-.554 0-1.102.121-1.614.357a4.227 4.227 0 0 0-1.368 1.016 4.757 4.757 0 0 0-.914 1.522 5.144 5.144 0 0 0-.321 1.794v2.345H114.974v-2.345c0-1.243-.444-2.436-1.235-3.316-.791-.879-1.864-1.373-2.982-1.373-1.119 0-2.191.494-2.982 1.373-.791.88-1.236 2.073-1.236 3.316v2.345h-17.71c-.951 0-1.89.238-2.747.698a6.486 6.486 0 0 0-2.202 1.955 7.386 7.386 0 0 0-1.22 2.824 7.802 7.802 0 0 0 .004 3.133l4.12 19.929c.32 1.551 1.105 2.935 2.225 3.927 1.12.991 2.509 1.531 3.94 1.531h13.59v9.378h-9.896c-.997 0-1.98.262-2.868.765a6.564 6.564 0 0 0-2.245 2.128 7.48 7.48 0 0 0-1.133 3.028 7.792 7.792 0 0 0 .225 3.271l6.107 21.072c.412 1.423 1.222 2.663 2.311 3.54 1.089.877 2.401 1.345 3.746 1.337l3.753-.024v9.04l-19.33 11.724c-.83 0-1.653.182-2.42.535a6.339 6.339 0 0 0-2.052 1.525 7.125 7.125 0 0 0-1.372 2.282 7.72 7.72 0 0 0-.481 2.691c0 1.866.666 3.655 1.853 4.974 1.186 1.319 2.795 2.06 4.473 2.06h19.329v51.582c0 1.244.445 2.436 1.236 3.316.791.879 1.863 1.373 2.982 1.373 1.118 0 2.191-.494 2.982-1.373.791-.88 1.235-2.072 1.235-3.316v-51.582H264.34v51.582c0 1.244.444 2.436 1.235 3.316.791.879 1.864 1.373 2.982 1.373 1.119 0 2.191-.494 2.982-1.373.791-.88 1.235-2.072 1.235-3.316v-51.582h23.899c1.678 0 3.287-.741 4.473-2.06s1.853-3.108 1.853-4.974c0-.923-.164-1.838-.482-2.691a7.097 7.097 0 0 0-1.371-2.282 6.337 6.337 0 0 0-2.052-1.525 5.787 5.787 0 0 0-2.421-.535Zm-181.699-65.259H264.34v9.378H114.974v-9.378Zm0 53.535v-9.092l149.366-.933v10.025H114.974Z"
        fill="#E6E6E6"
      />
      <Path
        d="M279.392 299.203c2.628-23.489 15.72-46.632 35.867-54.276-7.945 24.176-7.944 50.699.005 74.874 3.096 9.311 7.411 19.309 4.499 28.693-1.812 5.84-6.244 10.307-11.199 13.1-4.955 2.794-10.453 4.125-15.884 5.43l-1.068.983c-8.62-21.643-14.847-45.315-12.22-68.804Z"
        fill="#E6E6E6"
      />
      <Path
        d="M315.459 245.371c-11.613 14.459-19.147 33.137-20.841 52.461-.366 4.177-.411 8.45.411 12.568.821 4.12 2.611 7.577 5.15 10.679 2.321 2.835 4.99 5.437 6.651 8.85 1.751 3.599 1.818 7.687.62 11.509-1.467 4.676-4.357 8.487-7.299 12.105-3.268 4.018-6.719 8.133-8.108 13.459-.168.645-1.059.317-.891-.327 2.417-9.266 10.507-14.53 14.365-22.875 1.8-3.895 2.555-8.416.868-12.527-1.476-3.594-4.227-6.28-6.6-9.128-2.491-2.991-4.401-6.273-5.385-10.233-1.006-4.051-1.112-8.335-.844-12.505.673-9.45 2.677-18.724 5.941-27.482 3.674-10.018 8.863-19.264 15.341-27.337.402-.499 1.02.286.621.783Z"
        fill="#fff"
      />
      <Path
        d="M294.871 291.518c-2.9-.782-5.454-2.685-7.208-5.369-1.754-2.684-2.593-5.973-2.366-9.281.047-.669.985-.618.937.052-.216 3.08.566 6.144 2.204 8.639 1.637 2.496 4.023 4.258 6.727 4.969.587.155.29 1.145-.294.99ZM298.831 319.813c5.237-3.476 9.102-9.019 10.826-15.524.171-.645 1.061-.317.891.327-1.805 6.765-5.838 12.525-11.295 16.129-.52.343-.939-.59-.422-.932ZM304.042 262.895a6.502 6.502 0 0 0 3.416.756 6.615 6.615 0 0 0 3.331-1.137c.516-.35.934.584.422.932a7.425 7.425 0 0 1-3.683 1.252 7.306 7.306 0 0 1-3.781-.812.508.508 0 0 1-.266-.264.596.596 0 0 1-.032-.395.517.517 0 0 1 .235-.302.428.428 0 0 1 .358-.03Z"
        fill="#fff"
      />
      <Path
        d="M376.671 286.881a78.8 78.8 0 0 0-.951.695 95.97 95.97 0 0 0-11.988 10.407c-.293.291-.586.59-.871.89-8.913 9.32-16.192 20.399-21.467 32.674a114.083 114.083 0 0 0-5.258 15.126c-1.941 7.158-3.532 15.091-7.373 20.946a17.98 17.98 0 0 1-1.283 1.761h-34.707c-.079-.044-.158-.079-.237-.123l-1.386.07c.055-.273.119-.555.174-.827.032-.159.071-.317.103-.476.024-.106.048-.211.063-.308.008-.035.016-.071.024-.097.016-.097.04-.185.056-.273.348-1.576.707-3.152 1.077-4.728 0-.009 0-.009.007-.018 2.843-12 6.612-23.842 11.878-34.672.159-.326.317-.66.491-.986a103.5 103.5 0 0 1 8.228-13.876 88.044 88.044 0 0 1 5.392-6.859c4.921-5.632 10.607-10.368 16.851-14.035 12.448-7.307 26.86-10.107 40.163-5.643.341.114.674.229 1.014.352Z"
        fill="#E6E6E6"
      />
      <Path
        d="M376.593 287.371c-17.102 3.77-33.232 13.64-45.047 27.935-2.555 3.09-4.904 6.473-6.478 10.31-1.575 3.84-2.018 7.798-1.671 11.974.318 3.818 1.041 7.682.519 11.52-.551 4.044-2.711 7.354-5.737 9.603-3.703 2.752-8.074 3.86-12.383 4.779-4.784 1.021-9.768 1.996-13.761 5.319-.483.402-1.017-.456-.534-.858 6.947-5.781 16.256-4.567 23.855-8.648 3.547-1.905 6.598-5.009 7.476-9.421.769-3.858.026-7.844-.326-11.706-.369-4.056-.117-7.955 1.241-11.775 1.39-3.909 3.625-7.4 6.098-10.55 5.654-7.095 12.276-13.158 19.624-17.966 8.358-5.539 17.508-9.448 27.052-11.557.591-.13.659.911.072 1.041Z"
        fill="#fff"
      />
      <Path
        d="M335.166 310.434c-1.891-2.565-2.901-5.795-2.848-9.112.053-3.316 1.165-6.504 3.136-8.994.401-.502 1.121.166.72.669-1.84 2.315-2.875 5.284-2.918 8.373-.044 3.089.907 6.093 2.681 8.47.385.517-.388 1.108-.771.594ZM323.007 335.678c6.063.729 12.151-1.109 17.05-5.148.485-.401 1.019.457.534.857-5.105 4.193-11.443 6.092-17.752 5.317-.601-.074-.43-1.1.168-1.026ZM357.987 293.719a7.702 7.702 0 0 0 2.319 2.891 6.678 6.678 0 0 0 3.275 1.322c.601.066.43 1.092-.168 1.027a7.504 7.504 0 0 1-3.618-1.466 8.62 8.62 0 0 1-2.579-3.18.587.587 0 0 1-.07-.388.55.55 0 0 1 .189-.337.435.435 0 0 1 .35-.084.469.469 0 0 1 .302.215Z"
        fill="#fff"
      />
      <Path
        d="M45.147 320.061c1.847-16.508 11.048-32.773 25.207-38.145-5.584 16.991-5.583 35.631.003 52.621 2.176 6.544 5.209 13.57 3.162 20.165-1.273 4.104-4.388 7.243-7.87 9.206-3.483 1.964-7.347 2.899-11.163 3.816l-.751.691c-6.058-15.21-10.434-31.846-8.588-48.354Z"
        fill="#E6E6E6"
      />
      <Path
        d="M70.494 282.228c-8.245 10.273-13.37 23.173-14.646 36.869-.258 2.936-.289 5.939.288 8.833.582 2.816 1.832 5.407 3.62 7.505 1.63 1.992 3.507 3.821 4.674 6.22 1.23 2.529 1.278 5.402.435 8.088-1.03 3.286-3.061 5.965-5.13 8.507-2.295 2.824-4.72 5.716-5.697 9.459-.118.453-.744.222-.626-.23 1.698-6.512 7.383-10.211 10.095-16.076 1.265-2.737 1.796-5.915.61-8.804-1.037-2.526-2.97-4.413-4.638-6.415-1.75-2.102-3.093-4.408-3.785-7.191-.707-2.847-.781-5.858-.593-8.789a69.491 69.491 0 0 1 4.175-19.314c2.582-7.04 6.229-13.538 10.782-19.211.282-.351.716.201.436.549Z"
        fill="#fff"
      />
      <Path
        d="M56.025 314.66c-2.037-.55-3.833-1.887-5.065-3.773-1.233-1.886-1.822-4.198-1.663-6.523.033-.47.692-.434.658.037-.151 2.164.398 4.318 1.549 6.071 1.15 1.754 2.828 2.992 4.728 3.492.413.109.203.805-.207.696ZM58.809 334.545c3.68-2.443 6.396-6.338 7.608-10.91.12-.453.745-.222.626.23-1.269 4.755-4.103 8.802-7.938 11.335-.365.241-.66-.415-.296-.655ZM62.47 294.544a4.578 4.578 0 0 0 2.401.532 4.66 4.66 0 0 0 2.34-.799c.364-.247.658.41.297.654a5.21 5.21 0 0 1-2.587.88 5.118 5.118 0 0 1-2.658-.571.354.354 0 0 1-.187-.185.418.418 0 0 1-.022-.278.356.356 0 0 1 .165-.211.3.3 0 0 1 .251-.022Z"
        fill="#fff"
      />
      <Path
        d="M113.513 311.401c-.223.161-.445.322-.668.489a67.292 67.292 0 0 0-8.425 7.314c-.206.204-.412.414-.613.625-6.263 6.55-11.379 14.336-15.087 22.962a80.325 80.325 0 0 0-3.695 10.631c-1.363 5.03-2.482 10.606-5.18 14.72-.278.433-.58.847-.903 1.238H54.551c-.056-.031-.111-.056-.167-.087l-.974.05c.04-.192.084-.39.123-.582.022-.111.05-.223.072-.334.017-.074.033-.148.045-.216.005-.025.01-.05.016-.069.011-.068.028-.13.04-.191.244-1.108.496-2.216.756-3.323 0-.006 0-.006.005-.013 1.998-8.433 4.647-16.756 8.348-24.367.111-.229.223-.464.345-.693a72.78 72.78 0 0 1 5.782-9.752 61.838 61.838 0 0 1 3.79-4.82c3.458-3.958 7.454-7.286 11.843-9.863 8.748-5.136 18.876-7.104 28.226-3.966.239.08.473.16.712.247Z"
        fill="#E6E6E6"
      />
      <Path
        d="M113.458 311.745c-12.146 2.683-23.223 9.552-31.658 19.633-1.796 2.172-3.447 4.549-4.553 7.246a17.809 17.809 0 0 0-1.174 8.415c.224 2.683.732 5.399.365 8.095-.388 2.843-1.906 5.169-4.032 6.749-2.603 1.934-5.675 2.714-8.703 3.359-3.362.717-6.864 1.403-9.67 3.738-.34.283-.715-.32-.376-.603 4.882-4.062 11.424-3.21 16.765-6.078 2.492-1.338 4.637-3.519 5.254-6.62.54-2.712.018-5.513-.23-8.227-.259-2.851-.082-5.591.873-8.276.977-2.746 2.548-5.2 4.285-7.414 3.974-4.986 8.628-9.247 13.792-12.626 5.874-3.893 12.304-6.64 19.011-8.122.415-.091.463.64.051.731Z"
        fill="#fff"
      />
      <Path
        d="M84.344 327.954c-1.33-1.803-2.038-4.073-2.001-6.404.037-2.331.818-4.571 2.203-6.321.282-.353.788.117.506.47-1.292 1.627-2.02 3.714-2.05 5.885-.031 2.17.637 4.282 1.884 5.953.27.363-.273.778-.542.417ZM75.799 345.695c4.261.512 8.54-.779 11.982-3.618.341-.282.716.321.376.602-3.588 2.947-8.043 4.281-12.476 3.737-.422-.052-.302-.773.118-.721ZM100.382 316.207a5.422 5.422 0 0 0 1.63 2.032 4.697 4.697 0 0 0 2.301.929c.423.046.303.767-.118.721a5.262 5.262 0 0 1-2.542-1.03 6.054 6.054 0 0 1-1.813-2.234.416.416 0 0 1-.049-.274.386.386 0 0 1 .133-.236.306.306 0 0 1 .246-.059.33.33 0 0 1 .212.151Z"
        fill="#fff"
      />
      <Path
        d="m166.76 360.66-6.287 2.023-10.008-26.002 9.28-2.985 7.015 26.964Z"
        fill="#9E616A"
      />
      <Path
        d="m181.796 266.43-6.486 7.693s-34.161 16.828-34.161 25.483c0 8.654 8.216 46.157 11.675 49.042 2.084 1.747 1.142 3.629 2.176 6.293l12.094-4.851s-.865-2.885 0-4.327c.865-1.442 0-2.404 0-2.404s-1.297.481-.865-.962c.433-1.442.433-1.923 0-2.404-.432-.48-1.73-4.808-1.73-4.808s.433-17.309-5.621-23.559c0 0 28.107-9.135 31.567-15.386 3.459-6.25 4.324-28.848 4.324-28.848l-12.973-.962ZM169.323 364.646l-20.95 4.807-.054-.294c-.447-2.405-.016-4.908 1.198-6.959 1.214-2.052 3.11-3.483 5.273-3.979v-.001l3.228-4.106 7.739 1.59 1.829-.42 1.737 9.362Z"
        fill="#2F2E41"
      />
      <Path
        d="m189.632 331.457-8.023 5.981 16.645 21.386 5.436-4.053-14.058-23.314Z"
        fill="#9E616A"
      />
      <Path
        d="M201.616 253.177c-4.285-10.047 8.778 19.661 7.048 28.862-1.35 7.184-26.575 30.057-26.575 30.057 7.601 3.601 12.467 20.049 12.467 20.049s2.539 3.583 3.093 3.873c.553.289.699.742.732 2.261.033 1.52 1.107.579 1.107.579s1.106.579.732 2.262c-.374 1.683 1.319 4.072 1.319 4.072l-9.35 9.691c-1.785-2.117-2.023-4.814-4.516-5.673-4.134-1.412-23.29-33.602-25.927-41.745-2.637-8.143 24.378-36.843 24.378-36.843l2.294-14.205 13.198-3.24ZM206.431 361.943 186.304 370l-.092-.283c-.748-2.31-.64-4.856.3-7.078.94-2.221 2.636-3.937 4.713-4.768l.001-.001 2.672-4.573 7.864.356 1.757-.703 2.912 8.993Z"
        fill="#2F2E41"
      />
      <Path
        d="m186.278 205.185-5.826 4.933-15.477 4.557s5.546 43.275 2.928 46.185c-2.617 2.91-.256 2.988-.782 6.769-.526 3.78-1.805 11.53-1.805 11.53 17.668 10.398 32.899 10.677 45.133-1.491a3.73 3.73 0 0 0-.225-2.237c-.303-.696-.81-1.256-1.438-1.587-2.277-1.343 2.099-7.613.239-8.662-1.861-1.048.756-10.142.756-10.142l5.672-29.775-15.087-13.125-2.294-6.147-11.794-.808Z"
        fill="#5895F9"
      />
      <Path
        d="M193.548 243.855c1.113 0 2.016-1.004 2.016-2.242s-.903-2.241-2.016-2.241c-1.114 0-2.016 1.003-2.016 2.241 0 1.238.902 2.242 2.016 2.242Z"
        fill="#F2F2F2"
      />
      <Path
        d="M192.242 202.439c6.365 0 11.525-5.737 11.525-12.813 0-7.077-5.16-12.814-11.525-12.814-6.364 0-11.524 5.737-11.524 12.814 0 7.076 5.16 12.813 11.524 12.813Z"
        fill="#9E616A"
      />
      <Path
        opacity={0.1}
        d="m209.024 239.826 1.905 1.588.953-7.413-2.858 5.825Z"
        fill="#000"
      />
      <Path
        d="M165.888 214.633s-2.381-.53-3.81 4.236c-1.428 4.765-8.599 29.859-8.599 33.036 0 3.177 34.555 10.103 34.555 10.103l-3.395-13.24-15.696-5.46-3.055-28.675Z"
        fill="#5895F9"
      />
      <Path
        d="M189.547 260.045c3.072 0 5.562-2.768 5.562-6.184 0-3.415-2.49-6.184-5.562-6.184s-5.562 2.769-5.562 6.184c0 3.416 2.49 6.184 5.562 6.184Z"
        fill="#9E616A"
      />
      <Path
        opacity={0.1}
        d="m169.965 237.007.436 6.558 13.816 8.064-12.289-9.166-1.963-5.456Z"
        fill="#000"
      />
      <Path
        d="M202.478 234.425h-.18v-5.46c0-.415-.073-.826-.216-1.209a3.204 3.204 0 0 0-.616-1.025 2.836 2.836 0 0 0-.922-.685 2.593 2.593 0 0 0-1.088-.241h-10.403c-.373 0-.742.082-1.087.241a2.836 2.836 0 0 0-.922.685 3.194 3.194 0 0 0-.616 1.025 3.463 3.463 0 0 0-.217 1.209v29.952c0 .415.074.826.217 1.209.143.384.352.732.616 1.025.264.294.577.527.922.685.345.159.714.241 1.087.241h10.403c.374 0 .743-.082 1.088-.241.345-.158.658-.391.922-.685.264-.293.473-.641.616-1.025.143-.383.216-.794.216-1.209v-20.606h.18v-3.886Z"
        fill="#F0F0F0"
      />
      <Path
        d="M215.453 225.265s1.429 1.059 2.381 5.824c.953 4.766 7.143 22.768 4.762 27.004-2.381 4.236-3.084 8.757-11.179 2.403l-11.202-11.404 8.095-8.472 3.334 2.647 3.809-18.002ZM194.382 239.155c1.315 0 2.381-1.185 2.381-2.648 0-1.462-1.066-2.647-2.381-2.647-1.315 0-2.381 1.185-2.381 2.647 0 1.463 1.066 2.648 2.381 2.648Z"
        fill="#5895F9"
      />
      <Path
        d="M201.275 248.492c3.071 0 5.562-2.769 5.562-6.185 0-3.415-2.491-6.184-5.562-6.184-3.072 0-5.562 2.769-5.562 6.184 0 3.416 2.49 6.185 5.562 6.185Z"
        fill="#9E616A"
      />
      <Path
        opacity={0.1}
        d="m168.045 257.712 17.161 3.573-16.708.713-.453-4.286Z"
        fill="#000"
      />
      <Path
        d="M202.389 181.161s3.001-6.378-3.6-6.958c0 0-5.628-5.676-11.364-1.038 0 0-3.129 0-4.84 3.937 0 0-2.461-1.038-3.002 1.739 0 0-1.8 5.798 0 11.017 1.801 5.218 2.399 5.798 2.399 5.798s-1.263-6.476 5.939-7.056c7.202-.579 13.809-5.596 14.409.782.6 6.378 1.26 3.497 1.26 3.497s5.701-9.109-1.201-11.718Z"
        fill="#2F2E41"
      />
      <Path
        d="M314.321 167.4h-93.295c-1.431 0-2.802.631-3.814 1.756-1.011 1.124-1.579 2.65-1.579 4.24v24.948c0 1.591.568 3.116 1.579 4.24 1.012 1.125 2.383 1.757 3.814 1.757h1.369v4.507c0 .273.073.541.21.768.136.228.33.405.558.509.227.105.477.133.718.079.242-.053.463-.185.637-.378l4.933-5.485h84.87c1.43 0 2.802-.632 3.813-1.757 1.012-1.124 1.58-2.649 1.58-4.24v-24.948a6.59 6.59 0 0 0-.411-2.295 6.082 6.082 0 0 0-1.169-1.945 5.38 5.38 0 0 0-1.749-1.3 4.935 4.935 0 0 0-2.064-.456Z"
        fill="#3F3D56"
      />
      <Path
        d="M314.321 201.298h-93.295c-.705-.001-1.38-.313-1.878-.866a3.136 3.136 0 0 1-.779-2.088v-24.948a3.131 3.131 0 0 1 .779-2.087c.498-.554 1.173-.866 1.878-.866h70.857c6.653.008 13.032 2.95 17.736 8.181 4.704 5.231 7.351 12.323 7.358 19.72a3.136 3.136 0 0 1-.779 2.088c-.498.553-1.173.865-1.877.866Z"
        fill="#fff"
      />
      <Path
        d="M287.709 175.899h-39.876c-.842 0-1.525.759-1.525 1.696v.532c0 .936.683 1.695 1.525 1.695h39.876c.843 0 1.525-.759 1.525-1.695v-.532c0-.937-.682-1.696-1.525-1.696Z"
        fill="#5895F9"
      />
      <Path
        d="M296.089 183.745h-56.635c-.842 0-1.525.759-1.525 1.696v.532c0 .936.683 1.695 1.525 1.695h56.635c.842 0 1.525-.759 1.525-1.695v-.532c0-.937-.683-1.696-1.525-1.696ZM296.089 191.591h-56.635c-.842 0-1.525.759-1.525 1.696v.531c0 .937.683 1.696 1.525 1.696h56.635c.842 0 1.525-.759 1.525-1.696v-.531c0-.937-.683-1.696-1.525-1.696Z"
        fill="#E6E6E6"
      />
      <Path
        d="M372.796 87h-72.72c-.552 0-1.098.12-1.608.356-.51.235-.974.579-1.364 1.013-.39.434-.7.95-.911 1.516a5.115 5.115 0 0 0-.32 1.789v19.446c0 .614.108 1.222.32 1.789a4.74 4.74 0 0 0 .911 1.516c.39.434.854.778 1.364 1.013.51.235 1.056.356 1.608.356h1.068v3.513c0 .214.056.422.163.599a1 1 0 0 0 .435.397.88.88 0 0 0 .56.062.955.955 0 0 0 .497-.295l3.845-4.276h66.152a3.84 3.84 0 0 0 1.609-.356c.51-.235.973-.579 1.364-1.013.39-.434.7-.949.911-1.516.211-.567.32-1.175.32-1.789V91.674c0-.614-.109-1.222-.32-1.789a4.74 4.74 0 0 0-.911-1.516 4.213 4.213 0 0 0-1.364-1.013 3.841 3.841 0 0 0-1.609-.356Z"
        fill="#F2F2F2"
      />
      <Path
        d="M372.796 113.422h-72.72a1.968 1.968 0 0 1-1.463-.675 2.437 2.437 0 0 1-.607-1.627V91.674c0-.61.219-1.196.607-1.627a1.972 1.972 0 0 1 1.463-.675h55.231c5.186.006 10.158 2.3 13.825 6.377 3.666 4.077 5.729 9.605 5.735 15.371a2.442 2.442 0 0 1-.607 1.627 1.97 1.97 0 0 1-1.464.675Z"
        fill="#fff"
      />
      <Path
        d="M351.867 93.625h-30.709c-.759 0-1.375.685-1.375 1.53 0 .844.616 1.528 1.375 1.528h30.709c.76 0 1.375-.684 1.375-1.529 0-.844-.615-1.529-1.375-1.529ZM358.399 99.74h-43.772c-.76 0-1.375.685-1.375 1.53 0 .844.615 1.529 1.375 1.529h43.772c.759 0 1.375-.685 1.375-1.529 0-.845-.616-1.53-1.375-1.53ZM358.399 105.856h-43.772c-.76 0-1.375.685-1.375 1.529 0 .845.615 1.529 1.375 1.529h43.772c.759 0 1.375-.684 1.375-1.529 0-.844-.616-1.529-1.375-1.529ZM210.117 119.043h72.721c.552 0 1.098.121 1.608.356s.974.579 1.364 1.013c.39.434.7.949.911 1.517a5.11 5.11 0 0 1 .32 1.788v19.446c0 .614-.108 1.222-.32 1.789a4.74 4.74 0 0 1-.911 1.516c-.39.434-.854.779-1.364 1.014a3.85 3.85 0 0 1-1.608.355h-1.068v3.514c0 .213-.057.421-.163.598a.995.995 0 0 1-.435.397.88.88 0 0 1-.56.062.948.948 0 0 1-.497-.295l-3.845-4.276h-66.153a3.85 3.85 0 0 1-1.608-.355 4.206 4.206 0 0 1-1.364-1.014 4.74 4.74 0 0 1-.911-1.516 5.138 5.138 0 0 1-.32-1.789v-19.446c0-.614.109-1.221.32-1.788a4.733 4.733 0 0 1 .911-1.517c.39-.434.854-.778 1.364-1.013a3.835 3.835 0 0 1 1.608-.356Z"
        fill="#F2F2F2"
      />
      <Path
        d="M208.047 143.163c.006-5.766 2.068-11.294 5.735-15.371 3.667-4.077 8.639-6.37 13.825-6.377h55.231a1.975 1.975 0 0 1 1.463.675c.388.432.606 1.017.607 1.627v19.446a2.442 2.442 0 0 1-.607 1.627 1.968 1.968 0 0 1-1.463.675h-72.721a1.97 1.97 0 0 1-1.463-.675 2.442 2.442 0 0 1-.607-1.627Z"
        fill="#fff"
      />
      <Path
        d="M231.047 128.726h30.709c.759 0 1.375-.684 1.375-1.529 0-.844-.616-1.529-1.375-1.529h-30.709c-.76 0-1.376.685-1.376 1.529 0 .845.616 1.529 1.376 1.529ZM224.515 134.842h43.772c.76 0 1.375-.685 1.375-1.529 0-.845-.615-1.529-1.375-1.529h-43.772c-.759 0-1.375.684-1.375 1.529 0 .844.616 1.529 1.375 1.529ZM224.515 140.957h43.772c.76 0 1.375-.684 1.375-1.529 0-.844-.615-1.528-1.375-1.528h-43.772c-.759 0-1.375.684-1.375 1.528 0 .845.616 1.529 1.375 1.529Z"
        fill="#F2F2F2"
      />
      <Path
        d="M339.416 369.971H37.418a.399.399 0 0 1-.295-.136.491.491 0 0 1-.123-.329c0-.123.044-.242.123-.329a.399.399 0 0 1 .296-.136h301.997a.4.4 0 0 1 .296.136.495.495 0 0 1 .122.329.493.493 0 0 1-.122.329.4.4 0 0 1-.296.136Z"
        fill="#CCC"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" transform="translate(37 87)" d="M0 0h340v283H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default SvgComponent;