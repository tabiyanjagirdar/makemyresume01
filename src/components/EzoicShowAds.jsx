// src/components/EzoicShowAds.jsx
import { useEffect } from "react";

/**
 * EzoicShowAds - call this once per page with ALL placement IDs present on that page.
 * Example: <EzoicShowAds ids={[101,102,103]} />
 */
export default function EzoicShowAds({ ids = [] }) {
    useEffect(() => {
        if (typeof window === "undefined" || !ids || ids.length === 0) return;

        window.ezstandalone = window.ezstandalone || {};
        window.ezstandalone.cmd = window.ezstandalone.cmd || [];

        // Queue the call — Ezoic will run this after its script loads.
        window.ezstandalone.cmd.push(function () {
            if (typeof window.ezstandalone.showAds === "function") {
                window.ezstandalone.showAds(...ids);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(ids)]); // stringify to keep deps stable for arrays

    return null; // renders nothing — just triggers the ad call
}
