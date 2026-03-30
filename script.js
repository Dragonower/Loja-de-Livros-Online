(function () {
  const data = window.BOOKSTORE_DATA;
  if (!data) return;

  const state = { selectedBookId: null, activeCategory: 'Todas', fontSize: 18, currentPage: 1, currentBookId: null };
  const app = document.getElementById('app');
  const featuredBooks = data.books.slice(0, 5);
  const bestSellers = data.books.slice(5, 10);
  const recommendations = data.books.slice(6, 9);

  function getBookById(id) { return data.books.find(function (book) { return book.id === Number(id); }) || null; }
  function escapeHtml(value) { return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function formatCurrency(value) { return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
  function renderStars(rating) { let stars = ''; for (let i = 1; i <= 5; i += 1) stars += i <= rating ? '★' : '☆'; return stars; }

  function splitIntoPages(book) {
    const fullContent = data.bookContent[book.id] || [book.description, '', 'Conteúdo de leitura em preparação para este título.'].join('\n');
    const paragraphs = fullContent.split(/\n\s*\n/).map(function (item) { return item.trim(); }).filter(Boolean);
    const pages = []; let current = ''; const wordsPerPage = 170;
    paragraphs.forEach(function (paragraph) {
      const candidate = current ? current + '\n\n' + paragraph : paragraph;
      const wordCount = candidate.split(/\s+/).filter(Boolean).length;
      if (wordCount > wordsPerPage && current) { pages.push(current); current = paragraph; } else { current = candidate; }
    });
    if (current) pages.push(current);
    return pages.length ? pages : [fullContent];
  }

  function buildHeader() {
    return '<header class="site-header"><div class="container"><a class="brand" href="#inicio" data-nav-home><span class="brand-mark">📚</span><span class="brand-copy"><strong>BookStore</strong><span>Biblioteca digital aonde o Amor habita</span></span></a><nav class="site-nav"><a href="#inicio">Início</a><a href="#categorias">Categorias</a><a href="#mais-vendidos">Mais vendidos</a><a href="#lancamentos">Recomendados</a></nav></div></header>';
  }

  function buildHero() {
    const spotlight = data.books[0];
    return '<section id="inicio" class="hero" style="background-image:url(' + escapeHtml(data.heroImage) + ')"><div class="container hero-inner"><div class="hero-copy"><span class="eyebrow">Coleção de estreia</span><h1>Descubra seu próximo<br />livro favorito</h1><p>Um catálogo acolhedor com visual editorial, navegação fluida e experiência de leitura integrada, agora sem React e sem TypeScript.</p><div class="hero-actions"><a class="btn btn-primary" href="#destaques">Explorar livros</a><button class="btn btn-secondary" type="button" data-open-book="' + spotlight.id + '">Ler amostra</button></div></div><aside class="hero-panel"><img src="' + escapeHtml(spotlight.image) + '" alt="Capa do livro ' + escapeHtml(spotlight.title) + '" /><div class="hero-panel-content"><strong>' + escapeHtml(spotlight.title) + '</strong><span>por ' + escapeHtml(spotlight.author) + '</span><p>' + escapeHtml(spotlight.description) + '</p></div></aside></div></section>';
  }

  function buildCategories() {
    const items = [{ name: 'Todas', symbol: '◎', color: '#8b4444' }].concat(data.categories);
    const buttons = items.map(function (category) {
      const active = state.activeCategory === category.name ? ' is-active' : '';
      return '<button class="category-button' + active + '" type="button" data-category="' + escapeHtml(category.name) + '"><span class="category-mark" style="background:' + escapeHtml(category.color) + '">' + escapeHtml(category.symbol) + '</span><strong>' + escapeHtml(category.name) + '</strong><span>' + (category.name === 'Todas' ? 'Ver o catálogo completo' : 'Explorar títulos de ' + escapeHtml(category.name.toLowerCase())) + '</span></button>';
    }).join('');
    return '<section id="categorias" class="section-block"><div class="container"><div class="section-head"><div><h2>Categorias</h2></div><p>Use os filtros para navegar pelas prateleiras e focar no tipo de leitura que combina mais com o momento.</p></div><div class="categories-grid">' + buttons + '</div></div></section>';
  }

  function filterBooks(books) { return state.activeCategory === 'Todas' ? books : books.filter(function (book) { return book.category === state.activeCategory; }); }

  function buildBookCard(book) {
    return '<article class="book-card"><div class="book-cover"><img src="' + escapeHtml(book.image) + '" alt="Capa do livro ' + escapeHtml(book.title) + '" /><div class="book-cover-overlay"><button class="btn btn-secondary" type="button" data-open-book="' + book.id + '">Ver detalhes</button></div></div><div class="book-card-content"><div class="book-meta"><span class="book-category">' + escapeHtml(book.category) + '</span><span class="rating">' + renderStars(book.rating) + '</span></div><div><h3 class="book-title">' + escapeHtml(book.title) + '</h3><p class="book-author">' + escapeHtml(book.author) + '</p></div><p class="book-description">' + escapeHtml(book.description) + '</p><div class="book-footer"><strong class="book-price">' + escapeHtml(formatCurrency(book.price)) + '</strong><button class="book-card-button" type="button" data-open-book="' + book.id + '">Ver detalhes</button></div></div></article>';
  }

  function buildSection(id, title, description, books) {
    const filtered = filterBooks(books);
    const cards = filtered.length ? filtered.map(buildBookCard).join('') : '<div class="empty-state"><h2>Nenhum livro nessa seleção</h2><p>Tente outra categoria para voltar a preencher esta prateleira.</p></div>';
    return '<section id="' + escapeHtml(id) + '" class="section-block"><div class="container"><div class="section-head"><div><h2>' + escapeHtml(title) + '</h2></div><p>' + escapeHtml(description) + '</p></div><div class="books-grid">' + cards + '</div></div></section>';
  }

  function buildFooter() {
    return '<footer class="site-footer"><div class="container"><div class="footer-links"><a href="#inicio">Sobre</a><a href="#categorias">Catálogo</a><a href="#mais-vendidos">Contato</a></div><div class="social-links"><a class="social-link" href="#">f</a><a class="social-link" href="#">ig</a><a class="social-link" href="#">x</a><a class="social-link" href="#">•</a></div><div class="footer-copy">© 2026 BookStore. Todos os direitos reservados.</div></div></footer>';
  }

  function buildModal() {
    const book = getBookById(state.selectedBookId);
    if (!book) return '<div class="modal" hidden></div>';
    return '<div class="modal"><div class="modal-dialog" role="dialog" aria-modal="true"><div class="modal-inner"><div class="modal-cover"><img src="' + escapeHtml(book.image) + '" alt="Capa do livro ' + escapeHtml(book.title) + '" /></div><div class="modal-content"><div class="modal-header"><div class="modal-title-group"><h2>' + escapeHtml(book.title) + '</h2><p>' + escapeHtml(book.author) + '</p></div><button class="modal-close" type="button" data-close-modal>×</button></div><div class="rating">' + renderStars(book.rating) + ' <span>(' + escapeHtml(String(book.rating)) + '/5)</span></div><strong class="book-price">' + escapeHtml(formatCurrency(book.price)) + '</strong><p class="modal-description">' + escapeHtml(book.description) + '</p><div class="detail-grid"><div class="detail-item"><span>ISBN</span><strong>' + escapeHtml(book.isbn) + '</strong></div><div class="detail-item"><span>Páginas</span><strong>' + escapeHtml(String(book.pages)) + '</strong></div><div class="detail-item"><span>Editora</span><strong>' + escapeHtml(book.publisher) + '</strong></div><div class="detail-item"><span>Idioma</span><strong>' + escapeHtml(book.language) + '</strong></div></div><div class="modal-actions"><button class="btn btn-primary" type="button" data-read-book="' + book.id + '">Leia agora</button><button class="btn btn-secondary" type="button" data-close-modal>Continuar explorando</button></div></div></div></div></div>';
  }

  function buildHomePage() {
    const filters = [{ name: 'Todas' }].concat(data.categories.map(function (category) { return { name: category.name }; })).map(function (item) { return '<button class="filter-chip' + (state.activeCategory === item.name ? ' is-active' : '') + '" type="button" data-category="' + escapeHtml(item.name) + '">' + escapeHtml(item.name) + '</button>'; }).join('');
    return '<div class="app-shell">' + buildHeader() + buildHero() + buildCategories() + '<section class="section-block" id="destaques"><div class="container"><div class="section-head"><div><h2>Prateleiras em destaque</h2></div><p>Os livros abaixo são montados a partir da estrutura original do projeto e agora renderizados diretamente em JavaScript puro.</p></div><div class="section-toolbar">' + filters + '</div></div></section>' + buildSection('destaques-grid', 'Destaques', 'Uma seleção de entrada para apresentar o catálogo logo na primeira dobra.', featuredBooks) + buildSection('mais-vendidos', 'Mais vendidos', 'Títulos que seguem chamando atenção e ocupam lugar de destaque na vitrine.', bestSellers) + buildSection('lancamentos', 'Recomendados para você', 'Sugestões rápidas para quem quer entrar direto em leituras com apelo forte.', recommendations) + buildFooter() + buildModal() + '</div>';
  }

  function buildReaderPage(book) {
    const pages = splitIntoPages(book); const safePage = Math.min(Math.max(state.currentPage, 1), pages.length); state.currentPage = safePage;
    const content = pages[safePage - 1]; const progress = Math.round((safePage / pages.length) * 100);
    return '<div class="reader-page"><header class="reader-header"><div class="container"><button class="reader-back" type="button" data-nav-home><span class="reader-icon">←</span><span><strong>Voltar</strong><span class="reader-subtitle">Retornar para a vitrine</span></span></button><div class="reader-title-group"><strong class="reader-title">' + escapeHtml(book.title) + '</strong><span class="reader-subtitle">' + escapeHtml(book.author) + '</span></div><div class="reader-actions"><button class="reader-action" type="button">⌂</button><button class="reader-action" type="button">Aa</button></div></div></header><main class="reader-main"><article class="reader-paper"><div class="reader-page-content" style="font-size:' + state.fontSize + 'px">' + escapeHtml(content) + '</div><div class="reader-page-number">Página ' + safePage + ' de ' + pages.length + '</div></article></main><footer class="reader-controls"><div class="container"><div class="reader-nav"><button class="reader-button" type="button" data-prev-page' + (safePage === 1 ? ' disabled' : '') + '>Anterior</button><button class="reader-button" type="button" data-next-page' + (safePage === pages.length ? ' disabled' : '') + '>Próxima</button></div><div class="reader-font-controls"><span class="reader-font-label">Tamanho do texto</span><button class="reader-button" type="button" data-font="decrease">A-</button><span class="reader-font-value">' + state.fontSize + 'px</span><button class="reader-button" type="button" data-font="increase">A+</button></div><div class="reader-progress"><span class="reader-progress-label">Progresso</span><div class="progress-track"><div class="progress-bar" style="width:' + progress + '%"></div></div><span class="reader-progress-value">' + progress + '%</span></div></div></footer></div>';
  }

  function buildNotFound() { return '<div class="reader-page"><div class="reader-empty"><h2>Livro não encontrado</h2><p>Não localizamos esse título no catálogo convertido.</p><button class="btn btn-primary" type="button" data-nav-home>Voltar para o início</button></div></div>'; }
  function parseRoute() { const params = new URLSearchParams(window.location.search); const readerId = params.get('livro'); return readerId ? { page: 'reader', id: Number(readerId) } : { page: 'home' }; }
  function navigateToHome() { state.selectedBookId = null; document.body.classList.remove('modal-open'); history.pushState({}, '', window.location.pathname); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function navigateToReader(bookId) { state.selectedBookId = null; state.currentBookId = Number(bookId); state.currentPage = 1; document.body.classList.remove('modal-open'); history.pushState({}, '', '?livro=' + bookId); render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  function openModal(bookId) { state.selectedBookId = Number(bookId); document.body.classList.add('modal-open'); render(); }
  function closeModal() { state.selectedBookId = null; document.body.classList.remove('modal-open'); render(); }

  function render() {
    const route = parseRoute();
    if (route.page === 'reader') { state.currentBookId = route.id; const book = getBookById(route.id); app.innerHTML = book ? buildReaderPage(book) : buildNotFound(); return; }
    app.innerHTML = buildHomePage();
  }

  document.addEventListener('click', function (event) {
    const openButton = event.target.closest('[data-open-book]');
    const closeButton = event.target.closest('[data-close-modal]');
    const readButton = event.target.closest('[data-read-book]');
    const homeButton = event.target.closest('[data-nav-home]');
    const categoryButton = event.target.closest('[data-category]');
    const nextPageButton = event.target.closest('[data-next-page]');
    const prevPageButton = event.target.closest('[data-prev-page]');
    const fontButton = event.target.closest('[data-font]');
    const modalBackdrop = event.target.classList && event.target.classList.contains('modal');
    if (openButton) { openModal(openButton.getAttribute('data-open-book')); return; }
    if (closeButton || modalBackdrop) { closeModal(); return; }
    if (readButton) { navigateToReader(readButton.getAttribute('data-read-book')); return; }
    if (homeButton) { navigateToHome(); return; }
    if (categoryButton) { state.activeCategory = categoryButton.getAttribute('data-category'); render(); return; }
    if (nextPageButton) { const book = getBookById(state.currentBookId); if (!book) return; const pages = splitIntoPages(book); state.currentPage = Math.min(state.currentPage + 1, pages.length); render(); return; }
    if (prevPageButton) { state.currentPage = Math.max(state.currentPage - 1, 1); render(); return; }
    if (fontButton) { const direction = fontButton.getAttribute('data-font'); if (direction === 'increase') state.fontSize = Math.min(28, state.fontSize + 2); if (direction === 'decrease') state.fontSize = Math.max(14, state.fontSize - 2); render(); }
  });

  document.addEventListener('keydown', function (event) { if (event.key === 'Escape' && state.selectedBookId !== null) closeModal(); });
  window.addEventListener('popstate', function () { state.selectedBookId = null; document.body.classList.remove('modal-open'); render(); });
  render();
})();
