import PostGrid from "./components/posts";
import { useGetPosts } from "./data/posts";

function App() {
  const posts = useGetPosts();

  return <PostGrid posts={posts} />;
}

export default App;
