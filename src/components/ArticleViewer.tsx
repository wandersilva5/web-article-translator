// src/components/ArticleViewer.tsx
import React from 'react';
import parse from 'html-react-parser';
import type { Article } from '../types';

interface ArticleViewerProps {
  article: Article;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ article }) => {
  if (!article) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Artigo Original</h2>
      <h3 className="text-lg font-bold">{article.title}</h3>
      
      <div className="mt-4">
        {article.content.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-3">{paragraph}</p>
        ))}
      </div>
      
      {article.images.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold mb-2">Imagens ({article.images.length})</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {article.images.map((image, index) => (
              <div key={index} className="border rounded p-2">
                <img 
                  src={image.src} 
                  alt={image.alt || `Imagem ${index + 1}`} 
                  className="max-w-full h-auto"
                />
                <p className="text-sm text-gray-600 mt-1">{image.alt}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {article.tables.length > 0 && (
        <div className="mt-6">
          <h4 className="font-bold mb-2">Tabelas ({article.tables.length})</h4>
          {article.tables.map((table, index) => (
            <div key={index} className="mb-4">
              {table.caption && <p className="font-medium mb-1">{table.caption}</p>}
              <div className="overflow-x-auto">
                {parse(table.html)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleViewer;