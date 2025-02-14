import Navbar from "./components/Navbar";
import { Post, useGetPosts } from "./data/posts";
import { NaturalLanguageUnit, pluralize } from "./util/natural-language";

const transformations: {
  unit: NaturalLanguageUnit;
  converter: (quantity: number) => number;
}[] = [
  { unit: "second", converter: (n) => n / 1000 },
  { unit: "minute", converter: (n) => n / 60 },
  { unit: "hour", converter: (n) => n / 60 },
  { unit: "day", converter: (n) => n / 24 },
  { unit: "week", converter: (n) => n / 7 },
  { unit: "month", converter: (n) => n / 4 },
];

const parseTimestamp: (date: Date) => string = (date: Date) => {
  const dateDiffMillis = Date.now() - date.getTime();
  if (dateDiffMillis < 1000) {
    return "just now";
  }

  let value = { quantity: dateDiffMillis, unit: "millisecond" };
  for (const { unit, converter } of transformations) {
    const newValue = converter(value.quantity);
    if (newValue < 1) {
      break;
    }

    value = { quantity: newValue, unit: unit as string };
  }

  value.quantity = Math.floor(value.quantity);

  return `${value.quantity} ${pluralize(value.quantity, value.unit)} ago`;
};

type PostCardProps = {
  post: Post;
};

function PostCard({ post }: PostCardProps) {
  const { author, caption, timestamp } = post;
  return (
    <div className="bg-slate-300 py-2">
      <div className="flex justify-between p-2">
        <p>{author}</p>
        <p>{parseTimestamp(timestamp)}</p>
      </div>
      <img src="/orangecat.png" />

      <p className="p-2">{caption}</p>
    </div>
  );
}

function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-10 p-10">
      {posts.map((post, i) => (
        <PostCard post={post} key={i} />
      ))}
    </div>
  );
}

function App() {
  const posts = useGetPosts();

  return (
    <div className="bg-slate-100 h-screen">
      <Navbar />
      <PostGrid posts={posts} />
    </div>
  );
}

export default App;
