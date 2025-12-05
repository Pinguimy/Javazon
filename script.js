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

    // debounce simples
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
