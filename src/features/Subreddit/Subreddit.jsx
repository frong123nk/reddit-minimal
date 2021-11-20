import React, { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import "./Subreddit.css";
import { IoLogoReddit } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import {SubLoading} from'./SubLoading'
import { AnimatedList } from "react-animated-list";
import {
  selectCurrentSubreddit,
  selectSubredditname,
  loadSubreddit,
  currentSubreddit,
} from "../../app/subredditSlice";


export const Subreddit = () => {
  const dispatch = useDispatch();
  const subreddits = useSelector(selectSubredditname);
  const selectcurrentSubreddit = useSelector(selectCurrentSubreddit);
  const isLoading = (state) => state.subreddit.rLoading
  const rLoading = useSelector(isLoading)

  useEffect(() => {
    dispatch(loadSubreddit());
  }, [dispatch]);

  const handleClick = (url) =>{
    if(url === '/r/Home/'){
      url = '/'
    }
    dispatch(currentSubreddit(url))
  }

  if(rLoading){
    return(
      <AnimatedList>
          <SubLoading />
          <SubLoading />
          <SubLoading />
        </AnimatedList>
    )
  }

  return (
    <Card>
      <ul className="container-sub">
        {subreddits.map((subreddit) => {
          return (
            <li
              className={
                subreddit.url === selectcurrentSubreddit
                  ? "reddit selected"
                  : "reddit"
              }
              key={subreddit.id}
              onClick={() => handleClick(subreddit.url)}
            >
              {subreddit.icon_img ? (
                <img
                  className="sub-icon"
                  src={subreddit.icon_img}
                  alt={`${subreddit.display_name}`}
                />
              ) : (
                <IoLogoReddit className="sub-icon" />
              )}
              <div className= 'subreddit-title'>
                {subreddit.display_name}
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
};
