// components/OptimizedImage.jsx
import React, { memo, useState } from 'react';

const OptimizedImage = memo(({ 
  src, 
  alt, 
  width, 
  height, 
  className = '',
  loading = 'lazy',
  onLoad,
  onError,
  ...props 
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = (e) => {
    setLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e) => {
    setLoaded(true);
    onError?.(e);
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      onLoad={handleLoad}
      onError={handleError}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
      decoding="async"
      {...props}
    />
  );
});

export default OptimizedImage;