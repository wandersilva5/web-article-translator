// src/services/articleService.ts
import axios from 'axios';
import { parseHtmlContent } from '../utils/htmlParser';
import type { Article } from '../types';

export async function fetchArticle(url: string): Promise<Article> {
  try {
    // Para contornar problemas de CORS, usamos um serviço de proxy
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    
    const response = await axios.get(proxyUrl);
    
    if (!response.data || !response.data.contents) {
      throw new Error('Não foi possível obter o conteúdo da página');
    }
    
    const html = response.data.contents;
    
    // Extrair título, conteúdo, imagens e tabelas do HTML
    const { title, content, images, tables } = parseHtmlContent(html);
    
    return {
      title,
      content,
      images,
      tables,
      url
    };
  } catch (error) {
    console.error('Erro ao buscar o artigo:', error);
    throw new Error('Não foi possível buscar o artigo. Verifique a URL e tente novamente.');
  }
}