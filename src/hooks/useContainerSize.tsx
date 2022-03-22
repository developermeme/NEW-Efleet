import { RefObject, useState, useEffect } from "react";

const getSize = <T extends HTMLElement = HTMLElement>(ref: RefObject<T>) => {
  const { current } = ref;

  if (current) {
    return current.getBoundingClientRect();
  }

  return {
    height: 0,
    width: 0,
  };
};

const resizeThrottler = (actualResizeHandler: () => void, throttle: number) => {
  let resizeTimeout = null;
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(function () {
      resizeTimeout = null;
      actualResizeHandler();
    }, throttle);
  }
};

export const useContainerSize = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  toggle: boolean | undefined = false,
  throttle: number = 250
) => {
  const [containerSize, setContainerSize] = useState(getSize(ref));

  function handleResize() {
    setContainerSize(getSize(ref));
  }

  useEffect(() => {
    window.addEventListener(
      "resize",
      resizeThrottler(handleResize, throttle) as any
    );

    return () => {
      window.removeEventListener(
        "resize",
        resizeThrottler(handleResize, throttle) as any
      );
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  useEffect(() => {
    handleResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggle]);

  return containerSize;
};
