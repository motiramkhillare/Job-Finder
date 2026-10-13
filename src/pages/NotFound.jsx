import { Link } from "react-router-dom";
import { primaryButton } from "../utils/styles";

function NotFound() {
  return (
    <div className="space-y-4 py-16 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-gray-500 dark:text-gray-400">This page does not exist.</p>
      <Link to="/" className={`${primaryButton} inline-block`}>
        Go home
      </Link>
    </div>
  );
}

export default NotFound;