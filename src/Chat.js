import { Avatar, IconButton } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./Chat.css";
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, Mic} from "@material-ui/icons";
import VideoCallIcon from '@material-ui/icons/VideoCall';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import { useParams } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from './StateProvider';

function Chat() {
  const [input, setInput] = useState("");
  /*Inorder to get random avatar icon of human from api below */
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  /*Everytime roomId changes, we will get Respective messages*/
  useEffect(()=>{
    if(roomId){
       const value = db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
            setRoomName(snapshot.data().name);
        });
        

        db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()))
        });

      }
  },[roomId])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);
  //just above roomId changes avatar of the chat when click, if you leave it blank it will not change

  const sendMessage = (e) => {
    e.preventDefault(); // without this if you hit enter , screen will refresh
    console.log("You type input", input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message : input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput(""); // clean the input
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p> Last seen at {" "}
              {new Date(
                messages[messages.length - 1]?.
                timestamp?.toDate()
              ).toLocaleString()}
          </p>
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
        {messages.map((message) => (
        <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
          <span className="chat__name"> 
          {message.name}</span>
          {message.message}
          <span className="chat__timestamp">
            {new Date(message.timestamp?.toDate()).toLocaleString()}
          </span>
        </p>
        ))}
      </div>

      <div className="chat__footer">
      <IconButton>
        <InsertEmoticon />
      </IconButton>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            {" "}
            Send a message{" "}
          </button>
        </form>
        <IconButton>
          <InsertPhotoIcon />
        </IconButton>
        <IconButton>
          <VideoCallIcon />
        </IconButton>
        <IconButton>
          <Mic />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
