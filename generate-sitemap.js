import fs from "fs";
import path from "path";
import admin from "firebase-admin";

// Load Firebase Service Account from GitHub Secret (or local env for testing)
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "{}");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const db = admin.firestore();

async function generateSitemap() {
  try {
    const pages = [
      { url: "", priority: 1.0 },
      { url: "jobs", priority: 0.8 },
      { url: "courses", priority: 0.8 },
    ];

    // Fetch jobs from Firestore
    const jobsSnapshot = await db.collection("jobs").get();
    jobsSnapshot.forEach((doc) => {
      const job = doc.data();
      if (job.slug) {
        pages.push({
          url: `jobs/${job.slug}`,
          priority: 0.7,
        });
      }
    });

    // Fetch courses from Firestore
    const coursesSnapshot = await db.collection("courses").get();
    coursesSnapshot.forEach((doc) => {
      const course = doc.data();
      if (course.slug) {
        pages.push({
          url: `courses/${course.slug}`,
          priority: 0.7,
        });
      }
    });

    // Build XML
    const baseUrl = "https://www.makemyresume.help";
    const urls = pages
      .map(
        (page) => `
  <url>
    <loc>${baseUrl}/${page.url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${page.priority}</priority>
  </url>`
      )
      .join("");

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    // Save to public folder
    const filePath = path.resolve("public", "sitemap.xml");
    fs.writeFileSync(filePath, sitemap, "utf8");

    console.log("✅ Sitemap generated at public/sitemap.xml");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
    process.exit(1);
  }
}

generateSitemap();
