import React from "react";
import "../PoemCard.css";

interface PoemCardProps {
  title: string;
  author: string;
  preview: string;
  onSelect: () => void;
}

const PoemCard: React.FC<PoemCardProps> = ({
  title,
  author,
  preview,
  onSelect,
}) => {
  return (
    <div className="poem-card" onClick={onSelect}>
      <h2 className="poem-title">{title}</h2>
      <p className="poem-author">{author}</p>
      <p className="poem-preview">{preview}</p>
    </div>
  );
};

export default PoemCard;
