import { defineConfig } from '@vben/vite-config';

import AutoImport from 'unplugin-auto-import/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(async () => {
  return {
    vite: {
      plugins: [
        AutoImport({
          dts: './src/auto-imports.d.ts',
          imports: ['vue', 'vue-router'],
        }),
        Components({
          dts: './src/components.d.ts',
          resolvers: [
            AntDesignVueResolver({
              importStyle: false, // css in js
            }),
          ],
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            // target: 'http://localhost:5320/api',
            target: 'http://localhost:8081',
            ws: true,
          },
        },
      },
    },
  };
});
