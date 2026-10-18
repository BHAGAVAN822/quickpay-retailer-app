/* QuickPay Retailer service worker.
   Makes the app installable. Deliberately caches NOTHING: every page load and
   API call goes to the network, so retailers always see the latest app and
   live balances. If the page itself cannot load (no internet), show a short
   offline notice instead of the browser's error page. */
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

const OFFLINE_HTML = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>QuickPay - Offline</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
background:#0A1929;color:#fff;font-family:system-ui,sans-serif;text-align:center;padding:24px}
.c{max-width:320px}.l{width:64px;height:64px;border-radius:16px;margin:0 auto 20px;
background:linear-gradient(135deg,#EA580C,#9A3412);display:flex;align-items:center;justify-content:center;
font-weight:800;font-size:24px}h1{font-size:20px;margin:0 0 8px}p{color:#BCCCDC;font-size:15px;line-height:1.5;margin:0 0 24px}
button{background:#C2410C;color:#fff;border:0;border-radius:10px;padding:12px 28px;font-size:15px;font-weight:700}</style>
</head><body><div class="c"><div class="l">QP</div><h1>No internet connection</h1>
<p>Please check your mobile data or Wi-Fi and try again.</p>
<button onclick="location.reload()">Try again</button></div></body></html>`;

self.addEventListener("fetch", (e) => {
  if (e.request.mode !== "navigate") return; // API calls, fonts, etc. go straight to network
  e.respondWith(
    fetch(e.request).catch(() =>
      new Response(OFFLINE_HTML, { headers: { "Content-Type": "text/html; charset=utf-8" } })
    )
  );
});
