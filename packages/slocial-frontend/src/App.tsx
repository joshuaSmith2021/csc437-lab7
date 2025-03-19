import { useEffect, useState } from "react";
import PostGrid from "./components/posts";
import { Post, useGetAllPosts } from "./data/posts";
import { AuthTokenComponentProps } from "./routes";

function App({ authToken }: AuthTokenComponentProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    useGetAllPosts(authToken).then((posts) => setPosts(posts));
  }, []);

  return <PostGrid posts={posts} />;
}

export default App;
