export default function (user = {}, action) {
  if (action.type === "addUserInfo") {
    console.log("oko", action.user);
    return action.user;
  } else {
    return user;
  }
}
