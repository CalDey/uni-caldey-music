import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
const isH5 = process.env.UNI_PLATFORM === "h5";
const isApp = process.env.UNI_PLATFORM === "app";
const WeappTailwindcssDisabled = isH5 || isApp;
// import commonjs from "@rollup/plugin-commonjs";
import vwt from "weapp-tailwindcss-webpack-plugin/vite";

const postcssPlugins = [require("autoprefixer")(), require("tailwindcss")()];
if (!WeappTailwindcssDisabled) {
  postcssPlugins.push(
    require("postcss-rem-to-responsive-pixel")({
      rootValue: 32,
      propList: ["*"],
      transformUnit: "rpx",
    })
  );
}
export default defineConfig({
  // vwt 一定要放在 uni 后面
  plugins: [uni(), WeappTailwindcssDisabled ? undefined : vwt()],
  // 假如 postcss.config.js 不起作用，请使用内联 postcss
  css: {
    postcss: {
      plugins: postcssPlugins,
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      sourceMap: false,
      compress: {
        drop_console: true,
        drop_debugger: true,
      }
    }
  },
  resolve: {
    alias: {
        '@': '/src/'
    }
  },
  server: {
    watch: {
      usePolling: true,   // 修复HMR
    },
  }
});
