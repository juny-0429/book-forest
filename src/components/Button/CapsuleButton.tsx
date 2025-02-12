import Button, { ButtonProps } from './Button';
import { cn } from 'src/lib/utils';

export default function CapsuleButton(props: ButtonProps) {
  return <Button {...props} className={cn('rounded-full', props.className)} />;
}
