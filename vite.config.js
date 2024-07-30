/* import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' */

// https://vitejs.dev/config/
/* export default defineConfig({
  plugins: [react()],
}) */


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import nodePolyfills from 'rollup-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()
  ],
  resolve: {
    alias: {
      buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6'
    }
  }
});
