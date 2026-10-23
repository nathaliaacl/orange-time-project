/* ==========================================================================
   ORANGE FC RECIFE — admin.js
   Protótipo de painel para publicação de notícias.
   IMPORTANTE: isto é apenas uma simulação em front-end (usa localStorage
   do navegador). Para um painel real, ligue este formulário a um backend
   (Node, PHP, um CMS como WordPress/Strapi, etc.) que grave as notícias
   em banco de dados e as exiba em noticias.html dinamicamente.
   ========================================================================== */
(function () {
  var STORAGE_KEY = 'orangefc_noticias_demo';

  var SEED = [
    {
      id: 'seed-1',
      titulo: 'Lorem ipsum dolor sit amet consectetur',
      categoria: 'Jogos',
      data: '2026-07-10',
      resumo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
      conteudo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    },
    {
      id: 'seed-2',
      titulo: 'Ut enim ad minim veniam quis nostrud',
      categoria: 'Base',
      data: '2026-07-05',
      resumo: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
      conteudo: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    },
    {
      id: 'seed-3',
      titulo: 'Duis aute irure dolor in reprehenderit',
      categoria: 'Institucional',
      data: '2026-06-28',
      resumo: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.',
      conteudo: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
    }
  ];

  function loadNoticias() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED));
        return SEED.slice();
      }
      return JSON.parse(raw);
    } catch (e) {
      return SEED.slice();
    }
  }

  function saveNoticias(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  function formatData(iso) {
    if (!iso) return '';
    var partes = iso.split('-');
    if (partes.length !== 3) return iso;
    return partes[2] + '/' + partes[1] + '/' + partes[0];
  }

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.querySelector('#news-form');
    var list = document.querySelector('#news-list');
    var empty = document.querySelector('#news-empty');
    if (!form || !list) return;

    var idField = document.querySelector('#news-id');
    var titleField = document.querySelector('#news-title');
    var categoryField = document.querySelector('#news-category');
    var dateField = document.querySelector('#news-date');
    var summaryField = document.querySelector('#news-summary');
    var contentField = document.querySelector('#news-content');
    var submitBtn = document.querySelector('#news-submit');
    var cancelBtn = document.querySelector('#news-cancel-edit');
    var formTitle = document.querySelector('#news-form-title');

    var noticias = loadNoticias();

    function render() {
      list.innerHTML = '';
      if (!noticias.length) {
        if (empty) empty.hidden = false;
        return;
      }
      if (empty) empty.hidden = true;

      noticias
        .slice()
        .sort(function (a, b) { return (b.data || '').localeCompare(a.data || ''); })
        .forEach(function (n) {
          var item = document.createElement('div');
          item.className = 'admin-list__item';
          item.innerHTML =
            '<div>' +
              '<h4>' + escapeHtml(n.titulo) + '</h4>' +
              '<span>' + escapeHtml(n.categoria) + ' · ' + formatData(n.data) + '</span>' +
            '</div>' +
            '<div class="admin-list__actions">' +
              '<button type="button" data-action="edit" data-id="' + n.id + '">Editar</button>' +
              '<button type="button" class="danger" data-action="delete" data-id="' + n.id + '">Excluir</button>' +
            '</div>';
          list.appendChild(item);
        });
    }

    function escapeHtml(str) {
      var div = document.createElement('div');
      div.textContent = str || '';
      return div.innerHTML;
    }

    function resetForm() {
      form.reset();
      idField.value = '';
      if (formTitle) formTitle.textContent = 'Nova notícia';
      if (submitBtn) submitBtn.textContent = 'Publicar notícia';
      if (cancelBtn) cancelBtn.hidden = true;
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var id = idField.value || ('n-' + Date.now());
      var novaNoticia = {
        id: id,
        titulo: titleField.value.trim(),
        categoria: categoryField.value,
        data: dateField.value,
        resumo: summaryField.value.trim(),
        conteudo: contentField.value.trim()
      };
      if (!novaNoticia.titulo) return;

      var existingIndex = noticias.findIndex(function (n) { return n.id === id; });
      if (existingIndex > -1) {
        noticias[existingIndex] = novaNoticia;
      } else {
        noticias.push(novaNoticia);
      }
      saveNoticias(noticias);
      render();
      resetForm();
    });

    list.addEventListener('click', function (e) {
      var btn = e.target.closest('button[data-action]');
      if (!btn) return;
      var id = btn.getAttribute('data-id');
      var noticia = noticias.find(function (n) { return n.id === id; });

      if (btn.getAttribute('data-action') === 'delete') {
        if (confirm('Excluir esta notícia? Esta ação não pode ser desfeita.')) {
          noticias = noticias.filter(function (n) { return n.id !== id; });
          saveNoticias(noticias);
          render();
        }
      }

      if (btn.getAttribute('data-action') === 'edit' && noticia) {
        idField.value = noticia.id;
        titleField.value = noticia.titulo;
        categoryField.value = noticia.categoria;
        dateField.value = noticia.data;
        summaryField.value = noticia.resumo;
        contentField.value = noticia.conteudo;
        if (formTitle) formTitle.textContent = 'Editar notícia';
        if (submitBtn) submitBtn.textContent = 'Salvar alterações';
        if (cancelBtn) cancelBtn.hidden = false;
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    if (cancelBtn) {
      cancelBtn.addEventListener('click', resetForm);
    }

    render();
  });
})();
