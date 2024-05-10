import React, {useContext} from 'react';
import MyInput from "../components/UI/input/MyInput";
import MyButton from "../components/UI/button/MyButton";
import {AuthContext} from "../context";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const login = (event) => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    return (
        <div>
            <h1 style={{textAlign: 'center'}}>The page is for login</h1>
            <form onSubmit={login}>
                <MyInput type="text" placeholder="Your ID"/>
                <MyInput type="password" placeholder="Password"/>
                <MyButton>Enter</MyButton>
								<p style={{marginTop: 8, fontSize: 16}}>(just click on the Enter )</p>
            </form>
        </div>
    );
};

export default Login;