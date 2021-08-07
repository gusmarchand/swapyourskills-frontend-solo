export default function (selectedSkill = "", action) {
  if (action.type == "addSelectedSkill") {
    return action.skill;
  } else {
    return selectedSkill;
  }
}
