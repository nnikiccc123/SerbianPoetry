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
      <button className="back-button" onClick={onBack}>
        ← Nazad
      </button>
      <h2 className="poem-title">{title}</h2>
      <p className="poem-author">{author}</p>
      <div className="poem-content">{content}</div>
    </div>
  );
};

export default PoemDetail;
