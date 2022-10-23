/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'images.unsplash.com', 'picsum.photos', 'via.placeholder.com', 'api.surface-app.pl'],
    },
};

module.exports = nextConfig;
