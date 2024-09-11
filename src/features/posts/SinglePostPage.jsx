import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { useDeletePostMutation, useGetPostsQuery } from "./postsSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { buttonVariants } from "@/components/ui/button";

const SinglePostPage = () => {
  const { postId } = useParams();
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  const { post, isLoading } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading }) => ({
      post: data?.entities[postId],
      isLoading,
    }),
  });

  if (isLoading) return <p>Loading...</p>;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onDeleteClick = async () => {
    try {
      await deletePost({ id: post?.id }).unwrap();
      navigate("/");
    } catch (err) {
      console.error("Failed to delete the post", err);
    }
  };

  return (
    <Card className="max-w-3xl mx-auto flex flex-col justify-between">
      <CardHeader>
        <CardDescription className="flex items-center">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </CardDescription>
        <CardTitle className="text-center pt-3">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.body}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link className={buttonVariants()} to={`/post/edit/${post.id}`}>
          Edit Post
        </Link>
        <Link
          className={buttonVariants({ variant: "destructive" })}
          onClick={onDeleteClick}
        >
          Delete Post
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SinglePostPage;
