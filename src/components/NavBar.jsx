import "../css/NavBar.css";
import { Home, Disc3, FerrisWheel } from "lucide-react"; 

const NavBar = ({ tab, setTab }) => {
  return (
    <nav className="navbar">
      <button className={`nav-item ${tab === "sports" ? "active" : ""}`} 
      onClick={() => setTab("sports")}>
        <Home size={22} />
        <span>Sports</span>
      </button>
      <button className={`nav-item ${tab === "music" ? "active" : ""}`} 
      onClick={() => setTab("music")}>
        <Disc3 size={22} />
        <span>Music</span>
      </button>
      <button className={`nav-item ${tab === "random" ? "active" : ""}`}
       onClick={() => setTab("random")}>
        <FerrisWheel size={22} />
        <span>Random</span>
      </button>
    </nav>
  )
}

export default NavBar
