import React from 'react';
import styles from './Loader.module.css';

const Loader = () => {
	return (
		<>
			<div className={styles.loader}>
			</div>
			<div className={styles.title}>Loading...</div>
		</>
	);
};

export default Loader;