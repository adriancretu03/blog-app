import { useSelector } from "react-redux";
import { selectPostsIds, getPostsStatus, getPostsError } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";

const PostsList = () => {
  const orderedPostsIds = useSelector(selectPostsIds);
  const postStatus = useSelector(getPostsStatus);
  const error = useSelector(getPostsError);

  let content;
  if (postStatus === "loading") {
    content = <p>"Loading..."</p>;
  } else if (postStatus === "succeeded") {
    content = orderedPostsIds.map((postId) => (
      <PostExcerpt key={postId} postId={postId}></PostExcerpt>
    ));
  } else if (postStatus === "failed") {
    content = <p>{error}</p>;
  }

  return <section>{content}</section>;
};
export default PostsList;
