import BlogList from "./BlogList";
import useAxios from "./useAxios";
const Home = () => {
  const {
    data: blogs,
    isPending,
    error,
  } = useAxios("/blogs/");

  return (
    <div className="home">
      {error && <div> {error} </div>}
      {isPending && <div className="loading"> Loading...</div>}
      {!isPending && blogs && <BlogList blogs={blogs} title="All Blogs" />}
    </div>
  );
};

export default Home;
