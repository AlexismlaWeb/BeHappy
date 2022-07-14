export default function (token = "", action) {
  if (action.type == "addToken") {
    return action.token;
  } else if (action.type == "log-out") {
    var clearToken = "";
    return clearToken;
  } else {
    return token;
  }
}
