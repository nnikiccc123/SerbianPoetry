import React from "react";
import "../PoemDetail.css";

interface PoemDetailProps {
  title: string;
  author: string;
  content: string;
  onBack: () => void;
}

const PoemDetail: React.FC<PoemDetailProps> = ({
  title,
  author,
  content,
  onBack,
}) => {
  return (
    <div className="poem-detail">
      <h2 className="poem-title">{title}</h2>
      <div className="poem-content">
        {content}
        <p className="poem-author">- {author}</p>
        <button className="back-button" onClick={onBack}>
          Nazad
        </button>
      </div>
    </div>
  );
};

export default PoemDetail;
