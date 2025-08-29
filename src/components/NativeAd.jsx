import { useEffect } from "react";

export default function StickyAd() {
    useEffect(() => {
        // Create a container div for the sticky ad
        const adContainer = document.createElement("div");
        adContainer.id = "sticky-ad-container";
        adContainer.style.position = "fixed";
        adContainer.style.bottom = "0";
        adContainer.style.left = "0";
        adContainer.style.width = "100%";
        adContainer.style.zIndex = "9999";
        adContainer.style.background = "transparent"; // optional, adjust as needed
        document.body.appendChild(adContainer);

        // Inject the ad script
        const script = document.createElement("script");
        script.async = true;
        script.referrerPolicy = "no-referrer-when-downgrade";
        script.src = "//fancyresponse.com/b.X/VmszdAGGlO0mYdWOcR/re/mQ9/uNZzUAljkcPMT/Y/2fMNzgAu3MM/zcgvtYNZj-YczZMdDEcTzXO/QH";
        adContainer.appendChild(script);

        // Cleanup on unmount
        return () => {
            document.body.removeChild(adContainer);
        };
    }, []);

    return null; // No JSX needed since it's injected directly
}
