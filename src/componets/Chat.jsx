import React, { useEffect, useRef, useState } from "react";
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
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    scrollToBottom();
  }, [messages]);

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
    <div className="flex justify-start items-center h-[100dvh] text-center bg-[url(https://img.freepik.com/free-vector/messaging-fun-concept-illustration_114360-1563.jpg?w=740&t=st=1706640880~exp=1706641480~hmac=737f5979efcbf18fd1f348bf614ab514d7f85fdd31981ff2247b2767e46f26fa)] bg-no-repeat bg-right-bottom bg-contain ">
      <div className="h-[100dvh] w-full ">
        <div className="px-[25px] md:p-10 pb-[150px]   bg-black/30 h-[100dvh] ">
          <div className="absolute bottom-[60px] overflow-y-auto max-h-[100vh] w-[93%]">
            {messages.map((message) => (
              <div
                className="text-left mb-2 bg-white max-w-max p-1 px-2 rounded-lg"
                key={message.id}
              >
                <span className="font-light text-[14px]">
                  {message.user} :{" "}
                </span>
                <span className="font-medium text-[14px]">{message.text}</span>
              </div>
            ))}
            <div ref={messagesEndRef}></div>
          </div>
        </div>

        <form className="fixed bottom-0 w-full" onSubmit={handleSubmit}>
          <label htmlFor="chat" className="sr-only">
            Your message 
          </label>
          <div className="flex items-center px-3 py-2 rounded-lg bg-gray-200 ">
            <input
              onChange={(e) => setNewMsg(e.target.value)}
              value={newmsg}
              id="chat"
              rows="1"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Your message..."
            ></input>
            <button
              type="submit"
              className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
            >
              <svg
                className="w-5 h-5 rotate-90 rtl:-rotate-90"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
              </svg>
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Chat;
