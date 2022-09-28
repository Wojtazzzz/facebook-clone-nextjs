import { getRandomInt } from '@utils/getRandomInt';
import { useEffect, useState } from 'react';

export const useRandomWidth = () => {
    const [width, setWidth] = useState({
        name: 0,
        date: 0,
        content: 0,
    });

    useEffect(() => {
        setWidth({
            name: getRandomInt(50, 140),
            date: getRandomInt(60, 160),
            content: getRandomInt(70, 100),
        });
    }, []);

    return {
        width,
    };
};
