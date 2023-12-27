import { useParams } from "react-router-dom";
import "./chat.css";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect, useState } from "react";
import db from './../../firebase';
import Message from './../Message/Message';
import ChatInput from './../ChatInput/ChatInput';

function ChatScreen() {
    const { roomId } = useParams();
    const [roomDetails, setRoomDetails] = useState(null);
    const [roomMessages, setRoomMessages] = useState([]);

    useEffect(() => {
        const roomRef = db.collection('rooms').doc(roomId);

        const roomDetailsListener = roomRef.onSnapshot(snapshot => {
            if (snapshot.exists) {
                setRoomDetails(snapshot.data());
            } else {
                console.error('Room does not exist');
                // Handle the non-existence of the room
            }
        }, error => {
            console.error('Error fetching room details:', error);
            // Handle the error
        });

        const messagesListener = roomRef.collection('messages')
            .orderBy("timestamp", "asc")
            .onSnapshot(snapshot => {
                setRoomMessages(snapshot.docs.map(doc => doc.data()));
            }, error => {
                console.error('Error fetching messages:', error);
                // Handle the error
            });

        return () => {
            roomDetailsListener(); // Unsubscribe from room details listener
            messagesListener(); // Unsubscribe from messages listener
        };
    }, [roomId]);
    return (
        <div className="chat">
            {roomDetails ? (
                <div className="chat__header">
                    <div className="chat__headerLeft">
                        <h4 className="chat__channelName">
                            <strong># {roomDetails.name}</strong>
                            <StarBorderOutlinedIcon />
                        </h4>
                    </div>
                    <div className="chat__headerRight">
                        <p>
                            <InfoOutlinedIcon /> Details
                        </p>
                    </div>
                </div>
            ) : (
                <div className="chat__header">
                    <p>Room details not available</p>
                </div>
            )}

            <div className="chat__messages">
                {
                    roomMessages.map(({ message, timestamp, userImage, user, id }) => (
                        <Message
                            key={id}
                            message={message}
                            timestamp={timestamp}
                            user={user}
                            userImage={userImage}
                        />
                    ))
                }
            </div>
            <ChatInput channelName={roomDetails?.name} channelId={roomId} />
        </div>
    );
}

export default ChatScreen;
