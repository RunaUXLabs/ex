import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ex/react/',
  build: {
    outDir: 'dist', // 빌드 디렉토리
    rollupOptions: {
      input: '/index.html', // 진입 파일
    },
  },
});
