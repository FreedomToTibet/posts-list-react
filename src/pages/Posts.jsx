import React, {useEffect, useRef, useState, useMemo} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import PostList from '../components/PostList';
import PostForm from '../components/PostForm';
import PostFilter from '../components/PostFilter';

import {usePosts} from '../hooks/usePosts';
import {useFetching} from '../hooks/useFetching';
// import {useObserver} from '../hooks/useObserver'; // Do u want Lazy Load - uncomment this row

import {getPagesCount} from '../utils/pages';

import MyModal from '../components/UI/modal/MyModal';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/Loader/Loader';
import Pagination from '../components/UI/pagination/Pagination';
import MySelect from "../components/UI/select/MySelect";

import PostService from '../API/PostService';

function Posts() {
	const location = useLocation();
  const history = useHistory();

	const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const initialPage = Number(queryParams.get('page')) || 1;

  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  // const [limit, setLimit] = useState(10);
	const [limit, setLimit] = useState(sessionStorage.getItem('mySelectValue') || 10);
  // const [page, setPage] = useState(1);
	const [page, setPage] = useState(initialPage);
  // const lastElement = useRef(); 						// Do u want Lazy Load - uncomment this row

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit, page);
    // setPosts([...posts, ...response.data]); 				// Do u want Lazy Load - uncomment this row
    setPosts([...response.data]);											// And comment this row
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPagesCount(totalCount, limit));
  });

  // useObserver(lastElement, page < totalPages, isPostsLoading, () => {
  //   setPage(page + 1);
  // }); 													// Do u want Lazy Load - uncomment this function

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

	useEffect(() => {
    queryParams.set('page', String(page));
    history.push({ search: queryParams.toString() });
  }, [page, queryParams, history]);

	useEffect(() => {
    sessionStorage.setItem('mySelectValue', limit);
  }, [limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className="App">
      <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
        Create whatever
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>

      <PostFilter filter={filter} setFilter={setFilter} />

      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue="Posts on the page "
        options={[
          {value: 5, name: '5'},
          {value: 10, name: '10'},
          {value: 25, name: '25'},
          {value: -1, name: 'All posts'},
        ]}
      />

      {postError && (
        <h1 style={{textAlign: 'center'}}>An error has happened ${postError}</h1>
      )}

      {isPostsLoading && (
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}>
          {' '}
          <Loader />{' '}
        </div>
      )}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title="Posts about Lorem Ipsum"
      />
      {/* <div ref={lastElement} style={{height: 20}}></div> // Do u want Lazy Load - uncomment this row*/}
      <Pagination page={page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
