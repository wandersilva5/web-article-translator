// src/components/ArticleForm.tsx
import React, { useState } from 'react';

interface ArticleFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ onSubmit, isLoading }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples da URL
    if (!url) {
      setError('Por favor, insira uma URL');
      return;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Por favor, insira uma URL válida começando com http:// ou https://');
      return;
    }

    setError('');
    onSubmit(url);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Tradutor de Artigos Web</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
            URL do Artigo
          </label>
          <input
            type="text"
            id="url"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/article"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isLoading}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded font-medium ${
            isLoading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Processando...' : 'Traduzir Artigo'}
        </button>
      </form>
    </div>
  );
};

export default ArticleForm;