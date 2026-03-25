export const users = [
  {
    id: "u1",
    name: "Rohit Kumar",
    username: "rohit",
    email: "rohit@test.com",
    avatar: "",
    bio: "Building something big 🚀",
  },
  {
    id: "u2",
    name: "Aman Singh",
    username: "aman",
    email: "aman@test.com",
    avatar: "",
    bio: "Consistency wins 💯",
  },
  {
    id: "u3",
    name: "Neha Sharma",
    username: "neha",
    email: "neha@test.com",
    avatar: "",
    bio: "Frontend dev 💻",
  },
  {
    id: "u4",
    name: "Karan Verma",
    username: "karan",
    email: "karan@test.com",
    avatar: "",
    bio: "Design + Code 🎨",
  },
];

export const posts = [
  {
    id: "p1",
    userId: "u1",
    content:
      "Just shipped a new compiler optimization that reduces build times by 40%. The key insight was memoizing the AST traversal—sometimes the simplest solutions are the most effective. 🚀",
    image: "",
    createdAt: "2026-03-18T10:00:00Z",
  },
  {
    id: "p2",
    userId: "u2",
    content:
      "Unpopular opinion: most  are just distributed monoliths with extra network latency. Start with a modular monolith",
    image: "",
    createdAt: "2026-03-18T11:00:00Z",
  },
  {
    id: "p3",
    userId: "u3",
    content:
      "Error handling is not an afterthought—it is the architecture. If your happy path is beautiful but your error path is chaos, you have not designed a system",
    image: "",
    createdAt: "2026-03-18T12:00:00Z",
  },
  {
    id: "p4",
    userId: "u4",
    content:
      "A ship in port is safe, but that's not what ships are built for. Same goes for code sitting in a branch. Deploy early, deploy often. 🎨",
    image: "",
    createdAt: "2026-03-18T13:00:00Z",
  },
  {
    id: "p5",
    userId: "u1",
    content:
      "Reading through the new WebAssembly GC proposal. The implications for language interop on the web are massive. This could fundamentally change how we think about polyglot architectures🔥",
    image: "",
    createdAt: "2026-03-18T14:00:00Z",
  },
];

export const comments = [
  {
    id: "c1",
    postId: "p1",
    userId: "u2",
    text: "Let’s go 🔥",
    createdAt: "2026-03-18T10:10:00Z",
  },
  {
    id: "c2",
    postId: "p1",
    userId: "u3",
    text: "Keep pushing 💪",
    createdAt: "2026-03-18T10:12:00Z",
  },
  {
    id: "c3",
    postId: "p2",
    userId: "u1",
    text: "True bro 💯",
    createdAt: "2026-03-18T11:05:00Z",
  },
  {
    id: "c4",
    postId: "p3",
    userId: "u4",
    text: "React is love ❤️",
    createdAt: "2026-03-18T12:10:00Z",
  },
];

export const likes = [
  { id: "l1", postId: "p1", userId: "u2" },
  { id: "l2", postId: "p1", userId: "u3" },
  { id: "l3", postId: "p2", userId: "u1" },
  { id: "l4", postId: "p3", userId: "u2" },
  { id: "l5", postId: "p4", userId: "u3" },
];

export const bookmarks = [
  { id: "b1", postId: "p1", userId: "u1" },
  { id: "b2", postId: "p3", userId: "u2" },
];
