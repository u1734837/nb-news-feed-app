import Logo from "./components/Logo";
import NavBar from "./components/NavBar"
import NewsFeed from "./components/NewsFeed";

const App = () => {
  return (
    <>
      <Logo />
      <div style={{ paddingBottom: "60px" }}>        
        <NewsFeed />
      </div>
      <NavBar />
    </>
  )
}

export default App
