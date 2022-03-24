const publicVapidKey =
  "BJwpBktvbChPKzU3JtsBl8rAwopyFOHy0UdFKtygJaudhwqi6p_qtWVvbN8YCuwIU-4ubJTuLSLKnt-mZrvpxAg";
export const serviceWorker = async () => {
  let swUrl = `${process.env.PUBLIC_URL}/sw.js`;
  const register = await navigator.serviceWorker.register(swUrl);

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: publicVapidKey,
  });
  localStorage.setItem("sub", JSON.stringify(subscription));
  //   console.log(JSON.stringify(subscription));
};
