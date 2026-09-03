const allowedMediaTypes = [
  'image/*',
  'video/*',
  'audio/*',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.*',
  'text/plain',
  'text/csv',
];

const deniedTypes = [
  'image/svg+xml',
  'application/vnd.microsoft.portable-executable',
  'application/x-msdownload',
  'application/x-msdos-program',
  'application/x-executable',
  'application/x-dosexec',
  'application/x-sh',
  'text/x-shellscript',
  'application/x-mach-binary',
];

module.exports = ({ env }) => {
  // If Cloudinary credentials are set (production/Render), store uploads there —
  // Render's free web service has no persistent disk, so anything saved locally
  // is wiped on every restart/redeploy. Without those env vars (local dev), Strapi
  // falls back to its default local-disk provider automatically.
  const cloudinaryConfigured = Boolean(env('CLOUDINARY_NAME'));

  return {
    'users-permissions': {
      config: {
        jwtManagement: 'refresh',
        sessions: {
          httpOnly: true,
        },
      },
    },
    upload: {
      config: {
        ...(cloudinaryConfigured
          ? {
              provider: 'cloudinary',
              providerOptions: {
                cloud_name: env('CLOUDINARY_NAME'),
                api_key: env('CLOUDINARY_KEY'),
                api_secret: env('CLOUDINARY_SECRET'),
              },
              actionOptions: {
                upload: {},
                delete: {},
              },
            }
          : {}),
        security: {
          allowedTypes: allowedMediaTypes,
          deniedTypes,
        },
      },
    },
  };
};
