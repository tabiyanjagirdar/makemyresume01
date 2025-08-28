import { useEffect } from "react";

export default function BannerAd() {
    useEffect(() => {
        // Create inline script to inject HilltopAds
        const script = document.createElement("script");
        script.innerHTML = `(function(uq){
      var d=document,
          s=d.createElement('script'),
          l=d.scripts[d.scripts.length-1];
      s.settings=uq||{};
      s.src="//fancyresponse.com/bPXKVGs.dSGrlO0GYmW/cG/_eFmu9/u/ZpUmlDk/PcT_Y/2BMvzOAK3LM/zkgYtuNlj/YlzVMdDAcPzcOmQL";
      s.async=true;
      s.referrerPolicy='no-referrer-when-downgrade';
      l.parentNode.insertBefore(s,l);
    })({})`;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full flex justify-center p-4 bg-gray-50">
            {/* HilltopAds script will inject ad here */}
            <div id="hilltop-ads-banner" className="max-w-screen-md" />
        </div>
    );
}
