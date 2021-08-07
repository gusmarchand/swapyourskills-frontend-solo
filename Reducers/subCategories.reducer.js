export default function (subCategoriesList = "", action) {
  if (action.type == "addSubCategories") {
    return action.subCategories;
  }  else if(action.type == "resetSubCat") {
    return "";
  }else {
    return subCategoriesList;
  }
}
