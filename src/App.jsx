import { useState } from "react";
import Logo from "./components/Logo";
import NavBar from "./components/NavBar"
import NewsFeed from "./components/NewsFeed";

const App = () => {
  const [tab, setTab] = useState("sports");

  return (
    <>
      <Logo />
      <div style={{ paddingBottom: "60px" }}>        
        <NewsFeed tab={tab}/>
      </div>
      <NavBar tab={tab} setTab={setTab}/>
    </>
  )
}

export default App
