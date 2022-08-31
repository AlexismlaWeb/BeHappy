export default function (user = {}, action) {
  if (action.type === "addUserInfo") {
    return action.user;
  } else {
    return user;
  }
}
