// components/OptimizedImage.jsx
import React, { memo, useState, useCallback } from 'react';

const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  loading = 'lazy',
  fallbackSrc = '/assets/placeholder.webp',
  onLoad,
  onError,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback((e) => {
    setLoaded(true);
    onLoad?.(e);
  }, [onLoad]);

  const handleError = useCallback((e) => {
    setLoaded(true);
    setHasError(true);
    onError?.(e);
  }, [onError]);

  const imageSrc = hasError ? fallbackSrc : src;

  return (
    <img
      src={imageSrc}
      alt={alt || ''}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={props.fetchPriority || (loading === 'eager' ? 'high' : 'auto')}
      onLoad={handleLoad}
      onError={handleError}
      className={`
        ${className} 
        ${loaded ? 'opacity-100' : 'opacity-0'} 
        transition-opacity duration-300
        object-cover
      `}
      decoding={loading === 'eager' ? 'sync' : 'async'}
      sizes={props.sizes}
      {...props}
    />
  );
});

// Default props for better consistency
OptimizedImage.defaultProps = {
  alt: '',
  loading: 'lazy',
  fallbackSrc: '/assets/placeholder.webp'
};

export default OptimizedImage;