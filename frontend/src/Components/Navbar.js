import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav>
      {/* other navbar content */}
      <a href="/" className="navbar-logo">
        Leetcode Battleground
      </a>
      <div className="navbar-right">
        <Link to="/login" className="navbar-btn">Log In</Link>
        <Link to="/signup" className="navbar-btn">Sign Up</Link>
        {/* <Link to= "/findbattle" className="navbar-btn">Find Battle</Link> */}
      </div>
    </nav>
  );
}

export default Navbar;
