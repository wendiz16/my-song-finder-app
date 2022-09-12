import { auth, provider } from "./firebase";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import NavBar from './NavBar.js';


function Login({setIsAuth}){
  let navigate = useNavigate();
  console.log("Login Func")
  // a function that allows sign-in anonymously.
  //const auth = getAuth();
  const signInAnon = () => {
    console.log("signInAnon")
    signInAnonymously(auth)
        .then(() => {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("userName", "anonymous");
            localStorage.setItem("userId", "anonymousId");
            setIsAuth(true);
            console.log("try navigate?")
            navigate("/Search");
        })
        .catch((err) => console.log(err.message));
  };
  //function that allows sign-in through Google. We set the login status, username and id into local storage for use. Then we navigate to search page
  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
        .then(() => {
            localStorage.setItem("isAuth", true);
            localStorage.setItem("userName", auth.currentUser.displayName);
            localStorage.setItem("userId", auth.currentUser.uid);
            setIsAuth(true);
            navigate("/Search");
        })
        .catch((err) => {
            console.log(err.message);
        });
  };



  return(
   <section className="logIn">
     <NavBar setIsAuth={setIsAuth} />
     <div className="logInWrapper">
      <div className="signinContainer">
        <h2>Sign in to Continue</h2>
        <button className="signInGoogleBtn" onClick={signInWithGoogle}>Sign in with Google</button>
        <button className="signInAnonBtn" onClick={signInAnon}>Sign in Anonymously</button>
      </div>
     </div>
     
   </section>
  )
}


export default Login;