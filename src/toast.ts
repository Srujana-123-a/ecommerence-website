interface Toast {
  message: string;
  duration?: number;
  // Add className property
  className?: string;
}
const toastProps: Toast = {
  message: 'Hello!',
  className: 'my-toast-class', // Add className directly (not recommended if not safe)
} as Toast;
