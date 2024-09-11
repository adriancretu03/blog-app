import { Link } from "react-router-dom";
import { buttonVariants } from "../ui/button";

const Header = () => {
  return (
    <header className="flex justify-between items-center">
      <Link to="/">
        <h1>Blog App</h1>
      </Link>
      <nav>
        <ul className="flex gap-3 ">
          <li>
            <Link className={buttonVariants({ variant: "outline" })} to="post">
              <span className="text-lg">New Post</span>
            </Link>
          </li>
          <li>
            <Link className={buttonVariants({ variant: "ghost" })} to="user">
              <span className="text-lg">Users</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
