import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { EMAIL, INSTAGRAM_URL, WHATSAPP_DISPLAY, faqs, products, services } from './src/data/content.js'

// Public URL of the site, without trailing slash. Set SITE_URL in Amplify's
// environment variables once the final domain is known.
const SITE_URL = (process.env.SITE_URL || 'https://salvaia.com').replace(/\/+$/, '')

function jsonLd() {
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Salva IA',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/icon-512.png`,
      email: EMAIL,
      sameAs: [INSTAGRAM_URL],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: WHATSAPP_DISPLAY.replace(/\s+/g, ''),
        contactType: 'customer support',
        availableLanguage: ['es'],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Salva IA',
      inLanguage: 'es',
      publisher: { '@id': `${SITE_URL}/#organization` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
  return `<script type="application/ld+json">${json.replace(/</g, '\\u003c')}</script>`
}

// Injects SITE_URL and JSON-LD into index.html and emits robots.txt + sitemap.xml.
function seo() {
  let isSsr = false
  return {
    name: 'salva-seo',
    configResolved(config) {
      isSsr = !!config.build.ssr
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', SITE_URL).replace('<!--JSON-LD-->', jsonLd()),
    },
    generateBundle() {
      if (isSsr) return
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`,
      })
      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source:
          '<?xml version="1.0" encoding="UTF-8"?>\n' +
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
          `  <url>\n    <loc>${SITE_URL}/</loc>\n    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>\n  </url>\n` +
          '</urlset>\n',
      })
      // https://llmstxt.org — summary for AI assistants and agents
      this.emitFile({
        type: 'asset',
        fileName: 'llms.txt',
        source: [
          '# Salva IA',
          '',
          '> Acompañamiento para mamás en el embarazo y el posparto: rutinas de recuperación, nutrición, conversaciones y una red de especialistas. No sustituye atención médica.',
          '',
          '## Servicios',
          '',
          ...services.map((s) => `- ${s.title}: ${s.text}`),
          '',
          '## Programas y productos',
          '',
          ...products.map((p) => `- ${p.title} (${p.type}, ${p.price}): ${p.desc}`),
          '',
          '## Preguntas frecuentes',
          '',
          ...faqs.map((f) => `- ${f.q} ${f.a}`),
          '',
          '## Contacto',
          '',
          `- [Sitio web](${SITE_URL}/)`,
          `- WhatsApp: ${WHATSAPP_DISPLAY}`,
          `- Email: ${EMAIL}`,
          `- [Instagram](${INSTAGRAM_URL})`,
          '',
        ].join('\n'),
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), seo()],
})
