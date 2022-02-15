import React, { useEffect, useState } from 'react';

// Actions 
import { getPosts } from '../../actions/post.actions';

// Components
import Card from '../Post/Card';

// Redux 
import { useDispatch, useSelector } from 'react-redux';

// Utils
import { isEmpty } from '../Utils/Utils';

const Thread = () => {
  const [loadPost, setLoadPost] = useState(true);

  const dispatch = useDispatch();
  const posts = useSelector(state => state.postReducer);

  useEffect(() => {
    if (loadPost) {
      dispatch(getPosts());
      setLoadPost(false);
    }
  }, [dispatch, loadPost]);

  return (

    <div className="mt-5">
      {!isEmpty(posts[0]) &&
        posts.map(post => {
          return <Card post={post} key={post.id} />;
        })}
    </div>

  );
};

export default Thread;
