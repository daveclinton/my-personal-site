export const sendAnalytics = (slug: string) => {
  setTimeout(() => {
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", JSON.stringify({ slug }));
    } else {
      fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
        keepalive: true,
      }).catch((error) => console.error("Error sending analytics:", error));
    }
  }, 0);
};
