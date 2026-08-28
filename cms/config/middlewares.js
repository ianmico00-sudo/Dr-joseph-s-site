module.exports = ({ env }) => [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      // Comma-separated list of allowed frontend origins, e.g.
      // CORS_ORIGINS=https://joseph-nkurunziza.vercel.app,http://localhost:5173
      // Set this in Strapi Cloud's environment variables once the frontend
      // is deployed. Falls back to the local Vite dev server for local work.
      origin: env.array('CORS_ORIGINS', ['http://localhost:5173']),
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
