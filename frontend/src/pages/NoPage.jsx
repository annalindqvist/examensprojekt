// REACT IMPORTS
import { Link } from "react-router-dom";

const NoPage = () => {
  return <div className="pink-background centered-content-column">
    <h1>Sorry page not found - 404.</h1>
    <Link to="/">
      <p>Go to startpage!</p>
    </Link>
  </div>;
};

export default NoPage;