import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("screen");

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  size + (scale(size) - size) * factor;

export { moderateScale, scale, verticalScale };


// | Property / Use Case              | Recommended Function |
// | -------------------------------- | -------------------- |
// | Width, horizontal margin/padding | `scale`              |
// | Height, vertical margin/padding  | `verticalScale`      |
// | Font sizes                       | `moderateScale`      |
// | Border radius                    | `moderateScale`      |
// | Icons                            | `moderateScale`      |
// | Small spacings                   | `moderateScale`      |
// | Big container heights            | `verticalScale`      |
// | Big container widths             | `scale`              |
