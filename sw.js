const C="shiva-v2",A=["./","index.html","manifest.webmanifest","icon-192.png","icon-512.png"];
self.addEventListener("install",e=>e.waitUntil(caches.open(C).then(c=>c.addAll(A)).then(()=>self.skipWaiting())));
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);if(e.request.method!=="GET")return;
 const put=r=>{const c=r.clone();caches.open(C).then(x=>x.put(e.request,c));return r};
 if(u.hostname==="www.gstatic.com"){e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(put)));return}
 if(u.origin!==location.origin)return;
 e.respondWith(fetch(e.request).then(put).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))));
});
