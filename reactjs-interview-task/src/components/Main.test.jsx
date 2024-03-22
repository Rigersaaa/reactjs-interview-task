import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 
import Main from './Main'; 

test('renders correctly', () => {
    const activeNote = {
        id: 1,
        title: 'Test Note',
        body: '# Test Content',
        lastModified: Date.now()
    };
    const onUpdateNote = jest.fn(); 

    render(<Main activeNote={activeNote} onUpdateNote={onUpdateNote} />);

    
    expect(screen.getByPlaceholderText('Note Title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your note here...')).toBeInTheDocument();

   
    expect(screen.getByDisplayValue('Test Note')).toBeInTheDocument();
    expect(screen.getByDisplayValue('# Test Content')).toBeInTheDocument();

    
    fireEvent.change(screen.getByPlaceholderText('Note Title'), { target: { value: 'Updated Title' } });
    expect(onUpdateNote).toHaveBeenCalledWith({
        ...activeNote,
        title: 'Updated Title',
        lastModified: expect.any(Number)
    });

    
    fireEvent.change(screen.getByPlaceholderText('Write your note here...'), { target: { value: 'Updated Body' } });
    expect(onUpdateNote).toHaveBeenCalledWith({
        ...activeNote,
        body: 'Updated Body',
        lastModified: expect.any(Number)
    });
});
