import { ButtonHTMLAttributes, forwardRef } from 'react';
import classes from './button.module.css';
import clsx from 'clsx';

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, TButtonProps>((props, ref) => (
  <button
    {...props}
    className={clsx(classes.button, props.className)}
    ref={ref}
  />
));

Button.displayName = 'Button';

export { Button };
