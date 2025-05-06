// src/utils/htmlParser.ts

import type { ArticleImage, ArticleTable } from "../types";

export function parseHtmlContent(html: string): {
  title: string;
  content: string;
  images: ArticleImage[];
  tables: ArticleTable[];
} {
  // Criar um elemento DOM temporário para extrair informações
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  
  // Extrair o título
  const title = doc.querySelector('title')?.textContent || 
                doc.querySelector('h1')?.textContent || 
                'Artigo Sem Título';
  
  // Extrair o conteúdo principal
  let contentElement = doc.querySelector('article') || 
                       doc.querySelector('.article-content') ||
                       doc.querySelector('.content') ||
                       doc.querySelector('main');
  
  if (!contentElement) {
    // Tentativa de identificar o conteúdo através de heurísticas
    const possibleContentElements = Array.from(doc.querySelectorAll('div')).filter(div => {
      const text = div.textContent || '';
      return text.length > 1000 && div.querySelectorAll('p').length > 3;
    });
    
    if (possibleContentElements.length > 0) {
      // Selecionar o elemento com mais texto
      contentElement = possibleContentElements.reduce((prev, current) => 
        (prev.textContent || '').length > (current.textContent || '').length ? prev : current
      );
    } else {
      contentElement = doc.body;
    }
  }
  
  // Extrair imagens
  const images: ArticleImage[] = [];
  contentElement.querySelectorAll('img').forEach(img => {
    const src = img.getAttribute('src') || '';
    if (src && !src.includes('data:image') && !src.includes('icon') && !src.includes('logo')) {
      // Converter URLs relativas para absolutas
      const absoluteSrc = convertToAbsoluteUrl(src, html);
      
      images.push({
        src: absoluteSrc,
        alt: img.getAttribute('alt') || '',
        width: img.width || undefined,
        height: img.height || undefined
      });
    }
  });
  
  // Extrair tabelas
  const tables: ArticleTable[] = [];
  contentElement.querySelectorAll('table').forEach(table => {
    const caption = table.querySelector('caption')?.textContent;
    tables.push({
      html: table.outerHTML,
      caption: caption
    });
  });
  
  // Extrair e preservar parágrafos para o conteúdo
  const paragraphs = Array.from(contentElement.querySelectorAll('p, h1, h2, h3, h4, h5, h6'))
    .map(p => p.textContent?.trim())
    .filter(p => p && p.length > 0);
  
  const content = paragraphs.join('\n\n');
  
  return {
    title,
    content,
    images,
    tables
  };
}

// Função para converter URLs relativas em absolutas
function convertToAbsoluteUrl(relativeUrl: string, html: string): string {
  if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
    return relativeUrl;
  }
  
  try {
    // Extrair a URL base do HTML
    const baseMatch = html.match(/<base\s+href=["']([^"']+)["']/i);
    let baseUrl = baseMatch?.[1];
    
    if (!baseUrl) {
      // Extrair a URL do documento
      const urlMatch = html.match(/<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']/i);
      baseUrl = urlMatch?.[1];
      
      if (!baseUrl) {
        // Usar uma URL padrão (pode precisar ser ajustada)
        baseUrl = 'https://example.com';
      }
    }
    
    // Criar URL absoluta
    const url = new URL(relativeUrl, baseUrl);
    return url.href;
  } catch (error) {
    console.error('Erro ao converter URL relativa:', error);
    return relativeUrl;
  }
}