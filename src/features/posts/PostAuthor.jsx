import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../users/usersSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PostAuthor = ({ userId }) => {
  const { user: author } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading }) => ({
      user: data?.entities[userId],
    }),
  });

  return (
    <span className="flex items-center gap-2">
      {author ? (
        <>
          <Avatar>
            <AvatarImage
              src={`/images/${author.imgSrc}`}
              className="object-cover"
            ></AvatarImage>
            <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <Link className="font-bold" to={`/user/${userId}`}>
            {author.name}
          </Link>
        </>
      ) : (
        "Unknown author"
      )}
    </span>
  );
};

export default PostAuthor;
