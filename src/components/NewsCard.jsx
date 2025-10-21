import ReadMoreButton from "./ReadMoreButton"
import "../css/NewsCard.css";

const NewsCard = ({ title, image, summary, url }) => {
  return (
    <div className="news-card">
        <img src={image} alt={title} className="news-image" />
        <div className="news-content">
            <h3 className="news-title">{title}</h3>
            <p className="news-summary">{summary}</p>
            <ReadMoreButton url={url}/>
        </div>      
    </div>
  )
}

export default NewsCard
