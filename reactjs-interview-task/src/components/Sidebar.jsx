import React, { useState } from 'react';

const Sidebar = ({
  notes,
  onAddNote,
  onDeleteNote,
  activeNote,
  setActiveNote,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const sortedNotes = notes
    .filter(note => note.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => b.lastModified - a.lastModified);

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        <div className="category-container">
          <h1 className="category-title">Create new category</h1>
          <button className="add-category-button" onClick={onAddNote}>Add</button>
        </div>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search notes"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="app-sidebar-notes">
        {sortedNotes.map(({ id, title, body, lastModified }, i) => (
          <div
            key={id}
            className={`app-sidebar-note ${id === activeNote && "active"}`}
            onClick={() => setActiveNote(id)}
          >
            <div className="sidebar-note-title">
              <strong>{title}</strong>
              <button onClick={(e) => onDeleteNote(id)}>Delete</button>
            </div>
            <p>{body && body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              Last Modified{" "}
              {new Date(lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
