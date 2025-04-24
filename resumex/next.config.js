/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  assetPrefix: isProd ? "/COSC-4P02-PROJECT/" : "",
  images: {
    unoptimized: true, 
  },
  compiler: {
    removeConsole: isProd,
  },
};

export default nextConfig;
