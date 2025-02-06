// Uncomment this line to use CSS modules
import NxWelcome from './nx-welcome';
import { Button } from '@mabinogi/ui';
import classes from './app.module.css';

export function App() {
  return (
    <div className={classes.container}>
      <h1>{import.meta.env.VITE_APP_TITLE}</h1>
      <Button className={classes.button}>Custom button</Button>
      <NxWelcome title="frontend" />
    </div>
  );
}

export default App;
