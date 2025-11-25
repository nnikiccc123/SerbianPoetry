import React, { useState } from "react";
import AppLayout from "./AppLayout";
import PoemList from "./components/PoemList";
import PoemDetail from "./components/PoemDetail";
import poemsData from "./poems.json"; // JSON fajl sa pesmama

interface Poem {
  id: string;
  title: string;
  author: string;
  content: string;
}

function App() {
  const [search, setSearch] = useState("");
  const [author, setAuthor] = useState("all");
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);

  // Filter koji proverava search po naslovu ili autoru, i dodatni filter po selektovanom autoru
  const filteredPoems = (poemsData as Poem[]).filter(
    (p) =>
      (p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.author.toLowerCase().includes(search.toLowerCase())) &&
      (author === "all" || p.author === author)
  );

  return (
    <AppLayout
      search={search}
      setSearch={setSearch}
      author={author}
      setAuthor={setAuthor}
    >
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
    </AppLayout>
  );
}

export default App;
