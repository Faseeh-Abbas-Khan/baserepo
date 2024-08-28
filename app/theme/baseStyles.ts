import { ViewStyle } from "react-native";
import { colors } from "./colors";

export const $row: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  }

export const $shadow: ViewStyle ={
    shadowColor: colors.palette.primary,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10.84,
    elevation: 5,
}