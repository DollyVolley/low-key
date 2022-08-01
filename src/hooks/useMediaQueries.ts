import { useMediaQuery } from 'react-responsive';

// Source: Nikitas https://github.com/TeFiLuck/TeFiLuck-frontend/blob/master/src/hooks/useMediaQueries.ts

export function useMediaQueries() {
    const is1300PxOrLess = useMediaQuery({ query: '(max-width: 1300px)' });
    const is1200PxOrLess = useMediaQuery({ query: '(max-width: 1200px)' });
    const is1024PxOrLess = useMediaQuery({ query: '(max-width: 1024px)' });
    const is800PxOrLess = useMediaQuery({ query: '(max-width: 800px)' });
    const is775PxOrLess = useMediaQuery({ query: '(max-width: 775px)' });
    const is750PxOrLess = useMediaQuery({ query: '(max-width: 750px)' });
    const is600PxOrLess = useMediaQuery({ query: '(max-width: 600px)' });
    const is515PxOrLess = useMediaQuery({ query: '(max-width: 515px)' });
    const is440PxOrLess = useMediaQuery({ query: '(max-width: 440px)' });
    const is414PxOrLess = useMediaQuery({ query: '(max-width: 414px)' });

    return {
        is1300PxOrLess,
        is1200PxOrLess,
        is1024PxOrLess,
        is800PxOrLess,
        is775PxOrLess,
        is750PxOrLess,
        is600PxOrLess,
        is515PxOrLess,
        is440PxOrLess,
        is414PxOrLess,
    };
}
