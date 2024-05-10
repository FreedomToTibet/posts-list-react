import React from 'react';

import MySelect from './UI/select/MySelect';
import MyInput from './UI/input/MyInput';

const PostFilter = ({filter, setFilter}) => {
	return (
		<div>
				<MyInput 
					placeholder="Search..." 
					value={filter.query}
					onChange={event => setFilter({...filter, query: event.target.value})}
				/>
				<MySelect 
					value={filter.sort}
					onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
					defaultValue="Sorting by..."
					options = {[
						{value: 'id', name: 'By order'},
						{value: 'title', name: "By name"},
						{value: 'body', name: 'By description'},
					]}
				/>
			</div>
	);
};

export default PostFilter;