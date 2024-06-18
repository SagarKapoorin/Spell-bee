import React, { useState, useRef, useEffect } from 'react';
import './ResizableTextarea.css';

const ResizableTextarea = ({ value, onChange }) => {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="resizable-textarea"
      placeholder="Enter large amount of text here..."
    />
  );
};

export default ResizableTextarea;
