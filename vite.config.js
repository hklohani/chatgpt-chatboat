import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createHtmlPlugin } from 'vite-plugin-html'

export default ({ mode }) => {
  const isProduction = mode === 'production';
  const publicPath = isProduction ? '/chatgpt-frontend/dist/' : '/';

  return defineConfig({
    base: publicPath,
    plugins: [
      react(),
      createHtmlPlugin({
        minify: true, // minify the output HTML
        inject: {
          // inject a custom function to modify the generated HTML
          injectData: {
            // define the path replacements here
            replacements: [{ search: '/chatgpt-frontend/dist/', replace: './' }],
          },
          // define a custom function to modify the generated HTML
          tags: () => {
            return [
              {
                tag: 'link',
                attrs: {
                  rel: 'icon',
                  type: 'image/svg+xml',
                  href: '/chatgpt-frontend/dist/vite.svg',
                },
              },
            ];
          },
        },
      }),
    ],
    resolve: {
      alias: {
        src: '/src',
      },
    },
  });
};
