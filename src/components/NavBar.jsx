import "../css/NavBar.css";
import { Home, Disc3, FerrisWheel } from "lucide-react"; 

const NavBar = () => {
  return (
    <nav className="navbar">
      <a href="#" className="nav-item">
        <Home size={22} />
        <span>NathanGram</span>
      </a>
      <a href="#" className="nav-item">
        <Disc3 size={22} />
        <span>Tab2</span>
      </a>
      <a href="#" className="nav-item">
        <FerrisWheel size={22} />
        <span>Tab3</span>
      </a>
    </nav>
  )
}

export default NavBar
