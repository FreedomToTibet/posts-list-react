import React, {useContext} from 'react';
import { Link } from 'react-router-dom';

import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";

const Navbar = () => {
	const {isAuth, setIsAuth} = useContext(AuthContext);

	const logout = () => {
			setIsAuth(false);
			localStorage.removeItem('auth');
	}

	return (
		<div className="navbar">
			<MyButton onClick={logout}>Logout</MyButton>
				<Link to="/posts" className="navbar__links" >Posts</Link>
				<Link to="/about" className="navbar__links" >About project</Link>
		</div>
	);
};

export default Navbar;