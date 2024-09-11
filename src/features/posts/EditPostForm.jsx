import { useParams, useNavigate } from "react-router-dom";
import { useUpdatePostMutation, useGetPostsQuery } from "./postsSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PostForm from "./PostForm";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();

  const {
    post,
    isLoading: isPostsLoading,
    isSuccess,
  } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data, isLoading, isSuccess }) => ({
      post: data?.entities[postId],
      isLoading,
      isSuccess,
    }),
  });

  const onSubmit = async (data) => {
    const {
      postTitle: title,
      postContent: content,
      postAuthor: userId,
      postDescription: description,
    } = data;
    try {
      await updatePost({
        id: postId,
        title,
        body: content,
        userId,
        description,
      }).unwrap();

      navigate(`/post/${postId}`);
    } catch (err) {
      console.error("Failed to update the post", err);
    }
  };

  if (isPostsLoading) return <p>Loading...</p>;

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto flex flex-col justify-center items-center">
      <CardHeader className="text-center">
        <CardTitle>
          <h2>Edit</h2>
        </CardTitle>
        <CardDescription>
          <i>edit your post </i>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <PostForm
          defaultValues={{
            postTitle: post.title,
            postAuthor: post.userId,
            postDescription: post.description,
            postContent: post.body,
          }}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};

export default EditPostForm;
