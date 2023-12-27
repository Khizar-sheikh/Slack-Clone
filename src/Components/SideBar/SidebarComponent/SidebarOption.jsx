import PropTypes from 'prop-types'
import "./SidebarOption.css"
import { useNavigate } from 'react-router-dom'
import db from '../../../firebase';

function SidebarOption({ Icon, title, id, addChannelOption }) {
    const navigate = useNavigate();

    const selectChannel = () => {
        if (id) {
            navigate(`/room/${id}`)
        } else {
            navigate(title)
        }
    }
    const addChannel = () => {
        const ChannelName = prompt("please enter te channel Name")

        if (ChannelName) {
            db.collection('rooms').add({
                name: ChannelName,
            })
        }
    }
    return (
        <div
            className="sidebaroption"
            onClick={addChannelOption ? addChannel : selectChannel}
        >
            {Icon && <Icon className="sidebar__Icon" />}
            {Icon ?
                (<h3>{title}</h3>) : (
                    <h3 className="sidebar__channel">
                        <span className='sidebarOption__hash'>#</span>
                        {title}
                    </h3>)}
        </div>
    )
}

SidebarOption.propTypes = {
    Icon: PropTypes.elementType,
    title: PropTypes.string,
    id: PropTypes.string,
    addChannelOption: PropTypes.bool
}

export default SidebarOption
