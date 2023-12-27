import { Avatar } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import "./Header.css"
import { useStatevalue } from "../Provider/StateProvider";

function Header() {
    const [{ user }] = useStatevalue();

    return (
        <div className="header">
            <div className="header_left">
                {user && user.photoURL && ( // Check if user exists and has a photoURL
                    <img className="userImage" src={user.photoURL} alt="User Avatar" />
                )}

                {!user || !user.photoURL && ( // If user or photoURL is not available
                    <Avatar className="header_Avatar" />
                )}

                <AccessTimeIcon />
            </div>
            <div className="search_bar">
                <SearchIcon />
                <input type="text" placeholder="Search Plotano Team" />
            </div>
            <div className="header_right">
                <HelpOutlineIcon />
            </div>
        </div>
    );
}

export default Header;
