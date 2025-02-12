import BaseButton, { ButtonProps } from './BaseButton';
import clsx from 'clsx';

export default function CapsuleButton(props: ButtonProps) {
  return <BaseButton {...props} className={clsx('rounded-full', props.className)} />;
}
