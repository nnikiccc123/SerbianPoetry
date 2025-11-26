import { useState, useEffect } from "react";
import PoemList from "./components/PoemList";
import PoemDetail from "./components/PoemDetail";
import SearchBar from "./components/SearchBar";
import AuthorFilter from "./components/AuthorFilter";
import poemsData from "../allpoems.json";
import "./AppLayout.css";

interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
}

const AppLayout: React.FC = () => {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  function normalizeText(str: string) {
    return str
      .toLowerCase()
      .replace(/č/g, "c")
      .replace(/ć/g, "c")
      .replace(/đ/g, "dj")
      .replace(/š/g, "s")
      .replace(/ž/g, "z")
      .replace(/Č/g, "c")
      .replace(/Ć/g, "c")
      .replace(/Đ/g, "dj")
      .replace(/Š/g, "s")
      .replace(/Ž/g, "z");
  }

  useEffect(() => {
    setSelectedPoem(null);
  }, [search, author]);

  const filteredPoems = (poemsData as Poem[]).filter(
    (p) =>
      (normalizeText(p.title).includes(normalizeText(search)) ||
        normalizeText(p.author).includes(normalizeText(search))) &&
      (author === "all" || normalizeText(p.author) === normalizeText(author))
  );

  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Serbian Poetry</h1>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <AuthorFilter value={author} onChange={setAuthor} />
      </div>

      <main className="app-content">
        {selectedPoem ? (
          <PoemDetail
            title={selectedPoem.title}
            author={selectedPoem.author}
            content={selectedPoem.content}
            onBack={() => setSelectedPoem(null)}
          />
        ) : (
          <PoemList poems={filteredPoems} onSelect={setSelectedPoem} />
        )}
      </main>
    </div>
  );
};

export default AppLayout;
