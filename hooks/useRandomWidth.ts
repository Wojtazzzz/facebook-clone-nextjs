import { getRandomInt } from '@utils/getRandomInt';
import { useEffect, useState } from 'react';

export const useRandomWidth = (min: number, max: number) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(getRandomInt(min, max));
    }, [min, max]);

    return {
        width,
    };
};
