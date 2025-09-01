import fs from "fs";
import path from "path";
import admin from "firebase-admin";

// 🔹 Load Firebase Service Account from environment variable or local file
let serviceAccount;
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    console.error("❌ Invalid FIREBASE_SERVICE_ACCOUNT JSON:", err);
    process.exit(1);
  }
} else {
  // fallback for local testing
  serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));
}

// 🔹 Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();
const BASE_URL = "https://www.makemyresume.help";

async function generateSitemap() {
  try {
    const pages = [
      { url: "", priority: 1.0 },          // Home
      { url: "jobs", priority: 0.9 },      // Jobs listing
      { url: "courses", priority: 0.9 },   // Courses listing
    ];

    // 🔹 Fetch jobs from Firestore
    const jobsSnapshot = await db.collection("jobs").get();
    jobsSnapshot.forEach((doc) => {
      const job = doc.data();
      if (job.slug) {
        pages.push({
          url: `jobs/${job.slug}`,
          priority: 0.8,
          lastmod: job.updatedAt?.toDate?.() || new Date(),
        });
      }
    });

    // 🔹 Fetch courses from Firestore
    const coursesSnapshot = await db.collection("courses").get();
    coursesSnapshot.forEach((doc) => {
      const course = doc.data();
      if (course.slug) {
        pages.push({
          url: `courses/${course.slug}`,
          priority: 0.8,
          lastmod: course.updatedAt?.toDate?.() || new Date(),
        });
      }
    });

    // 🔹 Build XML
    const urlsXml = pages
      .map(
        (page) => `
  <url>
    <loc>${BASE_URL}/${page.url}</loc>
    <lastmod>${(page.lastmod || new Date()).toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("");

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    // 🔹 Write to public folder
    const filePath = path.resolve("public", "sitemap.xml");
    fs.writeFileSync(filePath, sitemapXml, "utf8");

    console.log("✅ Sitemap generated at public/sitemap.xml");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
    process.exit(1);
  }
}

generateSitemap();
