/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'localhost',
            'images.unsplash.com',
            'picsum.photos',
            'via.placeholder.com',
            // 'scontent.fktw1-1.fna.fbcdn.net'
        ],
    },
};

module.exports = nextConfig;
