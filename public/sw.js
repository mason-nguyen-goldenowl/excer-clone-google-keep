import { precacheAndRoute } from "workbox-precaching";
var self = this;
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener("push", (event) => {
  const payload = event.data.json();
  event.waitUntil(
    self.registration.showNotification(payload.title.replace(/<[^>]+>/g, ""), {
      body: payload.content.replace(/<[^>]+>/g, ""),
      icon: "./favicon.png",
      vibrate: [200, 100, 200],
    })
  );
});
