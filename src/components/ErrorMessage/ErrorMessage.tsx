import { forwardRef } from 'react';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(({ className, children, ...rest }, ref) => {
  return (
    <p ref={ref} className={`absolute mt-2 text-caption-12r text-state-error before:content-['•'] before:mr-1 before:inline-block ${className}`} {...rest}>
      {children}
    </p>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
