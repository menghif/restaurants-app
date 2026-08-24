/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [50, 75],
  },
  allowedDevOrigins: ['*.ts.net']
};

module.exports = nextConfig;
