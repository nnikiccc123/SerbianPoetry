import React from "react";
import "../AuthorFilter.css";
import poemsData from "../allpoems.json";

interface AuthorFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const authors = Array.from(
  new Set((poemsData as { author: string }[]).map((p) => p.author))
);

authors.unshift("all");

const AuthorFilter: React.FC<AuthorFilterProps> = ({ value, onChange }) => {
  return (
    <select
      className="author-filter"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {authors.map((authorName) => (
        <option key={authorName} value={authorName}>
          {authorName === "all" ? "Svi autori" : authorName}
        </option>
      ))}
    </select>
  );
};

export default AuthorFilter;
