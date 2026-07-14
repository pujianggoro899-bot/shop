// Shop & Drive Taman Tekno - Service Worker
const CACHE_NAME = "shopanddrive-v1";
const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/offline.html",
];

// Install - Cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate - Clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch - Network first, fallback to cache
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests
  if (event.request.method !== "GET") return;

  // Skip API calls
  if (event.request.url.includes("/api/")) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clone);
          });
        }
        return response;
      })
      .catch(() => {
        // Return cached version or offline page
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === "navigate") {
            return caches.match("/offline.html");
          }
          return new Response("Offline", { status: 503 });
        });
      })
  );
});

// Background sync for orders
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-orders") {
    event.waitUntil(syncOrders());
  }
});

async function syncOrders() {
  const db = await openDB();
  const orders = await db.getAll("pendingOrders");
  for (const order of orders) {
    try {
      await fetch("/api/orders", {
        method: "POST",
        body: JSON.stringify(order),
        headers: { "Content-Type": "application/json" },
      });
      await db.delete("pendingOrders", order.id);
    } catch (error) {
      console.error("Sync failed:", error);
    }
  }
}

// Push notification handler
self.addEventListener("push", (event) => {
  const data = event.data?.json() || {
    title: "Shop & Drive",
    body: "Ada update terbaru!",
    icon: "/icons/icon-192x192.png",
    badge: "/icons/icon-72x72.png",
  };

  const options = {
    body: data.body,
    icon: data.icon || "/icons/icon-192x192.png",
    badge: data.badge || "/icons/icon-72x72.png",
    vibrate: [200, 100, 200],
    data: {
      url: data.url || "/",
    },
    actions: [
      { action: "view", title: "Lihat Detail" },
      { action: "close", title: "Tutup" },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  if (event.action === "view" || !event.action) {
    event.waitUntil(
      clients.openWindow(event.notification.data?.url || "/")
    );
  }
});

// Helper: Simple IndexedDB wrapper
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ShopAndDriveDB", 1);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains("pendingOrders")) {
        db.createObjectStore("pendingOrders", { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains("cachedProducts")) {
        db.createObjectStore("cachedProducts", { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}
