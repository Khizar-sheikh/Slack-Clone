import { useState } from "react";
import db from "../../firebase";
import "./ChatInput.css";
import firebase from "firebase/compat/app";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import PropTypes from 'prop-types';
import { useStatevalue } from "../Provider/StateProvider"
import { Button } from "@mui/material"

function ChatInput({ channelName, channelId }) {
    const [input, setInput] = useState("");
    const [{ user }] = useStatevalue();
    const sendMessage = (e) => {
        e.preventDefault();
        if (channelId) {
            db.collection("rooms").doc(channelId).collection("messages").add({
                message: input,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                user: user.displayName,
                userImage: user.photoURL,
            });
        }
        setInput("");
    };
    return (
        <div className="chatInput">
            <form>
                <input
                    placeholder={`Message #${channelName}`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button type="submit" onClick={sendMessage}>
                    <SendOutlinedIcon />
                </Button>
            </form>
        </div>
    );
}

export default ChatInput;

ChatInput.propTypes = {
    channelName: PropTypes.string.isRequired,
    channelId: PropTypes.string.isRequired
};