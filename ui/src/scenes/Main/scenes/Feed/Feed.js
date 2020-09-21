import React from "react";

const Feed = () => {
  const listOfPosts = [
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
    { user: "tes user", body: "dsfg sdfg sdf gs dfg saer", date: "test date" },
  ];

  const Post = ({ post }) => (
    <div>
      <p>{post.user}</p>
      <p>{post.body}</p>
      <p>{post.date}</p>
    </div>
  );

  return (
    <div>
      {listOfPosts.map((post, indx) => {
        console.log(post, indx);
        return <Post post={post} key={indx} />;
      })}
    </div>
  );
};

export default Feed;
