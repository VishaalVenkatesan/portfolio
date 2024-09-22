/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
    images: {
    domains: [process.env.AWS_DOMAIN],
  },
  env: {
    POSTGRES_DATABASE: process.env.POSTGRES_DATABASE,
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_URL: process.env.POSTGRES_URL,
  },
}

export default nextConfig;
