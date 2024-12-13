import type { NextConfig } from "next";

// const isInProduction = process.env.NODE_ENV = 'production'

const nextConfig: NextConfig = {
//  basePath: isInProduction ? '/SongLyricsToJsonApp':'',
 output:"export",
 images:{
  unoptimized:true,
 }
};

export default nextConfig;
