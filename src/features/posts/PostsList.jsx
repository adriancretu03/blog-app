import { useGetPostsQuery } from "./postsSlice";
import PostExcerpt from "./PostExcerpt";
import Loading from "@/Loading";

const PostsList = () => {
  const {
    data: posts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery("getPosts");

  let content;
  if (isLoading) {
    return <Loading></Loading>;
  } else if (isSuccess) {
    content = posts.ids.map((postId) => (
      <PostExcerpt key={postId} postId={postId}></PostExcerpt>
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {content}
    </section>
  );
};
export default PostsList;
