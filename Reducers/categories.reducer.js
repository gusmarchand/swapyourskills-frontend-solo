export default function (categoriesList = "", action) {
  if (action.type == "addCategories") {
    return action.categories;
  } else if (action.type == "resetCat") {
    return "";
  } else {
    return categoriesList;
  }
}
