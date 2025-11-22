import { commonColors } from "@/styles/colors"
import React, { memo } from "react"
import { SvgProps } from "react-native-svg"

interface SvgElementProps extends SvgProps {
  name: React.ComponentType<SvgProps>
  color?: string
}

const SvgElement: React.FC<SvgElementProps> = ({ name: Tag, color = commonColors.white, ...props }) => {
  return <Tag color={color} {...props} />
}

export default memo(SvgElement)
