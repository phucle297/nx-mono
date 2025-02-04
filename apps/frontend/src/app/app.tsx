// Uncomment this line to use CSS modules
// import styles from './app.module.css';
import NxWelcome from './nx-welcome';
import { Button } from '@mabinogi/ui';
import classes from './app.module.css';

export function App() {
  return (
    <div className={classes.container}>
      <Button className={classes.button}>Custom button</Button>
      <NxWelcome title="frontend" />
    </div>
  );
}

export default App;
