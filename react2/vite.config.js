import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/ex/react2/', // GitHub Pages에서 react2 프로젝트의 경로
});
