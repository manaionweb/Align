import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { ICON_XMLS, IconName } from '../constants/icons';

interface CustomIconProps {
  name: IconName;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

export default function CustomIcon({ name, size = 24, color, style }: CustomIconProps) {
  const xml = ICON_XMLS[name];
  
  if (!xml) return null;

  return (
    <SvgXml 
      xml={xml} 
      width={size} 
      height={size} 
      color={color}
      style={style}
    />
  );
}
