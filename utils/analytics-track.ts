export function initAnalytics() {
  const trackPageView = async () => {
    const analyticsData = {
      title: document.title,
      slug: window.location.pathname + window.location.search,
      referrer: document.referrer,
    };

    console.log("Initial analytics data:", analyticsData);

    try {
      const locationResponse = await fetch("/api/get-location");
      if (locationResponse.ok) {
        const locationData = await locationResponse.json();
        console.log("Location data:", locationData);
        Object.assign(analyticsData, locationData);
      } else {
        console.error(
          "Failed to fetch location data:",
          await locationResponse.text()
        );
      }
      console.log("Final analytics data to be sent:", analyticsData);
    } catch (error) {
      console.error("Error recording analytics data:", error);
    }
  };

  trackPageView();
  const originalPushState = history.pushState;
  history.pushState = function (...args: Parameters<typeof history.pushState>) {
    originalPushState.apply(this, args);
    trackPageView();
  };

  window.addEventListener("popstate", trackPageView);
}
