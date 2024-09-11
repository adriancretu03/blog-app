import { Link } from "react-router-dom";
import { useGetUsersQuery } from "./usersSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("getUsers");

  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    const renderedUsers = users.ids.map((userId) => (
      <Link key={userId} to={`/user/${userId}`}>
        <Card className="shadow-lg">
          <CardHeader className="flex items-center gap-4">
            {/* Avatar */}
            <Avatar className="w-16 h-16">
              <AvatarImage
                src={`/images/${users.entities[userId].imgSrc}`}
                alt={users.entities[userId].name}
                className="object-cover"
              />
              <AvatarFallback>
                {users.entities[userId].name.slice(0, 2)}
              </AvatarFallback>
            </Avatar>

            {/* User Details */}
            <div>
              <CardTitle className="text-lg font-bold">
                {users.entities[userId].name}
              </CardTitle>
              <CardDescription className="text-sm text-center text-gray-500">
                @{users.entities[userId].username}
              </CardDescription>
            </div>
          </CardHeader>

          {/* Card Content with Email */}
          <CardContent>
            <p className="text-sm font-medium">Email:</p>
            <p className="text-gray-700">{users.entities[userId].email}</p>
          </CardContent>
        </Card>
      </Link>
    ));

    content = (
      <section>
        <ul className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renderedUsers}
        </ul>
      </section>
    );
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return content;
};

export default UsersList;
