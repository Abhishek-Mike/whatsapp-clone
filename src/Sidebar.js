import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import db from './firebase';
import { useStateValue } from "./StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  //Only wanna do it once, not again (when the sidebar component loads) or browser will be slow
  useEffect(() => {
      const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => 
        setRooms(
          snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
          }))
          )
      );
      //whenever component is unmounted or cleans up below cleanip function is called
      return () => {
        unsubscribe();
      }
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div classname="sidebar__searchContainer">
          <SearchOutlined />
          <input
            type="text"
            placeholder="Search or start a new chat"
            className="searchbar"
            size="50"
          ></input>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {rooms.map(room => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
