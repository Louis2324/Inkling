import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Not Found</h2>
      <p>That specified page can not be found</p>
      <small>Even the greatest of ninjas got lost at least once</small>
      <Link to="/"> Go back Home 😅😅 ...?</Link>
    </div>
  );
};

export default NotFound;
