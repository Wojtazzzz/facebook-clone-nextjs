/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost', 'images.unsplash.com', 'picsum.photos'],
    },
};

module.exports = nextConfig;
