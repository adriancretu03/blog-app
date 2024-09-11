import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PostForm from "./PostForm";
import { useNavigate } from "react-router-dom";
import { useAddNewPostMutation } from "./postsSlice";

const AddPostForm = () => {
  const [addNewPost, { isLoading }] = useAddNewPostMutation();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const {
      postTitle: title,
      postDescription: description,
      postContent: content,
      postAuthor: userId,
    } = data;
    console.log(data);
    try {
      await addNewPost({
        title,
        description,
        body: content,
        userId,
      }).unwrap();

      navigate("/");
    } catch (err) {
      console.error("Failed to save the post", err);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto flex flex-col justify-center items-center">
      <CardHeader className="text-center">
        <CardTitle>
          <h2>Add a new post</h2>
        </CardTitle>
        <CardDescription>
          <i>new post to add to your blog</i>
        </CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <PostForm
          defaultValues={{
            postTitle: "",
            postAuthor: "",
            postDescription: "",
            postContent: "",
          }}
          onSubmit={onSubmit}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
export default AddPostForm;
