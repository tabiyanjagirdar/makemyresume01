import { useEffect } from "react";

export default function Ad300x250() {
    useEffect(() => {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.innerHTML = `
      atOptions = {
        'key' : '717b13bb1e5878f471b01b30a7ef293d',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
        const script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src = "//www.highperformanceformat.com/717b13bb1e5878f471b01b30a7ef293d/invoke.js";

        const adContainer = document.getElementById("ad-300x250");
        if (adContainer) {
            adContainer.appendChild(script);
            adContainer.appendChild(script2);
        }
    }, []);

    return (
        <div id="ad-300x250" style={{ textAlign: "center", margin: "10px 0" }}></div>
    );
}
