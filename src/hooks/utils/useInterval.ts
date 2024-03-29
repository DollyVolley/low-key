import React, { useState, useEffect, useRef } from 'react';

// Thanks to Dan https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export function useInterval(callback: () => any, delay: number) {
  const savedCallback = useRef<()=>any>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current!();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}