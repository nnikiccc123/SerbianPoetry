// src/components/PoemList.tsx
import React, { useState, useEffect } from "react";
import PoemCard from "./PoemCard";
import "../PoemList.css";

interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
}

interface PoemListProps {
  poems: Poem[];
  onSelect: (poem: Poem) => void;
}

const PoemList: React.FC<PoemListProps> = ({ poems, onSelect }) => {
  const [visibleCount, setVisibleCount] = useState(3);

  // Resetuj visibleCount kada se promeni lista pesama
  useEffect(() => {
    setVisibleCount(3);
  }, [poems]);

  const visiblePoems = poems.slice(0, visibleCount);

  return (
    <div className="poem-list-container">
      <div className="poem-list">
        {visiblePoems.map((poem) => (
          <PoemCard
            key={poem.id}
            title={poem.title}
            author={poem.author}
            preview={poem.content.substring(0, 100) + "..."} // prvih 100 karaktera
            onSelect={() => onSelect(poem)}
          />
        ))}
      </div>

      {/* Dugme za učitavanje još */}
      {visibleCount < poems.length && (
        <button
          className="load-more-btn"
          onClick={() => setVisibleCount(visibleCount + 3)}
        >
          Prikaži još
        </button>
      )}
    </div>
  );
};

export default PoemList;
