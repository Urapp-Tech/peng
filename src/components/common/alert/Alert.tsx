import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RocketIcon } from 'lucide-react';

interface ToastAlertProps {
  variant: 'success' | 'error' | 'normal';
  message: string;
}

const ToastAlert: React.FC<ToastAlertProps> = ({ variant, message }) => {
  const getIcon = () => {
    switch (variant) {
      case 'success':
        return <RocketIcon className="h-4 w-4 text-green-500" />;
      case 'error':
        return <RocketIcon className="h-4 w-4 text-red-500" />;
      default:
        return <RocketIcon className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Alert>
      {getIcon()}
      <AlertTitle>
        {variant === 'success'
          ? 'Success!'
          : variant === 'error'
            ? 'Error!'
            : 'Heads up!'}
      </AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default ToastAlert;
