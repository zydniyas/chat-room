/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase-config";

function Chat({ room }) {
  const [newmsg, setNewMsg] = useState("");
  const msgRef = collection(db, "msg");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const queryMsg = query(
      msgRef,
      where("room", "==", room),
      orderBy("createdAt")
    );
    const unsubscribe = onSnapshot(queryMsg, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    return () => unsubscribe();
  }, [room]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newmsg === "") return;

    await addDoc(msgRef, {
      text: newmsg,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });

    setNewMsg("");
  };
  return (
    <div>
      <div>
        {messages.map((message) => {
          return (
            <div key={message.id}>
              <span>{message.user}</span>
              {message.text}
            </div>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} action="">
        <input
          onChange={(e) => setNewMsg(e.target.value)}
          type="text"
          placeholder="type msg here"
          value={newmsg}
        />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default Chat;
