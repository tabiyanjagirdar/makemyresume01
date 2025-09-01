import { db } from "../src/firebase"; // adjust path to your firebase.js
import { collection, getDocs } from "firebase/firestore";

export default async function handler(req, res) {
  try {
    const jobsSnapshot = await getDocs(collection(db, "jobs"));

    const jobs = jobsSnapshot.docs.map((doc) => ({
      slug: doc.data().slug,
      updatedAt: doc.data().createdAt?.toDate
        ? doc.data().createdAt.toDate().toISOString()
        : new Date().toISOString(),
    }));

    const baseUrl = "https://www.makemyresume.help";

    // Build XML sitemap
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
      ${jobs
        .map(
          (job) => `
        <url>
          <loc>${baseUrl}/jobs/${job.slug}</loc>
          <lastmod>${job.updatedAt}</lastmod>
        </url>
      `
        )
        .join("")}
    </urlset>`;

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(sitemap);
  } catch (err) {
    console.error("Error generating sitemap:", err);
    res.status(500).send("Error generating sitemap");
  }
}
