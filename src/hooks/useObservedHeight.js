import { useEffect, useState } from 'react';

export default function useObservedHeight(elementRef) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const observerRef = elementRef.current;

    const observer = new ResizeObserver(entries => {
      const [entry] = entries;
      const contentReactHeight = entry?.target?.clientHeight;
      setHeight(contentReactHeight);
    });

    if (observerRef) observer.observe(observerRef);

    return () => {
      if (observerRef) observer.unobserve(observerRef);
    };
  }, [elementRef]);

  return height;
}
