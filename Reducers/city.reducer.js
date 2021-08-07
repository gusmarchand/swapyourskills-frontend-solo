export default function (citySelected = "", action) {


  if (action.type == "addCity") {
    return action.city;
  } else if(action.type == "resetCity") {
    return "";
  }else  {
    return citySelected;
  }
}
