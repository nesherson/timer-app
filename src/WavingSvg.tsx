import { animated, easings, useSpring } from "@react-spring/web";
import { useState, useEffect, useRef, useCallback } from "react";

// C controlPoint1 controlPoint2 endPoint

function generatePath(width: number | null, height: number | null, variation: number) {
    if (!width || !height)
        return "";

    const waveHeight = height * 0.1;
    const yOffset = height * 0.6;

    // const pathKeyFrames = [
    //     "M0 505L50 503.5C100 502 200 499 300 496.2C400 493.3 500 490.7 600 493C700 495.3 800 502.7 850 506.3L900 510L900 601L850 601C800 601 700 601 600 601C500 601 400 601 300 601C200 601 100 601 50 601L0 601Z",
    //     "M0 498L50 495.7C100 493.3 200 488.7 300 486.5C400 484.3 500 484.7 600 487.5C700 490.3 800 495.7 850 498.3L900 501L900 601L850 601C800 601 700 601 600 601C500 601 400 601 300 601C200 601 100 601 50 601L0 601Z",
    //     "M0 500L50 501.3C100 502.7 200 505.3 300 509.8C400 514.3 500 520.7 600 522.3C700 524 800 521 850 519.5L900 518L900 601L850 601C800 601 700 601 600 601C500 601 400 601 300 601C200 601 100 601 50 601L0 601Z",
    //     "M0 493L50 499.8C100 506.7 200 520.3 300 519.2C400 518 500 502 600 497.2C700 492.3 800 498.7 850 501.8L900 505L900 601L850 601C800 601 700 601 600 601C500 601 400 601 300 601C200 601 100 601 50 601L0 601Z"
    // ];

    // const p1 = `M 0,${yOffset + variation}`;
    // const p2 = `C ${width * 0.16},${yOffset + waveHeight + variation} ${width * 0.32},${yOffset - waveHeight} ${width * 0.48},${yOffset}`;
    // const p3 = `C ${width * 0.64},${yOffset + waveHeight + variation} ${width * 0.80},${yOffset - waveHeight} ${width},${yOffset}`;
    // const p4 = `L ${width},${height} L 0,${height} Z`;


    const p1 = `M 0,${yOffset + variation}`;
    const p2 = `C ${width * 0.33},${yOffset + waveHeight + variation} ${width * 0.66},${yOffset - waveHeight - variation} ${width},${yOffset}`;
    const p4 = `L ${width},${height} L 0,${height} Z`;

    return `${p1} ${p2} ${p4}`;
}

function WavingSvg() {
    const [size, setSize] = useState({ width: 0, height: 0 });
    const [pathKeyFrames, setPathKeyFrames] = useState<string[]>([]);

    const containerRef = useCallback((node) => {
        let clientRect = node.getBoundingClientRect();

        if (clientRect) {
            setSize({ width: clientRect.width, height: clientRect.height });
            setPathKeyFrames([
                generatePath(clientRect.width, clientRect.height, 0),
                generatePath(clientRect.width, clientRect.height, 30),
                generatePath(clientRect.width, clientRect.height, 0),

            ]);
        }
    }, []);

    // const pathKeyFrames = useMemo(() => {
    //     const { width, height } = size;

    //     if (!width || !height) return [];

    //     return [
    //         generatePath(width, height, 0),
    //         generatePath(width, height, 10),
    //         generatePath(width, height, -10),
    //         generatePath(width, height, 5),
    //         generatePath(width, height, 0),
    //     ];
    // }, [size]);

    // const pathKeyFrames = useMemo(() => {
    //     const { width, height } = size;

    //     if (!width || !height) return [];

    //     return [
    //         generatePath(width, height, 0),
    //         generatePath(width, height, 10),
    //         generatePath(width, height, -10),
    //         generatePath(width, height, 5),
    //         generatePath(width, height, 0),
    //     ];
    // }, [size]);


    // const [springs, api] = useSpring(() => {
    //     return {
    //         d: "",
    //         config: {
    //             duration: 1000,
    //             easing: easings.linear,
    //             loop: { reset: true }
    //         },
    //     }
    // });

    const [springs, api] = useSpring(() => ({
        from: { d: pathKeyFrames[0] },
        to: async (next) => {
            console.log("to");
            for (let i = 1; i < pathKeyFrames.length; i++) {
                await next({ d: pathKeyFrames[i] });
            }
        },
        loop: {
            reverse: true
        },
        config: {
            duration: 3000,
            easing: easings.linear,
        },
    }), [pathKeyFrames]);

    // useEffect(() => {
    //     if (pathKeyFrames.length > 0) {

    //         api.set({ d: pathKeyFrames[0] });
    //         const animate = () => {
    //             for (let i = 1; i < pathKeyFrames.length; i++) {
    //                 console.log(pathKeyFrames[i]);

    //                 api.start({ d: pathKeyFrames[i] });
    //                 // api.start({ d: pathKeyFrames[i], from: { d: pathKeyFrames[i - 1] } });

    //             }
    //         };
    //         animate();

    //     }

    // }, [pathKeyFrames]);

    // const springs = useSpring({
    //     from: { d: pathKeyFrames[0] },
    //     to: async (next) => {
    //         for (let i = 1; i < pathKeyFrames.length; i++) {
    //             await next({ d: pathKeyFrames[i] });
    //         }
    //     },
    //     config: {
    //         duration: 1000,
    //         easing: easings.linear
    //     },
    //     // loop: true,
    // })


    return (
        <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
            {pathKeyFrames.length > 0 &&
                <svg
                    width="100%"
                    height="100%"
                    id="svg"
                    // viewBox={`0 0 900 600`}
                    viewBox={`0 0 ${size.width} ${size.height}`}
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                >
                    <animated.path
                        stroke="none"
                        fill="#2171b4"
                        d={springs.d}
                    />
                </svg>}

        </div>
        // <svg
        //     width="100%"
        //     height="100%"
        //     id="svg"
        //     viewBox="0 0 900 600"
        //     xmlns="http://www.w3.org/2000/svg"
        // >
        //     <animated.path
        //         d={d}
        //         stroke="none"
        //         strokeWidth="0"
        //         fill="#2171b4"
        //         fillOpacity="1"
        //         strokeLinecap="round"
        //         strokeLinejoin="miter"
        //     />
        // </svg>
    );
};

export default WavingSvg;