import { auth, provider } from "../../firebase";
import "./login.css";
import { Button } from "@mui/material";
import { useStatevalue } from './../Provider/StateProvider';
import { actionTypes } from "../Provider/Reducer";

function Login() {
    const [state, dispatch] = useStatevalue();

    function signin() {
        auth.signInWithPopup(provider)
            .then((result) => {
                // Handle successful sign-in here
                console.log("Signed in successfully:", result);
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
            })
            .catch((error) => {
                // Handle sign-in error here
                console.error("Error signing in:", error);
            });
    }
    return (
        <div className="login">
            <div className="login__container">
                <img
                    src="https://a.slack-edge.com/bv1-10/slack_logo-ebd02d1.svg"
                    alt="slack-logo"
                    className="login__logo"
                />
                <h1 className="login__heading">Sign in to Plotano Team Slack</h1>
                <p className="login__subheading">plotano.slack.com</p>
                <Button onClick={signin}>Sign In with Google</Button>
            </div>
        </div>
    );
}

export default Login;
