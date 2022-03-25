export const serviceWorker = async () => {
  if ("serviceWorker" in navigator) {
    const register = await navigator.serviceWorker.register("/sw.js");

    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: process.env.REACT_APP_VAPID_KEY,
    });

    localStorage.setItem("sub", JSON.stringify(subscription));
  }
};
