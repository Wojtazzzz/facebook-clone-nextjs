import { useEffect, useCallback } from 'react';

type Keys = 'Escape';

export const useKey = (key: Keys, callback: () => void) => {
    const onPressKey = useCallback(
        (event) => {
            if (event.key === key) callback();
        },
        [key, callback]
    );

    useEffect(() => {
        document.addEventListener('keydown', onPressKey);

        return () => document.removeEventListener('keydown', onPressKey);
    }, [onPressKey]);
};
