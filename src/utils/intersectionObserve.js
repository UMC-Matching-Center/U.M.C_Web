import { useState, useEffect, useCallback } from "react";

// 옵션 값을 지정한다.
const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: "0px",
};

// 커스텀 훅 부분
const useIntersect = (onIntersect, option) => {
  const [ref, setRef] = useState(null);

  // Intersection Observer의 콜백 함수
  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        onIntersect(entry, observer);
      }
    },
    [onIntersect]
  );

  useEffect(() => {
    let observer;
    if (ref) {
      // 관찰대상이 존재하는 경우에만 관찰자 생성
      observer = new IntersectionObserver(checkIntersect, {
        ...defaultOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => observer && observer.disconnect();
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);

  return [ref, setRef];
};

export default useIntersect;
