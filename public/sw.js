import { precacheAndRoute } from "workbox-precaching";

precacheAndRoute(this.__WB_MANIFEST);

this.addEventListener("push", (event) => {
  const payload = event.data.json();
  event.waitUntil(
    this.registration.showNotification(payload.title.replace(/<[^>]+>/g, ""), {
      body: payload.content.replace(/<[^>]+>/g, ""),
      icon: "./favicon.png",
      vibrate: [200, 100, 200],
    })
  );
});
