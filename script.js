document.addEventListener('DOMContentLoaded', function () {
    // Search functionality
    var searchInput = document.getElementById('search-input');
    var sClear = document.getElementById('s-clear');
    var searchCount = document.getElementById('search-count');
    var cards = document.querySelectorAll('.card');

    searchInput.addEventListener('input', function () {
        var query = this.value.toLowerCase().trim();
        var visible = 0;
        cards.forEach(function (card) {
            var title = card.querySelector('h3').textContent.toLowerCase();
            var desc = card.querySelector('p').textContent.toLowerCase();
            if (title.includes(query) || desc.includes(query)) {
                card.classList.remove('hidden');
                visible++;
            } else {
                card.classList.add('hidden');
            }
        });
        sClear.style.display = query ? 'block' : 'none';
        searchCount.textContent = query ? visible + ' resultado(s)' : '';
    });

    sClear.addEventListener('click', function () {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input'));
        searchInput.focus();
    });

    // Like buttons
    document.querySelectorAll('.fs-like-btn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            e.stopPropagation();
            var icon = this.querySelector('.fs-like-icon');
            var countEl = this.querySelector('.fs-like-count');
            var count = parseInt(countEl.textContent, 10);
            if (this.classList.contains('liked')) {
                this.classList.remove('liked');
                icon.textContent = '🤍';
                countEl.textContent = count - 1;
            } else {
                this.classList.add('liked');
                icon.textContent = '❤️';
                countEl.textContent = count + 1;
            }
        });
    });

    // Card click -> open code modal
    var codeOverlay = document.getElementById('fs-code-overlay');
    var codeInput = document.getElementById('fs-code-input');
    var codeError = document.getElementById('fs-code-error');

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            codeOverlay.classList.add('active');
            codeInput.value = '';
            codeError.textContent = '';
            setTimeout(function () { codeInput.focus(); }, 100);
        });
    });

    document.querySelector('.fs-code-close').addEventListener('click', function () {
        codeOverlay.classList.remove('active');
    });

    codeOverlay.addEventListener('click', function (e) {
        if (e.target === codeOverlay) this.classList.remove('active');
    });

    document.querySelector('.fs-code-btn').addEventListener('click', function () {
        var code = codeInput.value.trim();
        if (!code) {
            codeError.textContent = 'Digite um codigo valido.';
            return;
        }
        codeError.textContent = 'Codigo incorreto. Tente novamente.';
    });

    codeInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') document.querySelector('.fs-code-btn').click();
    });

    // Credits modal
    var credOverlay = document.getElementById('fs-cred-ov');
    var btnCred = document.getElementById('btn-cred');

    btnCred.addEventListener('click', function () {
        credOverlay.classList.add('active');
    });

    document.querySelector('.fs-cred-x').addEventListener('click', function () {
        credOverlay.classList.remove('active');
    });

    credOverlay.addEventListener('click', function (e) {
        if (e.target === credOverlay) this.classList.remove('active');
    });

    // ESC to close modals
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            codeOverlay.classList.remove('active');
            credOverlay.classList.remove('active');
        }
    });
});
