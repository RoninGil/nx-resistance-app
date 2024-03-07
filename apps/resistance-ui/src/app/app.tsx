// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';
import { ColorPicker } from './components';

const colorsTest = [
  {
    name: 'red',
  },
  {
    colorHexCode: '#000000',
  },
];

export function App() {
  return <ColorPicker colorValues={colorsTest} />;
}

export default App;
