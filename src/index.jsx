import { createRoot } from 'react-dom/client';
import { MainView } from './components/main-view/main-view';
import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';

const MyFlixApplication = () => {
  return (
    <Container>
      <MainView />
    </Container>
  );
};

// Shows the root of your app //
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<MyFlixApplication />);