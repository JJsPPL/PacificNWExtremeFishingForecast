
// Check if we're in development mode (Lovable.dev or Preview)
export const isDevelopmentMode = () => {
  return (
    window.location.hostname === 'localhost' || 
    window.location.hostname.includes('127.0.0.1') ||
    window.location.hostname.includes('lovable.dev') ||
    window.location.hostname.includes('lovable.app')
  );
};
