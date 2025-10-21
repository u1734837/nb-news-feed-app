import { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import "../css/NewsFeed.css";

const NewsFeed = ({ tab }) => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feedMap = {
          sports: [
            "https://www.liverpool.com/liverpool-fc-news/?service=rss",
            "https://feeds.bbci.co.uk/sport/tennis/rss.xml",
            "https://feeds.bbci.co.uk/sport/football/rss.xml"
          ],
          music: ["https://www.edmprod.com/feed/"],
          random: ["https://investor.gopro.com/rss/pressrelease.aspx"],
        };

        const urls = feedMap[tab] || [];
        let allItems = [];

        for (const url of urls) {
        const CORS_PROXY = "https://api.allorigins.win/raw?url=";
        const res = await fetch(CORS_PROXY + url);
        const xmlText = await res.text();
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlText, "application/xml");
        const channelImage = xml.querySelector("channel > image > url")?.textContent;

        const items = [...xml.querySelectorAll("item")].map((item) => {
            const pubDate = item.querySelector("pubDate")?.textContent || null;
            const descriptionHTML = item.querySelector("description")?.textContent || "";
          
            // Try enclosure first (Liverpool)
            let imageUrl = item.querySelector("enclosure")?.getAttribute("url");
          
            // Then try media:thumbnail (BBC)
            if (!imageUrl) {
              const mediaThumbnail = item.getElementsByTagNameNS(
                "http://search.yahoo.com/mrss/", // media namespace
                "thumbnail"
              )[0];
              if (mediaThumbnail) imageUrl = mediaThumbnail.getAttribute("url");
            }
          
            // Then try media:content (some feeds)
            if (!imageUrl) {
              const mediaContent = item.getElementsByTagNameNS(
                "http://search.yahoo.com/mrss/",
                "content"
              )[0];
              if (mediaContent) imageUrl = mediaContent.getAttribute("url");
            }
          
            // Fallback: parse description HTML
            if (!imageUrl) {
              const tempDiv = document.createElement("div");
              tempDiv.innerHTML = descriptionHTML;
              const imgTag = tempDiv.querySelector("img");
              imageUrl = imgTag?.src;
            }
          
            // Final fallback
            if (!imageUrl) imageUrl = channelImage || "https://placehold.co/600x300?text=News+Image";
          
            return {
              title: item.querySelector("title")?.textContent || "No title",
              summary: descriptionHTML.replace(/<[^>]*>/g, ""),
              url: item.querySelector("link")?.textContent || "#",
              image: imageUrl,
              pubDate,
            };
          });               
          
          

        allItems = allItems.concat(items);
        }

        // Sort ALL articles by date, newest first
        allItems.sort((a, b) => {
        const dateA = a.pubDate ? new Date(a.pubDate).getTime() : 0;
        const dateB = b.pubDate ? new Date(b.pubDate).getTime() : 0;
        return dateB - dateA;
        });

        setArticles(allItems);

      } catch (error) {
        console.error("Error fetching feed:", error);
      }
    };

    fetchFeed();
  }, [tab]);

  return (
    <div className="news-feed">
      {articles.length === 0 ? (
        <p className="loading-text">Loading latest news...</p>
      ) : (
        articles.map((article, i) => <NewsCard key={i} {...article} />)
      )}
    </div>
  );
};

export default NewsFeed;
