import React, { useEffect } from "react";
import "./Home.css";

import { Post } from "../Post/Post";
import { loadPost,selectError,selectIsLoading,selectPost,selectFilteredPosts } from "../../app/appSlice";
import { useDispatch,useSelector } from "react-redux";
import { AnimatedList } from "react-animated-list";
import { PostLoading } from "../Post/PostLoding";

export const Home = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectFilteredPosts)
    const error = useSelector(selectError)
    const isLoading = useSelector(selectIsLoading)
    const selectCurrentSubreddit = useSelector((state)=>state.subreddit.currentSubreddit)
    
  
    useEffect(()=>{
        dispatch(loadPost(selectCurrentSubreddit))
    },[selectCurrentSubreddit])
    
    if (isLoading) {
      return (
        <AnimatedList>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </AnimatedList>
      );
    }


  return (
    //   <Post/>
      <div>
          {posts.map((post,index)=>(
              <Post key={index} post={post} postIndex={index}/>
          ))}
      </div>
  );
};
