import { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

import { clsx } from 'clsx';

import type { RefObject } from 'react';
import type InfiniteScroll from 'react-infinite-scroll-component';

interface ScrollToTopProps {
    postsListRef: RefObject<InfiniteScroll>;
}

export const ScrollToTop = ({ postsListRef }: ScrollToTopProps) => {
    const [scrollDistance, setScrollDistance] = useState(0);

    useEffect(() => {
        const list = postsListRef.current?.getScrollableTarget();

        list?.addEventListener('scroll', () => setScrollDistance(list.scrollTop));

        return () => list?.removeEventListener('scroll', () => setScrollDistance(list.scrollTop));
    }, [postsListRef]);

    const handleScrollToTop = () => {
        if (!postsListRef.current) return;

        const list = postsListRef.current.getScrollableTarget();

        list && list.scroll(0, 0);
    };

    return (
        <button
            aria-label="Scroll posts list to top"
            title="Scroll posts list to top"
            className={clsx(
                'w-12 h-12 flex justify-center items-center fixed bottom-16 right-6 z-30 bg-dark-100 transition-opacity hover:opacity-60 rounded-2xl cursor-pointer',
                scrollDistance > 1000 && 'opacity-80',
                scrollDistance < 1000 && 'opacity-0 pointer-events-none'
            )}
            onClick={handleScrollToTop}
        >
            <FontAwesomeIcon icon={faArrowUp} className="text-2xl text-light-100" />
        </button>
    );
};
