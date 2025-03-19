import { useEffect, useState } from "react";
import PostGrid from "./components/posts";
import { Post, getAllPosts } from "./data/posts";
import { BaseComponentProps } from "./routes";

function App({ authToken }: BaseComponentProps) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts(authToken).then((posts) => setPosts(posts));
  }, [authToken]);

  return <PostGrid posts={posts} />;
}

export default App;
