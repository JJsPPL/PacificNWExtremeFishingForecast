
// Check if we're in development mode
export const isDevelopmentMode = () => {
  return (
    window.location.hostname === 'localhost' ||
    window.location.hostname.includes('127.0.0.1')
  );
};
