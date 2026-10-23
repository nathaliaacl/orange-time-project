# Orange Futebol Clube Recife — Site (base HTML/CSS/JS)

Base de projeto estático (sem framework, sem build step) para o site do Orange FC Recife.
Todos os textos de parágrafo estão em **Lorem Ipsum** — é só substituir pelo conteúdo real do clube.

## Estrutura de arquivos

```
index.html      → Home
sobre.html      → Sobre o Clube / História
equipe.html     → Equipe (Diretoria, Comissão Técnica, Elenco, Sócios)
noticias.html   → Listagem de notícias
noticia.html    → Modelo de notícia individual (duplique este arquivo para cada notícia)
galeria.html    → Galeria de fotos (com filtro por categoria e lightbox funcionando em JS puro)
contato.html    → Contato (formulário front-end, mapa placeholder)
admin.html      → Protótipo de painel para publicar notícias (ver observação abaixo)

css/style.css   → Todo o CSS do site (tokens de cor/tipografia no topo, em :root)
js/main.js      → Menu mobile, filtro da galeria, lightbox, formulário de contato
js/admin.js     → Lógica do protótipo de painel de notícias (localStorage)
img/            → Escudo, marca d'água do leão e arte "Laranja Mecânica" (fornecidos por vocês)
```

Abra `index.html` direto no navegador — não precisa de servidor, é só HTML/CSS/JS puro.

## O que já está pronto

- Layout responsivo (testado em desktop, tablet e mobile — menu hambúrguer incluso)
- Identidade visual derivada do escudo: laranja + preto + branco, tipografia condensada
  (Anton) para títulos, monoespaçada (JetBrains Mono) para rótulos/dados, Inter no corpo do texto
- Elementos de marca aplicados: escudo, marca d'água do leão no herói/banners, arte
  "Laranja Mecânica" usada como uma seção de destaque para a torcida
- Placeholders de imagem (`.ph`) no lugar de fotos reais — cada um mostra a dimensão
  sugerida; basta trocar o `<div class="ph">` por uma tag `<img>` real quando tiverem as fotos
- Galeria com filtro por categoria e lightbox funcionando (JavaScript puro, sem dependências)
- Formulário de contato com feedback de envio simulado

## O que precisa de atenção antes de publicar

1. **Painel do Aluno (Fensor)**: os botões "Painel do Aluno" no menu, rodapé e nas seções
   de CTA estão com `href="#"`. Troque pelo link real do painel de vocês.
2. **Painel administrativo (`admin.html`)**: é um protótipo apenas em front-end — os dados
   ficam salvos só no `localStorage` do navegador de quem está usando, e não publicam
   sozinhos em `noticias.html`. Para o cliente publicar notícias de verdade, será necessário
   conectar esse formulário a um backend (Node, PHP, ou um CMS como WordPress/Strapi) que
   grave em banco de dados e gere as páginas/lista de notícias dinamicamente. Também vale
   colocar login/autenticação nessa página, já que hoje ela fica acessível para qualquer
   pessoa que souber a URL.
3. **Formulário de contato**: hoje só mostra uma mensagem de sucesso simulada
   (`js/main.js`). Ligue a um serviço de e-mail (ex.: Formspree, EmailJS) ou a um endpoint
   próprio para receber os envios de verdade.
4. **Mapa em `contato.html`**: está com um placeholder tracejado. Basta colar o `<iframe>`
   do Google Maps com o endereço real.
5. **Textos e dados de contato**: nomes, datas, endereço, telefone e e-mail estão todos
   com valores fictícios (`00/00/0000`, `Rua Exemplo, 123` etc.) — substitua pelos dados reais.
6. **Fontes via Google Fonts**: o CSS carrega Anton, Inter e JetBrains Mono por CDN
   (precisa de internet para carregar — funciona normalmente quando publicado).

## Assets de marca inclusos em `img/`

- `escudo-laranja-grande.png` / `escudo-laranja.jpg` — escudo oficial (fundo laranja, leão branco)
- `escudo-preto.png` — versão do escudo em preto e branco, usada no rodapé
- `logo-quadrado.jpg` — versão do logo em formato quadrado (não usada nos templates, disponível se precisar)
- `leao-watermark-1.png` / `leao-watermark-2.png` — silhueta clara do leão, usada como marca d'água
- `leao-preto.png` — silhueta preta do leão
- `laranja-mecanica.png` — arte da torcida organizada, usada como banner na Home e em Sobre
- `orange-tv-logo.png` — logo do "Orange TV" (não usado nos templates atuais; guardado caso queiram linkar o canal/mídia do clube depois)
