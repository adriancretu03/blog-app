import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import { Link } from "react-router-dom";
import { useGetPostsQuery } from "./postsSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { buttonVariants } from "@/components/ui/button";

const PostsExcerpt = ({ postId }) => {
  const { post } = useGetPostsQuery("getPosts", {
    selectFromResult: ({ data }) => ({
      post: data?.entities[postId],
    }),
  });

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardDescription className="flex items-center">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </CardDescription>
        <CardTitle className="text-center pt-3">{post.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{post.description}</p>
      </CardContent>
      <CardFooter>
        <Link
          className={buttonVariants({ variant: "outline" })}
          to={`post/${post.id}`}
        >
          View Post
        </Link>
      </CardFooter>
    </Card>
  );
};
export default PostsExcerpt;
