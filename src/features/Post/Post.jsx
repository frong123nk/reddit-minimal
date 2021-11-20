import React, { useEffect } from "react";
import "./Post.css";
import { Card } from "../../components/Card/Card";
import { AiOutlineComment } from "react-icons/ai";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAbout } from "../../api/fetchData";
import { IoLogoReddit } from "react-icons/io";
import { loadComment, toggleShowComments } from "../../app/appSlice";
import timeToTimeAgo from "../../utils/timeTotimeAgo";
import { Comment } from "../Comment/Comment";

import { CommentLoading } from "../Comment/CommentLoading";
import { AnimatedList } from "react-animated-list";

export const Post = (props) => {
  const dispatch = useDispatch();
  const [subredditIcon, setSubredditIcon] = useState("");
  const isLoading = useSelector((state) => state.app.isLoading);
  const { post, postIndex } = props;
  
  useEffect(
    () => {
      try {
        if (!isLoading) {
          fetchAbout(post.subreddit_name_prefixed).then((response) => {
            setSubredditIcon(response.icon_img);
          });
        }
      } catch (error) {
        console.log(error);
      }
      return () => setSubredditIcon("");
    },
    [post.subreddit_name_prefixed],
    [isLoading]
  );

  const hendleComment = () => {
    console.log(postIndex);
    dispatch(toggleShowComments(postIndex));
    console.log("showing commnent" + post.showingComments);
    if (!post.showingComments) {
      dispatch(loadComment({ permalink: post.permalink, index: postIndex }));
    }
  };

  const renderComment = () => {
    if (post.loadingComments) {
      return (
        <AnimatedList>
          <CommentLoading />
          <CommentLoading />
          <CommentLoading />
        </AnimatedList>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }
  };
  return (
    <Card>
      <div className="post-header">
        {/* <AiFillInfoCircle className="header-icon" /> */}
        {subredditIcon ? (
          <img
            className="sub-icon"
            src={subredditIcon}
            // alt={`${subreddit.display_name}`}
          />
        ) : (
          <IoLogoReddit className="sub-icon" />
        )}
        <div className="post-header-left">
          <h3 className="post-path">{post.subreddit}</h3>
          <p className="post-posted">posted by {post.author_fullname}</p>
        </div>
        <span className="post-time">{timeToTimeAgo(post.created_utc)}</span>
      </div>
      <div className="post-body">
        <span>
          <h3>{post.title}</h3>
        </span>
      </div>
      {post.post_hint === "image" && (
        <div className="post-image">
          <img src={post.url_overridden_by_dest} alt="media"></img>
        </div>
      )}
      <div className="post-comment">
        <div onClick={() => hendleComment()}>
          <AiOutlineComment className="comment-icon" />
          <span class="comment">{post.num_comments} Comment</span>
        </div>
      </div>
      {renderComment()}
    </Card>
  );
};
