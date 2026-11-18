const V = "core-reset-v4";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icon-192.png", "icon-512.png", "gifs/breathing.gif", "gifs/slides.gif", "gifs/bridge.gif", "gifs/birddog.gif", "gifs/sideplank.gif", "gifs/rowing.gif", "gifs/breathing.png", "gifs/slides.png", "gifs/bridge.png", "gifs/birddog.png", "gifs/sideplank.png", "gifs/rowing.png", "gifs/catcow.gif", "gifs/catcow.png", "gifs/child.gif", "gifs/child.png", "gifs/lunge.gif", "gifs/lunge.png", "gifs/kneehug.gif", "gifs/kneehug.png", "gifs/ragdoll.gif", "gifs/ragdoll.png", "gifs/puppy.gif", "gifs/puppy.png", "gifs/neck.gif", "gifs/neck.png", "gifs/sidebend.gif", "gifs/sidebend.png"];
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(V).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== V).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});
// Stale-while-revalidate: open instantly from cache, refresh in the background.
self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.open(V).then((c) =>
      c.match(e.request).then((hit) => {
        const net = fetch(e.request).then((r) => { if (r && (r.ok || r.type === "opaque")) c.put(e.request, r.clone()); return r; }).catch(() => hit);
        return hit || net;
      })
    )
  );
});
