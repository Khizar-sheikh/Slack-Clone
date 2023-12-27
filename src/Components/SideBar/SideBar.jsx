import "./SideBar.css";
import { useEffect, useState } from "react";
import FiberManualRecord from "@mui/icons-material/FiberManualRecord"
import InsertCommentIcon from "@mui/icons-material/InsertComment"
import Create from '@mui/icons-material/Create';
import SidebarOption from './SidebarComponent/SidebarOption';
import DraftsIcon from '@mui/icons-material/Drafts';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AppsIcon from '@mui/icons-material/Apps';
import InboxIcon from '@mui/icons-material/Inbox';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import db from './../../firebase';
import { useStatevalue } from "../Provider/StateProvider";

function SideBar() {
    const [channels, setChannels] = useState([]);
    const [{ user }] = useStatevalue();
    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => {
            setChannels(
                snapshot.docs.map(doc => ({
                    id: doc.id,
                    name: doc.data().name
                }))
            );
        });
    }, []);

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>Plotano Team</h2>
                    <h3>
                        <FiberManualRecord />
                        {user?.displayName}
                    </h3>
                </div>
                <Create />
            </div>
            <SidebarOption Icon={InsertCommentIcon} title="Threads" />
            <SidebarOption title="Mentions & reactions" Icon={InboxIcon} />
            <SidebarOption title="Saved Items" Icon={DraftsIcon} />
            <SidebarOption title="Chanel browser" Icon={BookmarkBorderIcon} />
            <SidebarOption title="People & user groups" Icon={PeopleAltIcon} />
            <SidebarOption title="Apps" Icon={AppsIcon} />
            <SidebarOption title="File Browser" Icon={FileCopyIcon} />
            <SidebarOption title="Show Less" Icon={ExpandLessIcon} />
            <hr />
            <SidebarOption title="Channels" Icon={ExpandMoreIcon} />
            <hr />
            <SidebarOption title="Add Channel" Icon={AddIcon} addChannelOption={true} />
            {/* Connect to db and list all the channels */}
            {channels.map(channel => (
                <SidebarOption key={channel.id} title={channel.name} id={channel.id} />
            ))}
        </div>
    );
}

export default SideBar;


