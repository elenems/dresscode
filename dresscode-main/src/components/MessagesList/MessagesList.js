import React, { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Message from "./Message/Message";
export default function MessagesList() {
  const user = useContext(UserContext);
  return (
    <div>
      <h2>Messages</h2>
      {user.user !== null ? (
        user.user.chats.length ? (
          <div>
            {user.user.chats.map(chat => {
              return (
                <Message
                  user={user}
                  key={new Date() + Math.random()}
                  message={chat}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-center">You have no messages</p>
        )
      ) : null}
    </div>
  );
}
