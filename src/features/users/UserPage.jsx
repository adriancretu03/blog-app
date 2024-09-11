import { Link, useParams } from "react-router-dom";
import { useGetPostsByUserIdQuery } from "../posts/postsSlice";
import { useGetUsersQuery } from "../users/usersSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import TimeAgo from "../posts/TimeAgo";
import { buttonVariants } from "@/components/ui/button";

const UserPage = () => {
  const { userId } = useParams();

  const {
    user,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
    isError: isErrorUser,
    error: errorUser,
  } = useGetUsersQuery("getUsers", {
    selectFromResult: ({ data, isLoading, isSuccess, isError, error }) => ({
      user: data?.entities[userId],
      isLoading,
      isSuccess,
      isError,
      error,
    }),
  });

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsByUserIdQuery(userId);

  let content;

  if (isLoading || isLoadingUser) {
    content = <p>Loading...</p>;
  } else if (isSuccess && isSuccessUser) {
    const { ids, entities } = postsForUser;

    content = (
      <section className="md:flex md:justify-around gap-6">
        <Card className="max-w-lg max-h-[700px] shadow-lg">
          <CardHeader className="flex items-center gap-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={`/images/${user.imgSrc}`}
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-xl font-bold">{user.name}</CardTitle>
              <CardDescription className="text-sm text-center text-gray-500">
                @{user.username}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium">Email:</p>
              <p className="text-gray-700">{user.email}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Phone:</p>
              <p className="text-gray-700">{user.phone}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Website:</p>
              <Link
                to={`https://${user.website}`}
                className="text-blue-500 hover:underline"
              >
                {user.website}
              </Link>
            </div>

            <div>
              <p className="text-sm font-medium">Address:</p>
              <p className="text-gray-700">{`${user.address.suite}, ${user.address.street}, ${user.address.city}, ${user.address.zipcode}`}</p>
            </div>

            <div>
              <p className="text-sm font-medium">Company:</p>
              <p className="text-gray-700">{user.company.name}</p>
              <p className="text-gray-500 text-sm italic">
                {user.company.catchPhrase}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="max-w-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg font-bold">
              Posts by {user.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {ids.length > 0 ? (
              ids.map((postId) => {
                const post = entities[postId]; // Get post by id from entities
                return (
                  <Card key={post.id} className="mb-4">
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                      <CardDescription>
                        <TimeAgo timestamp={post.date} />
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-2">{post.description}</p>
                      <Link
                        to={`/post/${post.id}`}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        Read more
                      </Link>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <p>No posts found for this user.</p>
            )}
          </CardContent>
        </Card>
      </section>
    );
  } else if (isError || isErrorUser) {
    content = <p>{error || errorUser}</p>;
  }

  return content;
};

export default UserPage;
