function mostrarForm(formId) {

    const formMap = {
        'login': 'form-login',
        'cadastro': 'form-cadastro'
    };

    // Pega o ID do formulário correspondente
    const targetFormId = formMap[formId] || formId;

    // Remove a classe 'ativa' de todos os formulários e botões de aba
    document.querySelectorAll('.formulario-autenticacao').forEach(form => {
        form.classList.remove('ativa');
    });
    document.querySelectorAll('.botao-aba').forEach(button => {
        button.classList.remove('ativa');
    });

    // Adiciona a classe 'ativa' ao formulário e botão correspondente
    document.getElementById(targetFormId).classList.add('ativa');
    document.querySelector(`.botao-aba[onclick*='${formId}']`).classList.add('ativa');
}

// Simular o processo de Login
const formLogin = document.getElementById('form-login');
if (formLogin) {
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Login realizado (simulação)! função faria uma requisição POST para um endpoint de autenticação.');
    });
}

// Simular o processo de Cadastro
const formCadastro = document.getElementById('form-cadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cadastro realizado (simulação)! função registraria o usuário no banco de dados.');
    });
}

// Simular o processo de enviar mensagem
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada (simulação)!');
        // limpa campos após envio
        contactForm.reset();
    });
}



// --- Busca de produtos no índice ---
const searchInput = document.getElementById('input-pesquisa');
if (searchInput) {
    const suggestionList = document.getElementById('lista-itens');
    const getCards = () => Array.from(document.querySelectorAll('.class-card'));

    function filterCards(query) {
        const q = String(query || '').trim().toLowerCase();
        const cards = getCards();
        cards.forEach(card => {
            const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
            const subtitle = (card.querySelector('.card-subtitle')?.textContent || '').toLowerCase();
            const match = q === '' || title.includes(q) || subtitle.includes(q);
            card.style.display = match ? '' : 'none';
        });

        // atualizar lista de sugestões no header (se existir)
        if (suggestionList) {
            suggestionList.innerHTML = '';
            if (q !== '') {
                const matches = cards.filter(card => {
                    const t = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
                    const s = (card.querySelector('.card-subtitle')?.textContent || '').toLowerCase();
                    return t.includes(q) || s.includes(q);
                });
                matches.slice(0,6).forEach(match => {
                    const li = document.createElement('li');
                    li.textContent = (match.querySelector('.card-title')?.textContent || '') + ' - ' + (match.querySelector('.card-subtitle')?.textContent || '');
                    li.className = 'suggestion-item';
                    li.addEventListener('click', () => {
                        match.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        suggestionList.innerHTML = '';
                    });
                    suggestionList.appendChild(li);
                });
            }
        }
    }

    // debounce simples (Imagine um elevador)
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => filterCards(e.target.value), 180);
    });

    // permitir pesquisa ao clicar no botão
    const btnSearch = document.getElementById('btn-pesquisa');
    if (btnSearch) btnSearch.addEventListener('click', () => filterCards(searchInput.value));
}



// BOTÃO VOLTAR AO TOPO
const btnTopo = document.querySelector("#topo");

window.addEventListener("scroll", () => {
    btnTopo.style.display = window.scrollY > 300 ? "block" : "none";
});

btnTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});



// --- Adiciona emblemas de preço automaticamente nos cards ---
document.addEventListener('DOMContentLoaded', () => {
    const priceMap = [
        { match: /teclado/i, price: 169.90 },
        { match: /placa[- ]?m[eã]e|placa/i, price: 399.90 },
        { match: /rtx|vga|placa/i, price: 1999.90 },
        { match: /havit|fone|headset/i, price: 79.90 },
        { match: /notebook|laptop/i, price: 2499.90 },
        { match: /aspirador/i, price: 349.90 },
        { match: /monitor/i, price: 899.90 }
    ];

// bota R$ na frente e formata decimal com vírgula
    function formatBR(value) {
        return 'R$ ' + value.toFixed(2).replace('.', ',');
    }

    const cards = document.querySelectorAll('.class-card');
    cards.forEach(card => {
        // evita duplicar emblema/badge
        if (card.querySelector('.price-badge') || card.querySelector('.price-inline')) return;

        const title = (card.querySelector('.card-title')?.textContent || 'produto').trim();
        let found = priceMap.find(p => p.match.test(title));
        let price = found ? found.price : (Math.floor(Math.random() * 900) + 49) + 0.90; // preço aleatório entre R$49,90 e R$949,90

        const headerTop = card.querySelector('.card-header-top');
        if (headerTop) {
            // cria um emblema inline ao lado do título (mais discreto)
            const span = document.createElement('span');
            span.className = 'price-inline';
            span.textContent = formatBR(price);
            headerTop.appendChild(span);
        } else {
            // fallback: emblema absoluto no canto
            const badge = document.createElement('div');
            badge.className = 'price-badge';
            badge.textContent = formatBR(price);
            card.appendChild(badge);
        }
    });
});
