import Cookie from "js-cookie";
import axios from "axios";

export const verifyAuthCookie = async () => {
  const token = Cookie.get("auth-token");
  if (token) {
    axios
      .post("/api/user/authenticate", {
        token,
      })
      .then((response) => {
        console.log(response);
        return { verified: true };
      })
      .catch(() => ({ verified: false }));
  } else {
    return { verified: false };
  }
};
