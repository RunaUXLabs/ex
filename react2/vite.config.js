import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../dist/react2', // 빌드 결과를 루트의 dist/react2로 설정
    emptyOutDir: true, // 기존 파일 삭제
  },
});
