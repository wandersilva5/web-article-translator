# Tradutor de Artigos Web para Português

Este projeto é uma aplicação React com Vite e TypeScript que permite traduzir artigos da web para português brasileiro. A aplicação extrai o conteúdo, imagens e tabelas de um artigo a partir de uma URL e gera um documento Word com o conteúdo traduzido.

## Funcionalidades

- Extração de conteúdo, imagens e tabelas de artigos na web
- Tradução automática para português brasileiro
- Geração de documento Word com o conteúdo traduzido
- Preservação de imagens e tabelas
- Interface amigável e responsiva

## Pré-requisitos

- Node.js 16+ 
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/web-article-translator.git
cd web-article-translator
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse a aplicação em seu navegador:
```
http://localhost:3000
```

## Como usar

1. Na página inicial, insira a URL de um artigo que você deseja traduzir
2. Clique em "Traduzir Artigo"
3. A aplicação irá extrair e exibir o conteúdo original do artigo
4. Em seguida, a aplicação irá traduzir o conteúdo para português brasileiro
5. Você pode visualizar a tradução e baixar um documento Word com o conteúdo traduzido

## Limitações

- A aplicação utiliza APIs de tradução gratuitas, que podem ter limites de uso
- A extração de conteúdo pode não funcionar perfeitamente em todos os sites
- Alguns sites podem bloquear a extração de conteúdo por questões de CORS

## Tecnologias utilizadas

- React 18
- TypeScript
- Vite
- TailwindCSS
- Docx.js (para geração de documentos Word)
- LibreTranslate / HuggingFace (para tradução)

## Melhorias futuras

- Adicionar suporte para outros idiomas
- Melhorar a extração de conteúdo em sites com estruturas complexas
- Adicionar suporte para autenticação em sites que exigem login
- Implementar cache de tradução para melhorar o desempenho
- Suporte a tradução offline com modelos locais

## Licença

Este projeto está licenciado sob a Licença MIT.