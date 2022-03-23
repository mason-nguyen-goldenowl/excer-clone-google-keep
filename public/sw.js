this.addEventListener("message", async (event) => {
  if (event.data && event.data.type === "MESSAGE_IDENTIFIER") {
    setTimeout(() => {
      this.registration.showNotification(event.data.title, {
        body: event.data.text,
      });
    }, event.data.remainingTime);
  }
});
