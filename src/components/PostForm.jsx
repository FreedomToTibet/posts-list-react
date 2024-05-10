import React, {useState} from 'react';

import MyButton from './UI/button/MyButton';
import MyInput from './UI/input/MyInput';

const PostForm = ({create}) => {
	const [post, setPost] = useState({title: '', body: ''});
	const nextID = 99;

	const addNewPost = (e) => {
		e.preventDefault();
		const newPost = {
			...post, id: nextID +1
		}
		create(newPost);
		setPost({title: '', body: ''});
	};

	return (
		<form>
        <MyInput
          value={post.title}
					onChange={e => setPost({...post, title: e.target.value})}
          type="text"
          placeholder="Header of the post"
        />
        <MyInput
					value={post.body}
					onChange={e => setPost({...post, body: e.target.value})}
          type="text"
          placeholder="Description of the post"
        />
        <MyButton onClick={addNewPost}>
          Create
        </MyButton>
      </form>
	);
};

export default PostForm;