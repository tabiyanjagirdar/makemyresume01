// src/components/EzoicShowAds.jsx
import { useEffect } from "react";

export default function EzoicShowAds({ ids = [] }) {
    useEffect(() => {
        if (window.ezstandalone) {
            window.ezstandalone.cmd = window.ezstandalone.cmd || [];

            window.ezstandalone.cmd.push(function () {
                if (ids.length > 0) {
                    // Show only specific placeholders
                    window.ezstandalone.showAds(...ids);
                } else {
                    // Show all placeholders on the page
                    window.ezstandalone.showAds();
                }
            });
        }
    }, [ids]);

    return null; // This component only triggers Ezoic ads, doesn't render anything
}
