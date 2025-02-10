export type Post = {
  author: string;
  timestamp: Date;
  imageHref: URL;
  caption: string;
};

export const useGetPosts: () => Post[] = () => [
  {
    author: "user1",
    timestamp: new Date("2025-01-31T12:00:00Z"),
    imageHref: new URL("https://example.com/image1.jpg"),
    caption: "Beautiful sunset!",
  },
  {
    author: "user2",
    timestamp: new Date("2025-01-30T14:30:00Z"),
    imageHref: new URL("https://example.com/image2.jpg"),
    caption: "Exploring the mountains.",
  },
  {
    author: "user3",
    timestamp: new Date("2025-01-25T09:15:00Z"),
    imageHref: new URL("https://example.com/image3.jpg"),
    caption: "Coffee and books.",
  },
  {
    author: "user4",
    timestamp: new Date("2025-01-15T18:45:00Z"),
    imageHref: new URL("https://example.com/image4.jpg"),
    caption: "City lights at night.",
  },
  {
    author: "user5",
    timestamp: new Date("2025-01-01T07:00:00Z"),
    imageHref: new URL("https://example.com/image5.jpg"),
    caption: "Morning run!",
  },
  {
    author: "user6",
    timestamp: new Date("2024-12-25T16:20:00Z"),
    imageHref: new URL("https://example.com/image6.jpg"),
    caption: "Beach vibes.",
  },
  {
    author: "user7",
    timestamp: new Date("2024-12-15T11:10:00Z"),
    imageHref: new URL("https://example.com/image7.jpg"),
    caption: "Lunch with friends.",
  },
  {
    author: "user8",
    timestamp: new Date("2024-12-01T20:00:00Z"),
    imageHref: new URL("https://example.com/image8.jpg"),
    caption: "Starry night.",
  },
  {
    author: "user9",
    timestamp: new Date("2024-11-25T13:45:00Z"),
    imageHref: new URL("https://example.com/image9.jpg"),
    caption: "Art gallery visit.",
  },
  {
    author: "user10",
    timestamp: new Date("2024-11-15T10:30:00Z"),
    imageHref: new URL("https://example.com/image10.jpg"),
    caption: "New haircut!",
  },
  {
    author: "user11",
    timestamp: new Date("2024-11-01T17:55:00Z"),
    imageHref: new URL("https://example.com/image11.jpg"),
    caption: "Weekend vibes.",
  },
  {
    author: "user12",
    timestamp: new Date("2024-10-25T08:20:00Z"),
    imageHref: new URL("https://example.com/image12.jpg"),
    caption: "Breakfast time.",
  },
  {
    author: "user13",
    timestamp: new Date("2024-10-15T19:10:00Z"),
    imageHref: new URL("https://example.com/image13.jpg"),
    caption: "Movie night.",
  },
  {
    author: "user14",
    timestamp: new Date("2024-10-01T15:40:00Z"),
    imageHref: new URL("https://example.com/image14.jpg"),
    caption: "Shopping spree.",
  },
  {
    author: "user15",
    timestamp: new Date("2024-09-25T12:25:00Z"),
    imageHref: new URL("https://example.com/image15.jpg"),
    caption: "Park picnic.",
  },
  {
    author: "user16",
    timestamp: new Date("2024-09-15T09:50:00Z"),
    imageHref: new URL("https://example.com/image16.jpg"),
    caption: "Work from home setup.",
  },
  {
    author: "user17",
    timestamp: new Date("2024-09-01T21:00:00Z"),
    imageHref: new URL("https://example.com/image17.jpg"),
    caption: "Dinner date.",
  },
  {
    author: "user18",
    timestamp: new Date("2024-08-25T06:30:00Z"),
    imageHref: new URL("https://example.com/image18.jpg"),
    caption: "Early morning hike.",
  },
  {
    author: "user19",
    timestamp: new Date("2024-08-15T14:15:00Z"),
    imageHref: new URL("https://example.com/image19.jpg"),
    caption: "New book alert!",
  },
  {
    author: "user20",
    timestamp: new Date("2024-08-01T11:05:00Z"),
    imageHref: new URL("https://example.com/image20.jpg"),
    caption: "Coffee break.",
  },
  {
    author: "user21",
    timestamp: new Date("2024-07-25T18:50:00Z"),
    imageHref: new URL("https://example.com/image21.jpg"),
    caption: "Sunset drive.",
  },
  {
    author: "user22",
    timestamp: new Date("2024-07-15T07:40:00Z"),
    imageHref: new URL("https://example.com/image22.jpg"),
    caption: "Yoga session.",
  },
  {
    author: "user23",
    timestamp: new Date("2024-07-01T16:35:00Z"),
    imageHref: new URL("https://example.com/image23.jpg"),
    caption: "New plant for my desk.",
  },
  {
    author: "user24",
    timestamp: new Date("2024-06-25T13:20:00Z"),
    imageHref: new URL("https://example.com/image24.jpg"),
    caption: "Lunch by the lake.",
  },
  {
    author: "user25",
    timestamp: new Date("2024-06-15T10:10:00Z"),
    imageHref: new URL("https://example.com/image25.jpg"),
    caption: "Weekend project.",
  },
  {
    author: "user26",
    timestamp: new Date("2024-06-01T19:55:00Z"),
    imageHref: new URL("https://example.com/image26.jpg"),
    caption: "Game night with friends.",
  },
  {
    author: "user27",
    timestamp: new Date("2024-05-25T08:45:00Z"),
    imageHref: new URL("https://example.com/image27.jpg"),
    caption: "Morning coffee.",
  },
  {
    author: "user28",
    timestamp: new Date("2024-05-15T17:30:00Z"),
    imageHref: new URL("https://example.com/image28.jpg"),
    caption: "Exploring the city.",
  },
  {
    author: "user29",
    timestamp: new Date("2024-05-01T12:15:00Z"),
    imageHref: new URL("https://example.com/image29.jpg"),
    caption: "Relaxing at home.",
  },
  {
    author: "user30",
    timestamp: new Date("2024-04-25T09:00:00Z"),
    imageHref: new URL("https://example.com/image30.jpg"),
    caption: "Starting the day right.",
  },
];
