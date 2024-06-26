export default {
  mounted(el: HTMLElement) {
    function display() {
      const imgEl = el.querySelector("img");

      if (imgEl) {
        imgEl.addEventListener("load", () => {
          setTimeout(() => {
            imgEl.classList.remove("opacity-0");
          }, 100);
        });
        imgEl.src = imgEl.dataset.url || "";
      } else {
        const iframe = el.querySelector("iframe");

        if (iframe) {
          iframe.src = iframe.dataset.url || "";
        }
      }
    }

    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          display();
          observer.unobserve(el);
        }
      });
    }

    function createObserver() {
      const options = {
        root: null,
        threshold: "0"
      };
      const observer = new IntersectionObserver(handleIntersect, options as unknown as IntersectionObserverInit);
      observer.observe(el);
    }

    if (window["IntersectionObserver"]) {
      createObserver();
    } else {
      display();
    }
  }
};
