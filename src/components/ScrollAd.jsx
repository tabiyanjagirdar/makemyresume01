import { useEffect, useState } from "react";

export default function ScrollAd() {
    const [scriptLoaded, setScriptLoaded] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Load script only once when user scrolls
            if (!scriptLoaded) {
                const script = document.createElement("script");
                script.src = "//pl27485813.revenuecpmgate.com/fa/e5/be/fae5beaf948081b360878f46b4841b73.js";
                script.async = true;
                document.body.appendChild(script);
                setScriptLoaded(true);
                window.removeEventListener("scroll", handleScroll); // Remove listener after loading
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [scriptLoaded]);

    return <div id="social-bar-ad"></div>; // Optional container for ad
}
