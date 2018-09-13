import { AVAILABLE } from "../Config/Strings";

export const toUpperCaseFirstOfEachWord = str => {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(" ");
};

export const filterItems = (itemData, category) => {
  return itemData
    .map(item => {
      if (
        item.itemCategory === category &&
        item.availabilityStatus === AVAILABLE
      )
        return item;
    })
    .filter(item => {
      if (item !== undefined) return item;
    });
};
