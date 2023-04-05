import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default ({ mode }) => {
  const isProduction = mode === 'production';
  const publicPath = isProduction ? '/chatgpt-frontend/dist/' : '/';

  return defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
      alias: {
        src: '/src',
      },
    },
  });
};
