/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'images.unsplash.com', 'picsum.photos', 'via.placeholder.com', 'api.fb-clone.pl'],
    },
};

module.exports = nextConfig;
