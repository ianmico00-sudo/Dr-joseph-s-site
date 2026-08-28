'use strict';

const fs = require('fs');
const path = require('path');

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Uploads a local file (from seed-assets/) into the Strapi media library
 * and returns the created file entity.
 */
async function uploadSeedImage(strapi, filename, mime = 'image/jpeg') {
  const filePath = path.join(__dirname, '..', 'seed-assets', filename);
  const stats = fs.statSync(filePath);

  const [uploaded] = await strapi.plugin('upload').service('upload').upload({
    data: {
      fileInfo: {
        alternativeText: filename,
        caption: filename,
      },
    },
    files: {
      filepath: filePath,
      originalFilename: filename,
      mimetype: mime,
      size: stats.size,
    },
  });

  return uploaded;
}

async function seedProfile(strapi) {
  const existing = await strapi.documents('api::profile.profile').findFirst();
  if (existing) return;

  strapi.log.info('[seed] Uploading profile images...');
  const portrait = await uploadSeedImage(strapi, 'portrait.jpg');
  const communityPhoto = await uploadSeedImage(strapi, 'community.jpg');
  const kigaliPhoto = await uploadSeedImage(strapi, 'kigali-dusk.jpg');

  strapi.log.info('[seed] Creating Profile singleton...');
  await strapi.documents('api::profile.profile').create({
    data: {
      heroEyebrow:
        'Peacebuilder · Public Health Advocate · Executive Director, Never Again Rwanda',
      heroTitleLine1: 'Dr. Joseph Ryarasa',
      heroTitleAccent: 'Nkurunziza',
      roles: ['Peacebuilder', 'Public Health Advocate', 'Human Rights Champion', 'Physician'],
      heroLede:
        'A medical doctor and public health practitioner who has bridged the gap between healthcare and social justice — applying clinical leadership to champion good governance, human rights, and accountability as essential pillars of a healthier public.',
      bridgeEyebrow: 'The Bridge',
      bridgeTitle: 'From treating the body to healing the body politic.',
      bridgeBody1:
        'Dr. Joseph Ryarasa Nkurunziza, MD, is a medical doctor, public health practitioner and social justice activist with over 15 years of experience. He earned his medical degree from the National University of Rwanda. His clinical career spanned HIV care and treatment — as an HIV clinician at the Rwanda Military Hospital, Clinical Service Director at Drew Cares International, and Clinical Services Specialist with the DoD HIV/AIDS Prevention Program and the US Embassy in Rwanda. He also served as Health Coordinator for the Millennium Village Project with the Earth Institute at Columbia University.',
      bridgeBody2:
        'He is the co-founder and Executive Director of Never Again Rwanda, a peacebuilding and social justice organization founded in 2002 in response to the 1994 Genocide against the Tutsi. He also serves as President of the African Democracy Forum, Chairperson of the Rwanda Civil Society Platform, and co-founder of the Health Development Initiative. Through this work he recognized that clinical care alone cannot fix health inequities without addressing underlying structural issues — and now champions good governance, human rights, and accountability as foundations of a healthier public.',
      ctaTitle: "Let's work together to move health and justice forward.",
      ctaSub:
        'For collaboration, speaking engagements, media inquiries, or academic partnerships.',
      contactEmail: 'engagement@josephryarasa.rw',
      socialLinkedin: '',
      socialX: '',
      socialResearchGate: '',
      socialGoogleScholar: '',
      portrait: portrait.id,
      communityPhoto: communityPhoto.id,
      kigaliPhoto: kigaliPhoto.id,
    },
  });
}

async function seedArticles(strapi) {
  const results = await strapi.documents('api::article.article').findMany({ limit: 1 });
  if (results.length) return;

  strapi.log.info('[seed] Creating Articles...');
  const articles = [
    {
      title: 'The National Budget Has Been Approved: Now Citizens Must Demand Accountability',
      section: 'insights',
      tag: 'Economy',
      excerpt:
        'Every year citizens closely follow the national budget. Once approved, the real test begins: holding institutions accountable for translating allocations into services.',
      publishDate: '2026-07-10',
      readTime: '3 min',
      featuredOnHome: true,
      homeOrder: 1,
    },
    {
      title: 'Healing Requires Conversation: Breaking the Silence Responsibly',
      section: 'reflections',
      tag: 'Memory & Justice',
      excerpt:
        'Healing is not a one time event; it is a continuous process. Silence alone cannot sustain it. Responsible conversation, grounded in respect and a shared commitment to truth, can.',
      publishDate: '2026-04-15',
      readTime: '5 min',
      featuredOnHome: true,
      homeOrder: 2,
    },
    {
      title: 'When Labels Become Dangerous: Lessons from Rwanda 32 Years Later',
      section: 'reflections',
      tag: 'Memory & Justice',
      excerpt:
        'Hatred is neither natural nor inevitable; it is a learned behavior. Because it is learned, it can be unlearned. If hatred is built brick by brick, then unity is built the same way.',
      publishDate: '2026-04-08',
      readTime: '4 min',
      featuredOnHome: true,
      homeOrder: 3,
    },
  ];

  for (const data of articles) {
    await strapi
      .documents('api::article.article')
      .create({ data: { ...data, slug: slugify(data.title) }, status: 'published' });
  }
}

