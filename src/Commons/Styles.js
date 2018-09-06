import { StyleSheet } from "react-native";
import { onPrimary, primary } from "../Config/Colors";
import { Dimensions } from "react-native";

export default (commonStyles = StyleSheet.create({
  headerTitle: {
    color: onPrimary
  },
  headerBody: {
    flex: 3
  },
  headerNavigatorTitle: {
    width: Dimensions.get("window").width,
    color: onPrimary
  },
  containerBg: {
    backgroundColor: primary
  }
}));
