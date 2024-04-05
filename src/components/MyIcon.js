import React from "react";
import { Image } from "react-native";

export default Icon = ({ name, size, color, style }) => (
  <Image
    source={name}
    style={[
      {
        width: size,
        height: size,
        marginRight: 10,
        marginLeft: 10,
        tintColor: color,
      },
      style,
    ]}
  />
);

/** quick use: **

<Icon
name={icons.---}
size={---}
color={colors.---}
/>

*/