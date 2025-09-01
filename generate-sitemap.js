import fs from "fs";
import path from "path";
import admin from "firebase-admin";

// Load Firebase Service Account
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT || fs.readFileSync("serviceAccountKey.json", "utf8")
);

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

    // Fetch jobs
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

    // Fetch courses
    const coursesSnapshot = await db.collection("courses").get();
    const courses = [];
    coursesSnapshot.forEach((doc) => {
      const course = doc.data();
      if (course.slug) {
        pages.push({
          url: `courses/${course.slug}`,
          priority: 0.7,
        });
        courses.push({
          title: course.title,
          description: course.description,
          link: course.link,
          slug: course.slug,
          price: course.price || "0",
          instructor: course.instructor || "MakeMyResume Team",
        });
      }
    });

    // Base URL
    const baseUrl = "https://www.makemyresume.help";

    // Sitemap XML
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

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

    fs.writeFileSync(path.resolve("public", "sitemap.xml"), sitemapXml, "utf8");
    console.log("✅ Sitemap generated at public/sitemap.xml");

    // JSON-LD for Courses
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Free Courses",
      "itemListElement": courses.map((course, idx) => ({
        "@type": "Course",
        "position": idx + 1,
        "name": course.title,
        "description": course.description,
        "url": course.link,
        "provider": {
          "@type": "Organization",
          "name": "MakeMyResume",
          "sameAs": baseUrl,
        },
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "name": course.title,
          "description": course.description,
          "url": course.link,
          "instructor": {
            "@type": "Person",
            "name": course.instructor,
          },
          "offers": {
            "@type": "Offer",
            "url": course.link,
            "price": course.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
          },
        },
      })),
    };

    fs.writeFileSync(path.resolve("public", "courses.jsonld"), JSON.stringify(jsonLd, null, 2), "utf8");
    console.log("✅ JSON-LD generated at public/courses.jsonld");
  } catch (err) {
    console.error("❌ Error generating sitemap:", err);
    process.exit(1);
  }
}

generateSitemap();
