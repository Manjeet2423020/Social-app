import { IoLogoMastodon } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { MdDarkMode } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { useAuth } from "../context/AuthContext";
import { useSelector, useDispatch } from "react-redux";
import { addPosts } from "../features/post/postSlice";
import { BiComment } from "react-icons/bi";
import { useState } from "react";
import { toggleLike } from "../features/like/likeSlice";
import { addComment } from "../features/comment/commentSlice";

const Feed = () => {
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  return (
    <div className="">
      <div className="w-full border-b border-gray-300 h-20 bg-yellow-50/10  ">
        <div className="px-[25%] flex h-full  ">
          <div className="flex justify-between h-full items-center w-full">
            <div className="flex items-center text-2xl gap-2">
              <div className="bg-violet-100 h-10 w-10 rounded-2xl items-center justify-center text-violet-700">
                <IoLogoMastodon className="mt-2 ml-2" />
              </div>
              <h1 className="font-bold text-xl"> Pulse</h1>
            </div>
            <div className="flex  gap-4 text-xl ">
              <input
                className="w-100 bg-gray-200 h-10 rounded-2xl p-2"
                type="text"
                placeholder="search"
              />
              <button>
                <MdDarkMode className="text-2xl" />
              </button>
              <div className="h-10 w-10 rounded-full bg-amber-300 border-gray-200 border flex items-center justify-center text-xl text-white">
                <h1>{user?.email?.slice(0, 2).toUpperCase()}</h1>
                <h1>{user?.displayname?.slice(0, 2).toUpperCase()}</h1>
                {/* <FaUser /> */}
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate("/login");
                }}
                className="text-gray-500"
              >
                <MdLogout />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-[25%] pt-3 bg-yellow-50/10">
        {/* mockdata ui */}

        <div className="flex flex-col gap-6">
          {/* input box */}

          <div className="flex flex-col gap-4 h-auto p-5 relative rounded-2xl bg-white  shadow-[0_0_10px_rgba(0,0,0,0.1)]">
            <div className="div">
              <div className="flex gap-3">
                <div className="h-10 w-10 bg-sky-200 rounded-full flex items-center justify-center font-bold">
                  {(user?.displayname || user?.email)
                    ?.slice(0, 2)
                    .toUpperCase()}
                </div>
                <input
                  className="w-full outline-none  "
                  type="text"
                  placeholder="What's on your mind"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  onFocus={() => setIsActive(true)}
                />
              </div>

              {isActive && (
                <div className="flex gap-3 justify-end border-t border-gray-300 mt-10 pt-3">
                  <button
                    onClick={() => {
                      setIsActive(false);
                      setContent("");
                    }}
                    className=" px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      handlePost();
                      setIsActive(false);
                    }}
                    className="text-white px-3 py-2 rounded-xl flex items-center gap-2 font-semibold bg-violet-800/80 "
                  >
                    <FiSend /> Post
                  </button>
                </div>
              )}
            </div>
          </div>
          {allPosts.map((post) => {
            const postOwner = allUsers.find((user) => user.id === post.userId);
            const postComments = allComments.filter(
              (c) => c.postId === post.id,
            );
            const postLikes = allLikes.filter((l) => l.postId === post.id);

            return (
              <div
                className="flex flex-col gap-4 h-auto p-5  rounded-2xl bg-white  shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                key={post.id}
              >
                <div className="flex gap-3">
                  <div className="flex gap-2">
                    <div className="h-10 w-10 bg-sky-200 rounded-full flex items-center justify-center font-bold ">
                      {(postOwner?.name || post.name)
                        ?.slice(0, 2)
                        .toUpperCase()}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                      <h4 className="font-semibold text-xl">
                        {postOwner?.name}
                      </h4>
                      <h4 className="text-gray-500">{postOwner?.username}</h4>
                      <h4 className="font-semibold text-xl">{post.name}</h4>
                    </div>
                    <p className="text-gray-600 text-lg">{post.content}</p>
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
                        <button className="flex items-center text-base hover:bg-gray-200 rounded-2xl p-1 px-3 gap-2">
                          {" "}
                          <CiHeart className="text-2xl font-bold" />
                          {postLikes.length}
                        </button>
                      </div>
                      <div
                        className="pt-1.5 cursor-pointer"
                        onClick={() => handleToggleComments(post.id)}
                      >
                        <button className="flex items-center text-lg hover:bg-gray-200 rounded-2xl p-1 px-3 gap-2">
                          <BiComment />
                          {postComments.length}
                        </button>
                      </div>
                    </div>
                    {openComments[post.id] && (
                      <div className="border-t border-gray-300 w-full mt-2">
                        {postComments.map((c) => {
                          const commentUser = allUsers.find(
                            (u) => u.id === c.userId,
                          );

                          return (
                            <div
                              key={c.id}
                              className="flex gap-3 h-auto mt-3 items-center"
                            >
                              <div className="h-10 w-10 bg-violet-900 rounded-full flex items-center  justify-center text-base font-semibold text-white">
                                {(commentUser?.name || "U")
                                  .slice(0, 2)
                                  .toUpperCase()}
                              </div>
                              <p>
                                <span className="font-semibold mr-1">
                                  {commentUser?.name || "User"}
                                </span>
                                <p className="text-gray-400">{c.text}</p>
                              </p>
                            </div>
                          );
                        })}

                        {/* input comment */}

                        <div className="flex gap-2 items-center">
                          <input
                            type="text"
                            className="bg-gray-200 rounded-2xl p-2 flex-1 mt-2 outline-none "
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