async function seedMediaAppearances(strapi) {
  const results = await strapi
    .documents('api::media-appearance.media-appearance')
    .findMany({ limit: 1 });
  if (results.length) return;

  strapi.log.info('[seed] Creating Media Appearances...');
  const items = [
    {
      title: 'Dutch Students Explore the Role of Youth in Peacebuilding',
      appearanceType: 'News',
      date: '2019-06-15',
      excerpt:
        'The opening of a youth peacebuilding exchange was chaired by Dr. Joseph Ryarasa Nkurunziza, Executive Director of Never Again Rwanda.',
      section: 'media-conversations',
      featuredOnHome: true,
      homeOrder: 1,
    },
    {
      title: 'Trauma Healing Needs to Be at the Centre of Peace and Development Efforts',
      appearanceType: 'News',
      date: '2019-04-06',
      excerpt:
        '25 years after the Genocide against the Tutsi, Dr Joseph Ryarasa Nkurunziza, Executive Director of Never Again Rwanda, reflects on trauma healing.',
      externalUrl:
        'https://www.interpeace.org/2019/04/trauma-healing-needs-to-be-at-the-centre-of-peace-and-development-efforts/',
      section: 'media-conversations',
      featuredOnHome: true,
      homeOrder: 2,
    },
    {
      title: 'Interview with Dr. Joseph Nkurunziza, Executive Director of Never Again Rwanda',
      appearanceType: 'Video',
      date: '2018-12-17',
      excerpt:
        'Dr. Joseph Ryarasa Nkurunziza speaks about the vision and mission of Never Again Rwanda, peacebuilding after the genocide.',
      section: 'media-conversations',
      featuredOnHome: true,
      homeOrder: 3,
    },
  ];

  for (const data of items) {
    await strapi
      .documents('api::media-appearance.media-appearance')
      .create({ data, status: 'published' });
  }
}

async function seedTimeline(strapi) {
  const results = await strapi.documents('api::timeline-entry.timeline-entry').findMany({ limit: 1 });
  if (results.length) return;

  strapi.log.info('[seed] Creating Timeline Entries...');
  const entries = [
    {
      tag: 'Medical Degree',
      title: 'National University of Rwanda — MD',
      description:
        'Graduated as a medical doctor, followed by postgraduate training in public health and HIV/AIDS care at the University of Roehampton, Antwerp, and UC San Diego.',
      order: 1,
    },
    {
      tag: '2002 — Present',
      title: 'Co-founder & Executive Director, Never Again Rwanda',
      description:
        'A peacebuilding and social justice organization founded in response to the 1994 Genocide against the Tutsi.',
      order: 2,
    },
    {
      tag: '2008 — 2016',
      title: 'Clinical Leadership',
      description:
        'HIV clinician at the Rwanda Military Hospital; Clinical Service Director, Drew Cares International; Clinical Services Specialist, DoD HIV/AIDS Prevention Program & US Embassy Rwanda; Health Coordinator, Earth Institute (Columbia University) Millennium Village Project.',
      order: 3,
    },
    {
      tag: '2010',
      title: 'JCI TOYP Award — Osaka, Japan',
      description:
        'Named one of the Ten Most Outstanding Young Persons of the World by Junior Chambers International.',
      order: 4,
    },
  ];

  for (const data of entries) {
    await strapi.documents('api::timeline-entry.timeline-entry').create({ data, status: 'published' });
  }
}

async function seedPillars(strapi) {
  const results = await strapi.documents('api::pillar.pillar').findMany({ limit: 1 });
  if (results.length) return;

  strapi.log.info('[seed] Creating Pillars...');
  const pillars = [
    {
      title: 'Public Health',
      description: 'HIV/AIDS care, health systems, and universal coverage in low-resource settings.',
      order: 1,
      featured: false,
    },
    {
      title: 'Good Governance',
      description: 'Accountability, decentralization, and citizen-centred service delivery.',
      order: 2,
      featured: true,
    },
    {
      title: 'Human Rights',
      description: 'Civic space, dignity, and the protection of vulnerable populations.',
      order: 3,
      featured: false,
    },
    {
      title: 'Peacebuilding',
      description: 'Reconciliation, social cohesion, and youth engagement in governance.',
      order: 4,
      featured: false,
    },
  ];

  for (const data of pillars) {
    await strapi.documents('api::pillar.pillar').create({ data, status: 'published' });
  }
}

/**
 * Opens up "find" and "findOne" for the public role on every content type
 * this site's frontend needs to read without authentication.
 */
async function setPublicPermissions(strapi) {
  const publicRole = await strapi
    .query('plugin::users-permissions.role')
    .findOne({ where: { type: 'public' } });
  if (!publicRole) return;

  const uids = [
    'api::article.article',
    'api::media-appearance.media-appearance',
    'api::library-item.library-item',
    'api::timeline-entry.timeline-entry',
    'api::pillar.pillar',
    'api::profile.profile',
  ];
  const actions = ['find', 'findOne'];

  for (const uid of uids) {
    for (const action of actions) {
      const actionId = `${uid}.${action}`;
      const existing = await strapi.query('plugin::users-permissions.permission').findOne({
        where: { action: actionId, role: publicRole.id },
      });
      if (!existing) {
        await strapi.query('plugin::users-permissions.permission').create({
          data: { action: actionId, role: publicRole.id },
        });
      }
    }
  }

  strapi.log.info('[seed] Public read permissions set for all content types.');
}

module.exports = {
  register(/*{ strapi }*/) {},

  async bootstrap({ strapi }) {
    const steps = [
      ['profile', seedProfile],
      ['articles', seedArticles],
      ['media appearances', seedMediaAppearances],
      ['timeline', seedTimeline],
      ['pillars', seedPillars],
      ['permissions', setPublicPermissions],
    ];
    for (const [label, fn] of steps) {
      try {
        await fn(strapi);
      } catch (err) {
        strapi.log.error(`[seed] ${label} failed: ${err.message}`);
        console.error(err);
      }
    }
  },
};
