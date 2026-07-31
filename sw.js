// Service worker mínimo — sem cache agressiva.
// A app depende de internet para gravar dados no Firebase, por isso não faz sentido
// cachear o código para uso offline: preferimos sempre a versão mais recente do GitHub.
// Isto também evita o problema clássico de "PWA a mostrar versão antiga depois de um update".

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response(
        'Sem ligação à internet. Liga-te à internet para usar a app.',
        { status: 503, headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
      );
    })
  );
});
