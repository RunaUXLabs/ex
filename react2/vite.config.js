import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react2/', // GitHub Pages에서 react2 프로젝트의 경로
  build: {
    outDir: '../dist/react2', // 상위 디렉토리의 dist/react2에 빌드
    emptyOutDir: false,
  },
});
