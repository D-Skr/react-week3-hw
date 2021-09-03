import React, { useEffect } from "react";
import axios from "axios";

interface IPost {
  id: number;
  userId?: number;
  title: string;
  body: string;
}

const defaultPosts: IPost[] = [];
const defaultLoadingState = true;

type SetPostsHook = (posts: IPost[]) => void;
type SetLoadingHook = (loading: boolean) => void;

function App() {
  const [posts, setPosts]: [IPost[], SetPostsHook] =
    React.useState(defaultPosts);
  const [loading, setLoading]: [boolean, (loading: boolean) => void] =
    React.useState<boolean>(true);
  const [error, setError]: [string, (error: string) => void] =
    React.useState("");

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      console.log("got response, data is", response.data);
      setPosts(response.data);
      setLoading(false);
      console.log("posts state is ", posts);
      console.log("loading state is ", loading);
    });
  }, []);

  return (
    <div className="App">
      <ul className="posts">
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
