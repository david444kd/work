// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   output: "standalone",
//   assetPrefix: ".",
// };

// export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (config, { isServer }) => {
//     config.optimization.minimizer = config.optimization.minimizer.map(
//       (minimizer) => {
//         if (minimizer.constructor.name === "TerserPlugin") {
//           minimizer.options.terserOptions = {
//             ...minimizer.options.terserOptions,
//             output: {
//               ...minimizer.options.terserOptions.output,
//               ascii_only: true,
//             },
//           };
//         }
//         return minimizer;
//       }
//     );
//     return config;
//   },
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.optimization.minimize = true;
    config.optimization.minimizer = config.optimization.minimizer.map(
      (minimizer) => {
        if (minimizer.constructor.name === "TerserPlugin") {
          minimizer.options.terserOptions = {
            ...minimizer.options.terserOptions,
            compress: {
              ...minimizer.options.terserOptions?.compress,
              unused: true,
            },
            mangle: true,
            output: {
              ascii_only: true,
              comments: false,
            },
          };
        }
        return minimizer;
      }
    );
    return config;
  },
  // Добавим эти настройки
  swcMinify: false, // Отключим swc минификацию
  experimental: {
    forceSwcTransforms: true,
  },
};

export default nextConfig;
