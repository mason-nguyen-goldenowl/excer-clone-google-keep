export const serviceWorker = async () => {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  const register = await navigator.serviceWorker.register(swUrl);

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: process.env.REACT_APP_VAPID_KEY,
  });
  localStorage.setItem("sub", JSON.stringify(subscription));
};
