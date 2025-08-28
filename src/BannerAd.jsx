import { useEffect } from "react";

export default function BannerAd() {
    useEffect(() => {
        // HilltopAds script injection
        const script = document.createElement("script");
        script.src =
            "//fancyresponse.com/bPXKVGs.dSGrlO0GYmW/cG/_eFmu9/u/ZpUmlDk/PcT_Y/2BMvzOAK3LM/zkgYtuNlj/YlzVMdDAcPzcOmQL";
        script.async = true;
        script.referrerPolicy = "no-referrer-when-downgrade";

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full flex justify-center p-4 bg-gray-50">
            <div id="hilltop-ads-banner" className="max-w-screen-md" />
        </div>
    );
}
