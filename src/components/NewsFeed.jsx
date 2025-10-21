import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "../css/NewsFeed.css";

const NewsFeed = () => {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
      const fetchFeed = async () => {
        try {
            const CORS_PROXY = "https://api.allorigins.win/raw?url=";
            const FEED_URL = "https://www.liverpool.com/liverpool-fc-news/?service=rss";
            const res = await fetch(CORS_PROXY + FEED_URL);
            const xmlText = await res.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, "application/xml");
    
            const items = [...xml.querySelectorAll("item")].map(item => ({
              title: item.querySelector("title")?.textContent || "",
              summary: item.querySelector("description")?.textContent || "",
              url: item.querySelector("link")?.textContent || "",
              image: item.querySelector("enclosure")?.getAttribute("url") || "https://placehold.co/600x300?text=News+Image",
            }));
  
          setArticles(items);
        } catch (error) {
          console.error("Error fetching feed:", error);
        }
      };
  
      fetchFeed();
    }, []);


    return (
        <div className="news-feed">
            {articles.length === 0 ? (
                <p className="loading-text">Loading latest news...</p>
            ) : (
                articles.map((article, i) => <NewsCard key={i} {...article} />)
            )}
        </div>
    );
}

export default NewsFeed
