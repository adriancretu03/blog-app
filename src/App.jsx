import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AddPostForm from "./features/posts/AddPostForm";
import PostsList from "./features/posts/PostsList";
import SinglePostPage from "./features/posts/SinglePostPage";
import EditPostForm from "./features/posts/EditPostForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout></Layout>}>
        <Route index element={<PostsList></PostsList>}></Route>

        <Route path="post">
          <Route index element={<AddPostForm></AddPostForm>}></Route>
          <Route
            path=":postId"
            element={<SinglePostPage></SinglePostPage>}
          ></Route>
          <Route
            path="edit/:postId"
            element={<EditPostForm></EditPostForm>}
          ></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
