import { createRoot } from 'react-dom/client';
import ServicesPage from './ServicesPage.tsx';
import './index.css';

const rootEl = document.getElementById('root');
if (rootEl) {
  createRoot(rootEl).render(<ServicesPage />);
}
