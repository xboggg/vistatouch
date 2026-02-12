
import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

const useIntersectionObserver = (
    elementRef: RefObject<Element>,
    options: IntersectionObserverOptions = {}
): boolean => {
    const { threshold = 0.1, root = null, rootMargin = '0%' } = options;
    const [isIntersecting, setIsIntersecting] = useState(false);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsIntersecting(true);
                    // Disconnect the observer once the element is visible
                    // so the animation only runs once.
                    observer.unobserve(element);
                }
            },
            { threshold, root, rootMargin }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [elementRef, threshold, root, rootMargin]);

    return isIntersecting;
};

export default useIntersectionObserver;
