import React from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import "./Comment.css";
import ReactMarkdown from "react-markdown";
import timeToTimeAgo from "../../utils/timeTotimeAgo";

export const Comment = (props) => {
  const { comment } = props;
  if (!comment.author) {
    return <div></div>;
  }
  return (
    <div className="comment-container">
      <div className="comment-icon-personal">
        <IoPersonCircleOutline className="icon" />
      </div>
      <div className="comment-details">
        <div className="comment-header">
          <span className="comment-name">{comment.author}</span>
          <span className="comment-time">
            {timeToTimeAgo(comment.created_utc)}
          </span>
        </div>
        <div className="comment-body">
          <ReactMarkdown children={comment.body} />
        </div>
      </div>
    </div>
  );
};
