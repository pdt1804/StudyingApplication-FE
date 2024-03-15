import React from "react";
import { Image } from "react-native";

const Icon = ({ name, size, color, style }) => (
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

export default Icon;
