import { auth, provider } from "../firebase-config.js";

import { signInWithPopup } from "firebase/auth";

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const Auth = ({ setIsAuth }) => {
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    try {
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="auth">
      <p>sign in with google to countinue</p>
      <button onClick={signInWithGoogle}>sign in with google</button>
    </div>
  );
};
