import { IoLogoMastodon } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdOutlineDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { IoMdHeart } from "react-icons/io";
import { ImPower } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addPosts } from "../features/post/postSlice";
import { BiComment } from "react-icons/bi";
import { useState } from "react";
import { toggleLike } from "../features/like/likeSlice";
import { addComment } from "../features/comment/commentSlice";
import { useTheme } from "../context/ThemeContext";

const Feed = () => {
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [search, setSearch] = useState("");
  const [bookmarks, setBookmarks] = useState([]);

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { theme, toggleTheme } = useTheme();

  const allPosts = useSelector((state) => state.posts.posts);
  const allUsers = useSelector((state) => state.users.users);
  const allComments = useSelector((state) => state.comments.comments);
  const allLikes = useSelector((state) => state.likes.likes);

  const handlePost = () => {
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      content: content,
      userId: user.id,
      name: user.displayname || user.email,
      username: user.email,
    };

    dispatch(addPosts(newPost));
    setContent("");
  };

  const handleToggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const toggleBookmark = (postId) => {
    if (bookmarks.includes(postId)) {
      setBookmarks(bookmarks.filter((id) => id !== postId));
    } else {
      setBookmarks([...bookmarks, postId]);
    }
  };

  const colors = ["bg-red-300", "bg-blue-300", "bg-purple-300"];
  const [bg] = useState(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  });

  return (
    <div
      className={
        theme === "dark" ? "bg-black text-white" : "bg-white text-black"
      }
    >
      <div className=" border-b border-gray-300 h-15   ">
        <div className="lg:px-[28%] flex justify-center  px-10 h-full bg-black/2  ">
          <div className="flex justify-between h-full items-center lg:w-full md:w-full  sm:px-10 md:px-10 lg:px-0 transition-all duration-300">
            <div className="flex items-center text-2xl gap-2">
              <div className=" dark:bg-white/20 bg-gray-200 h-8 w-8 rounded-xl flex items-center justify-center text-violet-700">
                <ImPower className=" text-lg" />
              </div>
              <h1 className="font-bold text-lg"> Pulse</h1>
            </div>
            <div className="flex  gap-4 text-xl items-center relative ">
              <span className="absolute left-7 -translate-y-1/2 top-1/2 text-base text-gray-500">
                <CiSearch />
              </span>
              <input
                className="lg:w-55 md:w-50 sm:w-40 w-20 ml-5  bg-black/5 h-8 outline-none rounded-xl pl-8 text-xs transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500 "
                type="text"
                placeholder=" search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <button onClick={toggleTheme}>
                <MdOutlineDarkMode className="text-lg text-gray-500 cursor-pointer" />
              </button>
              <div
                className={`${bg} h-8 w-8 rounded-full  border-2 border-gray-200  flex items-center justify-center text-xs font-bold text-white`}
              >
                <h1>{user?.email?.slice(0, 2).toUpperCase()}</h1>
                <h1>{user?.displayname?.slice(0, 2).toUpperCase()}</h1>
                {/* <FaUser /> */}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-gray-500 text-lg cursor-pointer"
              >
                <MdLogout />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:px-[28%] sm:flex justify-center sm:px-[10%] px-10 pt-8 bg-black/2 transition-all duration-300">
        {/* mockdata ui */}

        <div className="flex flex-col gap-6">
          {/* input box */}

          <div className="flex flex-col gap-4 h-auto p-5 relative rounded-2xl bg-white/8  shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            <div className="">
              <div className="flex gap-3">
                <div
                  className={` ${bg} h-10 w-10  rounded-full border-2 border-gray-200 flex items-center justify-center font-bold text-white`}
                >
                  {(user?.displayname || user?.email)
                    ?.slice(0, 2)
                    .toUpperCase()}
                </div>
                <input
                  className="w-full outline-none  placeholder-gray-400 dark:placeholder-gray-500  "
                  type="text"
                  placeholder="What's on your mind"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setIsActive(true)}
                />
              </div>

              {isActive && (
                <div className="flex gap-3 justify-end border-t border-gray-300 mt-10 pt-3 ">
                  <button
                    onClick={() => {
                      setIsActive(false);
                      setContent("");
                    }}
                    className=" px-3 py-1 rounded h-8 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handlePost();
                      setIsActive(false);
                    }}
                    disabled={content.trim() === ""}
                    className={`text-white h-8 px-3 py-2 rounded-xl flex items-center gap-2 font-semibold  ${content.trim() === "" ? "bg-violet-300 " : "bg-violet-400 hover:bg-violet-500 cursor-pointer"}`}
                  >
                    <FiSend /> Post
                  </button>
                </div>
              )}
            </div>
          </div>
          {allPosts
            .filter((post) => {
              const text = search.toLowerCase();
              const postOwner = allUsers.find((u) => u.id === post.userId);
              const name = postOwner?.name || post.name || "";

              return (
                post.content.toLowerCase().includes(text) ||
                name.toLowerCase().includes(text)
              );
            })
            .map((post) => {
              const postOwner = allUsers.find(
                (user) => user.id === post.userId,
              );
              const postComments = allComments.filter(
                (c) => c.postId === post.id,
              );
              const postLikes = allLikes.filter((l) => l.postId === post.id);
              const liked = postLikes.some((like) => like.userId === user.id);
              const bookmarked = bookmarks.includes(post.id);

              return (
                <div
                  className="flex flex-col gap-4 h-auto p-5  rounded-2xl bg-white/8  shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                  key={post.id}
                >
                  <div className="flex gap-3">
                    <div className="flex gap-2">
                      <div
                        className={` ${bg} h-10 w-10 border-2 border-gray-200 rounded-full flex items-center justify-center font-bold text-white `}
                      >
                        {(postOwner?.name || post.name)
                          ?.slice(0, 2)
                          .toUpperCase()}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="flex  items-center ">
                        <h4 className="font-semibold text-base">
                          {postOwner?.name}
                        </h4>
                        <h4 className="text-gray-500 text-sm ">
                          {postOwner?.username}
                        </h4>
                        <h4 className="font-semibold text-base">{post.name}</h4>
                      </div>
                      <p className=" text-sm">{post.content}</p>
                      <div className="flex gap-2 text-lg text-gray-500 items-center">
                        <div
                          className=""
                          onClick={() =>
                            dispatch(
                              toggleLike({
                                postId: post.id,
                                userId: user.id,
                              }),
                            )
                          }
                        >
                          <button className="flex items-center text-base hover:bg-white/10 rounded-2xl p-1 px-3 gap-2">
                            {" "}
                            <IoMdHeart
                              className={`text-2xl cursor-pointer ${
                                liked ? "text-red-500" : "text-gray-300"
                              }`}
                            />
                            {postLikes.length}
                          </button>
                        </div>
                        <div
                          className=" cursor-pointer"
                          onClick={() => handleToggleComments(post.id)}
                        >
                          <button className="flex items-center text-lg hover:bg-white/10 rounded-2xl p-1 px-3 gap-2 cursor-pointer">
                            <BiComment />
                            {postComments.length}
                          </button>
                        </div>
                        <div
                          onClick={() => toggleBookmark(post.id)}
                          className="ml-auto"
                        >
                          <button className="flex items-center justify-end-safe text-base hover:bg-white/10 rounded-2xl p-1 px-3 gap-2 cursor-pointer">
                            <FaBookmark
                              className={`text-xl ${bookmarked ? "text-violet-500" : "text-gray-300"}`}
                            />
                          </button>
                        </div>
                      </div>
                      {openComments[post.id] && (
                        <div className="border-t border-gray-300 w-full mt-2">
                          {postComments.map((c) => {
                            const commentUser =
                              allUsers.find((u) => u.id === c.userId) || user;

                            return (
                              <div
                                key={c.id}
                                className="flex gap-3 h-auto mt-3 items-center"
                              >
                                <div className="h-10 w-10 border-2 border-gray-200 bg-violet-900/80 rounded-full flex items-center  justify-center text-sm font-semibold text-white">
                                  {(commentUser?.name || "U")
                                    .slice(0, 2)
                                    .toUpperCase()}
                                </div>
                                <div>
                                  <span className="font-semibold mr-1">
                                    {commentUser?.name || "User"}
                                  </span>
                                  <p className="text-gray-400  text-sm">
                                    {c.text}
                                  </p>
                                </div>
                              </div>
                            );
                          })}

                          {/* input comment */}

                          <div className="flex gap-2  w-full items-center">
                            <input
                              type="text"
                              className="bg-gray-300 dark:bg-white/10  placeholder-gray-400  rounded-2xl p-2  flex-1 mt-2 outline-none "
                              placeholder="Write a reply..."
                              value={commentInputs[post.id] || ""}
                              onChange={(e) =>
                                setCommentInputs({
                                  ...commentInputs,
                                  [post.id]: e.target.value,
                                })
                              }
                            />
                            <button
                              className="outline-none bg-violet-900/90 text-white rounded-xl p-2.5 font-semibold   "
                              onClick={() => {
                                if (!commentInputs[post.id]) return;
                                dispatch(
                                  addComment({
                                    id: Date.now(),
                                    postId: post.id,
                                    text: commentInputs[post.id],
                                    userId: user.id,
                                    name: user.displayname || user.email,
                                  }),
                                );
                                setCommentInputs({
                                  ...commentInputs,
                                  [post.id]: "",
                                });
                              }}
                            >
                              <FiSend />
                            </button>
                          </div>
                        </div>
                      )}
                      {/* <div className="border-t border-gray-300 w-full ">
                      {postComments.map((c) => (
                        <p key={c.id}>{c.text}</p>
                      ))}
                    </div> */}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Feed;
