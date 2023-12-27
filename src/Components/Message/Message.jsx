import PropTypes from 'prop-types';
import "./Message.css"

function Message({ message, user, timestamp, userImage }) {
    let formattedTime = "";
    if (timestamp && timestamp.seconds) {
        formattedTime = new Date(timestamp.seconds * 1000).toUTCString();
    } else if (timestamp instanceof Date) {
        formattedTime = timestamp.toUTCString();
    }

    return (
        <div className="message">
            <img src={userImage} alt="" />
            <div className="message__info">
                <h4>
                    {user}
                    <span className='message__timestamp'> {formattedTime}</span>
                </h4>
                <p>{message}</p>
            </div>
        </div>
    );
}

Message.propTypes = {
    message: PropTypes.string,
    timestamp: PropTypes.oneOfType([
        PropTypes.shape({
            seconds: PropTypes.number,
            nanoseconds: PropTypes.number
        }),
        PropTypes.instanceOf(Date)
    ]),
    user: PropTypes.string,
    userImage: PropTypes.string
};

export default Message;
