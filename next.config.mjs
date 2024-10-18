/** @type {import('next').NextConfig} */
const nextConfig = {
async redirects() {
    return [
        {
        source: '/:path',
        destination: '/maintenance',
        permanent: false,
        },

    ];
}
}
export default nextConfig;
