import Navbar from './Navbar';
// ...
import { Link } from 'react-router-dom';
import '../css/header.css'

const Header = () => {
  return (
    <header>
      <div className="nav-area">
        <div className='logos'>&nbsp;
        </div>
        <div>

        <Link to="/" className="logo">
        </Link>
        <Navbar />
        </div>
      </div>
    </header>
  );
};

export default Header;
