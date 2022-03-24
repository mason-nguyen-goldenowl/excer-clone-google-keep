this.addEventListener("message", async (event) => {
  if (event.data && event.data.type === "MESSAGE_IDENTIFIER") {
    setTimeout(() => {
      this.registration.showNotification(event.data.title, {
        body: event.data.text,
      });
    }, event.data.remainingTime);
  }
});

this.addEventListener("push", (event) => {
  const payload = event.data.json();
  event.waitUntil(
    this.registration.showNotification(payload.title.replace(/<[^>]+>/g, ""), {
      body: payload.content.replace(/<[^>]+>/g, ""),
      icon: "./favicon.png",
    })
  );
});
