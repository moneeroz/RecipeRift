import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { Dimensions } from "react-native";

const DetailsLoader = () => {
  const { width, height } = Dimensions.get("window");

  return (
    <ContentLoader
      speed={1.5}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      backgroundColor="#fff"
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="0" rx="0" ry="0" width={width} height="300" />
      <Rect x="16" y="320" rx="0" ry="0" width="310" height="50" />
      <Rect x="16" y="400" rx="0" ry="0" width="280" height="30" />
      <Rect x="16" y="460" rx="0" ry="0" width="310" height="100" />
      <Rect x="16" y="580" rx="0" ry="0" width="140" height="50" />
      <Rect x="0" y="650" rx="0" ry="0" width={width} height="80" />
      <Rect x="0" y="732" rx="0" ry="0" width={width} height="80" />
    </ContentLoader>
  );
};

export default DetailsLoader;
