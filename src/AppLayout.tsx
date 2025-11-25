import type { ReactNode } from "react";
import AuthorFilter from "./components/AuthorFilter";
import SearchBar from "./components/SearchBar";
import "./AppLayout.css"; // povezuje CSS fajl

interface AppLayoutProps {
  children: ReactNode;
  search: string;
  setSearch: (value: string) => void;
  author: string;
  setAuthor: (value: string) => void;
}

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  search,
  setSearch,
  author,
  setAuthor,
}) => {
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1>Serbian poetry</h1>
      </header>

      <div className="controls">
        <SearchBar value={search} onChange={setSearch} />
        <AuthorFilter value={author} onChange={setAuthor} />
      </div>

      <main className="app-content">{children}</main>
    </div>
  );
};

export default AppLayout;
