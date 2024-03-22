import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Sidebar from './Sidebar'; 

test('renders correctly', () => {
    const notes = [
      { id: 1, title: 'Note 1', body: 'Body of Note 1...', lastModified: Date.now() },
      { id: 2, title: 'Note 2', body: 'Body of Note 2...', lastModified: Date.now() }
    ];
  
    const { getByText, getAllByText } = render(<Sidebar notes={notes} />);
  
    expect(getByText('Notes')).toBeInTheDocument();
  
    
    notes.forEach(note => {
      expect(getByText(note.title)).toBeInTheDocument();
    });
  
    const bodyElements = getAllByText(/Body of Note/);
    expect(bodyElements.length).toBe(notes.length); 
  });
