import { StyleSheet } from "react-native";
import { ON_PRIMARY, PRIMARY } from "../Config/Colors";
import { Dimensions } from "react-native";

export default (commonStyles = StyleSheet.create({
  headerTitle: {
    color: ON_PRIMARY
  },
  headerBody: {
    flex: 3
  },
  headerNavigatorTitle: {
    width: Dimensions.get("window").width,
    color: ON_PRIMARY
  },
  containerBg: {
    backgroundColor: PRIMARY
  }
}));
