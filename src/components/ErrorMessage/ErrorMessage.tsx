import { forwardRef } from 'react';
import { cn } from 'src/lib/utils';

export interface ErrorMessageProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const ErrorMessage = forwardRef<HTMLParagraphElement, ErrorMessageProps>(({ className, children, ...rest }, ref) => {
  return (
    <p ref={ref} className={cn("mt-2 text-caption-12r text-state-error before:content-['•'] before:mr-1 before:inline-block", className)} {...rest}>
      {children}
    </p>
  );
});

ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
