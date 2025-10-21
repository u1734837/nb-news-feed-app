import "../css/ReadMoreButton.css";

const ReadMoreButton = ({ url }) => {
  return (
    <button className="read-more-btn" onClick={() => window.open(url, "_blank")}>
        Read more
    </button>
  )
}

export default ReadMoreButton
