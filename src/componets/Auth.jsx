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
    <div className="flex justify-start items-center h-[100dvh] text-center bg-[url(https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1563.jpg?w=740&t=st=1706640880~exp=1706641480~hmac=737f5979efcbf18fd1f348bf614ab514d7f85fdd31981ff2247b2767e46f26fa)] bg-no-repeat bg-right-bottom bg-contain px-[25px] ">
      <div className="capitalize bg-white/80 px-5 py-10 border rounded-lg shadow-lg max-w-max">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Welcome!
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16  dark:text-gray-400">
          Sign In with google to Join the Conversation!
        </p>
        <a
          onClick={signInWithGoogle}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer"
        >
          sign in
          <svg
            className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
