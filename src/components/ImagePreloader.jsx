// components/ImagePreloader.jsx
import { memo, useEffect, useState } from 'react';

export const ImagePreloader = memo(({ images, onComplete }) => {
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) {
      onComplete?.();
      return;
    }

    let mounted = true;
    const imagePromises = images.map((image) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          if (mounted) {
            setLoadedCount(prev => prev + 1);
            resolve();
          }
        };
        img.onerror = resolve; // تجاهل الأخطاء
        img.src = image.src;
      });
    });

    Promise.all(imagePromises).then(() => {
      if (mounted) onComplete?.();
    });

    return () => {
      mounted = false;
    };
  }, [images, onComplete]);

  return (
    <div className="sr-only" aria-live="polite">
      {loadedCount === images.length 
        ? 'تم تحميل جميع الصور' 
        : `جاري تحميل الصور ${loadedCount} من ${images.length}`}
    </div>
  );
});