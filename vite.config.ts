import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            const moduleName = id
              .slice(id.indexOf('node_modules/') + 'node_modules/'.length)
              .split('/')[0];

            return moduleName;
          }
        },
      },
    },
  },
});
