// Cambio de idioma del sitio (ingles / español). El idioma inicial lo fija un guion corto en el
// <head> de cada pagina, antes de pintar; aqui solo se atiende el interruptor y se recuerda la eleccion.
(function () {
    var KEY = 'nerdplayer.site.lang';
    var root = document.documentElement;

    function apply(lang, save) {
        lang = (lang === 'es') ? 'es' : 'en';
        root.setAttribute('data-lang', lang);
        root.setAttribute('lang', lang);

        var title = document.querySelector('meta[name="title-' + lang + '"]');
        if (title) { document.title = title.getAttribute('content'); }

        var buttons = document.querySelectorAll('[data-set-lang]');
        for (var i = 0; i < buttons.length; i += 1) {
            buttons[i].setAttribute('aria-pressed', buttons[i].getAttribute('data-set-lang') === lang ? 'true' : 'false');
        }
        if (save) {
            try { localStorage.setItem(KEY, lang); } catch (e) { /* sin almacenamiento: no se recuerda */ }
        }
    }

    document.addEventListener('click', function (event) {
        var el = event.target;
        while (el && el !== document) {
            if (el.getAttribute && el.getAttribute('data-set-lang')) {
                apply(el.getAttribute('data-set-lang'), true);
                return;
            }
            el = el.parentNode;
        }
    });

    apply(root.getAttribute('data-lang'), false);
}());
