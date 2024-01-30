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
        <div className="room">
          <label htmlFor="">enter room name</label>
          <input type="text" ref={roomInputField} />
          <button onClick={() => setRoom(roomInputField.current.value)}>
            enter chat
          </button>
        </div>
      )}
      <div>
        <button onClick={signUserOut}>logout</button>
      </div>
    </div>
  );
}

export default App;
