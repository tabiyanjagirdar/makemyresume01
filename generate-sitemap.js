import fs from "fs";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// 🔹 Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// 🔹 Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function generateSitemap() {
  const jobsSnapshot = await getDocs(collection(db, "jobs"));
  const jobs = jobsSnapshot.docs.map(doc => doc.data());

  const baseUrl = "https://makemyresume.help";

  // Build job URLs
  const jobUrls = jobs.map(job => `
    <url>
      <loc>${baseUrl}/jobs/${job.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `).join("");

  // Final XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    <url>
      <loc>${baseUrl}/jobs</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
    ${jobUrls}
  </urlset>`;

  // Save file inside public/
  fs.writeFileSync("public/sitemap.xml", sitemap, "utf8");
  console.log("✅ Sitemap generated at public/sitemap.xml");
}

generateSitemap().catch(console.error);
