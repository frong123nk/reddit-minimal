export const API_ROOT = "https://www.reddit.com";

export const fetchSubredditPosts = async (subreddit) => {
  const response = await fetch(`${API_ROOT}${subreddit}.json`);
  const json = await response.json();
  return json.data.children.map((subreddit) => subreddit.data);
};

export const fetchSubreddit = async () => {
  const response = await fetch(`${API_ROOT}/subreddits.json`);
  const json = await response.json();
  return json.data.children.map((subreddit) => subreddit.data);
};

export const fetchAbout = async (subreddit) => {
  const response = await fetch(`${API_ROOT}/${subreddit}/about.json`);
  const json = await response.json();
  return json.data;
};

export const fetchComment = async (permalink) => {
  const response = await fetch(`${API_ROOT}${permalink}.json`);
  const json = await response.json();
  return json[1].data.children.map((comment) => comment.data);
};
