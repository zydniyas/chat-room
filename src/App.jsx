import { useRef, useState } from "react";
import { Auth } from "./componets/Auth";
import Cookies from "universal-cookie";
import Chat from "./componets/chat";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));
  const [room, setRoom] = useState(null);
  const roomInputField = useRef(null);
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setRoom(null);
  };

  if (!isAuth) {
    return (
      <div className="">
        <Auth setIsAuth={setIsAuth} />
      </div>
    );
  }
  return (
    <div>
      {room ? (
        <div>
          <Chat room={room} />
        </div>
      ) : (
        <div className="flex justify-start items-center h-[100dvh] text-center bg-[url(https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1563.jpg?w=740&t=st=1706640880~exp=1706641480~hmac=737f5979efcbf18fd1f348bf614ab514d7f85fdd31981ff2247b2767e46f26fa)] bg-no-repeat bg-right-bottom bg-contain relative px-[25px] ">
          <div className="flex flex-col max-w-[600px] bg-white/80 px-5 py-10 border rounded-lg shadow-lg max-w-[550px] ">
            <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white capitalize text-left">
              enter
              <span className="text-blue-600 dark:text-blue-500"> room </span>
              name
            </h1>
            <p className="text-lg font-normal text-gray-500 lg:text-sm dark:text-gray-400 text-left mb-10">
              Please enter a unique room name to join or create a chat room.
              Room names help organize conversations and ensure you connect with
              the right group of people. Choose or create a name that reflects
              the topic or purpose of your discussion.
            </p>

            <div className="flex border border-gray-300 max-w-max rounded-lg  ">
              <input
                className="text-gray-900 text-sm border-0  focus:ring-0 rounded-l-lg max-w-[120px] md:max-w-[400px]"
                type="text"
                ref={roomInputField}
              />

              <button
                type="submit"
                onClick={() => setRoom(roomInputField.current.value)}
                className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-r-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer"
              >
                Enter Chat
                <svg
                  className="w-3.5 h-3.5  ms-2 rtl:rotate-180"
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
              </button>
            </div>
          </div>
        </div>
      )}
      <div>
        <button
          onClick={signUserOut}
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 cursor-pointer fixed right-0 top-0 md:mt-5 md:me-5 m-[25px]"
        >
          logout
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
        </button>
      </div>
    </div>
  );
}

export default App;
