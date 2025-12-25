import React, { useState, useEffect, useRef } from 'react';
import type { SpotlightResult } from './types';

interface SpotlightSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch?: (query: string) => SpotlightResult[];
  className?: string;
}

const SpotlightSearch: React.FC<SpotlightSearchProps> = ({
  isOpen,
  onClose,
  onSearch,
  className
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SpotlightResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (query && onSearch) {
      const searchResults = onSearch(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  }, [query, onSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      results[selectedIndex].action();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-center pt-32 z-50">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Search box */}
      <div className={`relative w-[600px] bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden ${className || ''}`}>
        {/* Input */}
        <div className="flex items-center gap-3 p-4 border-b border-gray-700">
          <span className="text-gray-400 text-xl">🔍</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Spotlight Search"
            className="flex-1 bg-transparent text-white text-lg outline-none placeholder-gray-500"
          />
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="max-h-80 overflow-y-auto">
            {results.map((result, index) => (
              <div
                key={result.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer ${
                  index === selectedIndex ? 'bg-blue-500' : 'hover:bg-white/5'
                }`}
                onClick={() => { result.action(); onClose(); }}
              >
                <div className="w-8 h-8 flex items-center justify-center text-xl">
                  {result.icon || '📄'}
                </div>
                <div className="flex-1">
                  <div className="text-white">{result.title}</div>
                  {result.subtitle && (
                    <div className="text-gray-400 text-sm">{result.subtitle}</div>
                  )}
                </div>
                <div className="text-gray-500 text-xs uppercase">{result.type}</div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {query && results.length === 0 && (
          <div className="p-8 text-center text-gray-400">
            No results for "{query}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SpotlightSearch;
