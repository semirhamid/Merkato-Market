import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr'; // make sure to import it
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')
export default defineConfig({
    plugins: [react(), svgr()],
     server: {
    port: 5173
  }
});