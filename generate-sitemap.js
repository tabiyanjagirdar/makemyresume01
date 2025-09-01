import fs from 'fs';

const baseUrl = 'https://www.makemyresume.help';

// Add your static pages
const pages = [
  { url: '', priority: 1.0, freq: 'daily' },
  { url: 'jobs', priority: 0.9, freq: 'daily' },
  { url: 'courses', priority: 0.9, freq: 'weekly' },
  { url: 'about', priority: 0.6, freq: 'monthly' },
  { url: 'contact', priority: 0.6, freq: 'monthly' },
  { url: 'privacy-policy', priority: 0.5, freq: 'yearly' },
];

// Generate XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

pages.forEach(page => {
  sitemap += `  <url>\n`;
  sitemap += `    <loc>${baseUrl}/${page.url}</loc>\n`;
  sitemap += `    <priority>${page.priority}</priority>\n`;
  sitemap += `    <changefreq>${page.freq}</changefreq>\n`;
  sitemap += `  </url>\n`;
});

sitemap += `</urlset>`;

// Save to public folder so it’s accessible
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated!');
