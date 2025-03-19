export type Post = {
  author: string;
  timestamp: Date;
  imageHref?: string;
  caption?: string;
};

type GetAllItemsResponseItem = {
  author: string;
  timestampMillis: number;
  src?: string;
  caption?: string;
};

export const useGetAllPosts: (authToken?: string) => Promise<Post[]> = async (
  authToken,
) =>
  await fetch("/api/posts", {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json() as unknown as GetAllItemsResponseItem[];
      } else {
        return [] as GetAllItemsResponseItem[];
      }
    })
    .then((items) =>
      items.map(({ author, timestampMillis, src, caption }) => ({
        author,
        timestamp: new Date(timestampMillis),
        imageHref: src,
        caption,
      })),
    );
