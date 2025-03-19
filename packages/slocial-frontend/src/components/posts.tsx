import { Post } from "../data/posts";
import { parseTimestamp } from "../util/timestamps";

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const { author, caption, timestamp } = post;
  return (
    <div className="bg-slate-300 rounded-xs">
      <div className="flex justify-between items-center p-2">
        <p>{author}</p>
        <p>{parseTimestamp(timestamp)}</p>
      </div>
      {post.imageHref && <img src={post.imageHref} />}

      <p className={`p-2 ${(post.imageHref && "text-base") || "text-3xl"}`}>
        {caption}
      </p>
    </div>
  );
}

export default function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10 p-10">
      {posts.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}
