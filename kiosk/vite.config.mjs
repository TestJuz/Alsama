import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('.',import.meta.url));
export default defineConfig({root, plugins:[react()], publicDir:fileURLToPath(new URL('../public',import.meta.url)),base:'./',build:{outDir:'dist',emptyOutDir:true,target:'chrome100'}});