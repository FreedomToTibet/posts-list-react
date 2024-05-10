import React from 'react';

const About = () => {
	return (
		<div>
			<h2 style={{textAlign: 'center', marginTop: 20}}>About project</h2>
			<h3 style={{textAlign: 'center', marginTop: 20, fontSize: 20}}>A simple blog with posts and with a very simple design</h3>
			<p style={{textAlign: 'center', marginTop: 20, fontSize: 22}}>Used in development:</p>
			<ul style={{textAlign: 'left', marginTop: 20, fontSize: 20}}>
				<li>React v17</li>
				<li>Hooks (useState,useEffect...)</li>
				<li>User hooks</li>
				<li>Context, useContext;</li>
				<li>React Router v5</li>
				<li>jsonplaceholder.typicode.com like a source  of posts</li>
				<li>Axios</li>
				<li>Css.module</li>
				<li>Pagination and etc.</li>
			</ul>
		</div>
	);
};

export default About;