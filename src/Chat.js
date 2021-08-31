import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic } from "@material-ui/icons";
import { useParams } from 'react-router-dom';
import db from "./firebase";

function Chat() {
  const [input, setInput] = useState("");
  /*Inorder to get random avatat icon of human from api below */
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

    /*Everytime roomId changes, we will get Respective messages*/
  useEffect(() => {
    if (roomId){
      db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))
    }
  }, [roomId]);


  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  //just above roomId changes avatar of the chat when click, if you leave it blank it will not change

  const sendMessage = (e) => {
        e.preventDefault();  // without this if you hit enter screen will refresh
        console.log('You type input', input);

        setInput(""); // clean the input
        
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p> Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
          <p className={`chat__message ${true && 'chat__receiver'}`}> 
            <span className="chat__name"> Abhishek Sadhu
            </span>
            Hey Guys
          <span className="chat__timestamp">3.52pm</span>
          </p>
      </div>

      <div className="chat__footer">
          <InsertEmoticon />
          <form>
              <input value={input} onChange={ e => 
                setInput(e.target.value)}
                 placeholder="Type a message"
                 type="text" />
              <button onClick={sendMessage} type ="submit"> Send a message </button>
          </form>
          <Mic />
      </div>
    </div>
  );
}

export default Chat;
