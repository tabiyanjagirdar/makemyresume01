// generate-sitemap.js
import fs from "fs";
import admin from "firebase-admin";

// 🔹 Load service account JSON safely
const serviceAccount = JSON.parse(
  fs.readFileSync(new URL("./serviceAccountKey.json", import.meta.url), "utf8")
);

// 🔹 Initialize Firebase Admin only once
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const BASE_URL = "https://www.makemyresume.help";

async function generateSitemap() {
  const pages = [];

  // 🔹 Static Pages
  const now = new Date().toISOString();
  pages.push({ url: `${BASE_URL}/`, lastmod: now, priority: 1.0 });
  pages.push({ url: `${BASE_URL}/jobs`, lastmod: now, priority: 0.9 });
  pages.push({ url: `${BASE_URL}/courses`, lastmod: now, priority: 0.9 });

  // 🔹 Jobs Collection
  const jobsSnap = await db.collection("jobs").get();
  jobsSnap.forEach((doc) => {
    const job = doc.data();
    pages.push({
      url: `${BASE_URL}/jobs/${job.slug}`,
      lastmod: (job.updatedAt?.toDate?.() || new Date()).toISOString(),
      priority: 0.8,
    });
  });

  // 🔹 Courses Collection
  const coursesSnap = await db.collection("courses").get();
  coursesSnap.forEach((doc) => {
    const course = doc.data();
    pages.push({
      url: `${BASE_URL}/courses/${course.slug}`,
      lastmod: (course.updatedAt?.toDate?.() || new Date()).toISOString(),
      priority: 0.8,
    });
  });

  // 🔹 Build XML Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `
  <url>
    <loc>${p.url}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

  // 🔹 Save sitemap.xml in public/
  fs.writeFileSync("public/sitemap.xml", sitemap, "utf8");
  console.log("✅ Sitemap generated at public/sitemap.xml");
}

generateSitemap().catch((err) => {
  console.error("❌ Error generating sitemap:", err);
});
