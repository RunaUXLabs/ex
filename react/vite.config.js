import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ex/react/', // GitHub Pages에서 react 프로젝트의 경로
  build: {
    outDir: '../../dist/react', // 루트의 dist/react에 빌드
    emptyOutDir: false, // 다른 프로젝트 결과 삭제 방지
  },
});
