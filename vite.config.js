import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  base: getBase(),
});
function getBase() {
  if (process.env.NODE_ENV === 'production') {
    return 'chatgpt-frontend/dist/';
  } else {
    return '/';
  }
}
