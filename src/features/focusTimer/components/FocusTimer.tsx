import { Eye } from "lucide-react";
import { create } from "zustand";
import { useTransition, animated, AnimatedProps, useSpringRef } from "@react-spring/web";

import { cn } from "@/utils/cn";
import { Button } from "@/components/ui/button";
import { CSSProperties, ReactElement, useEffect } from "react";

interface IFocusTimerProps {
    className?: string
}

enum FocusTimerPage {
    TimerPage,
    SettingsPage
}

interface IFocusTimerState {
    activePage: FocusTimerPage,
    setTimerPage: () => void,
    setSettingsPage: () => void,
    setActivePage: (pageToSet: FocusTimerPage) => void,
}

const useFocusTimerStore = create<IFocusTimerState>((set) => ({
    activePage: FocusTimerPage.TimerPage,
    setTimerPage: () => set(() => ({ activePage: FocusTimerPage.TimerPage })),
    setSettingsPage: () => set(() => ({ activePage: FocusTimerPage.SettingsPage })),
    setActivePage: (pageToSet: FocusTimerPage) => set(() => ({ activePage: pageToSet })),
}));

const pages: ((props: AnimatedProps<{ style: CSSProperties }>) => ReactElement)[] = [
    ({ style }) => <animated.div style={{ ...style }} className="timer-part flex justify-center ">
        <div className="h-64 w-64 rounded-full border border-amber-400 flex flex-col items-center pt-15">
            <Eye />
            <h2 className="text-4xl font-bold">15:02</h2>
            <span className="text-xs">FOCUS</span>
        </div>
    </animated.div>,
    ({ style }) => <animated.div style={{ ...style }} className="w-64 h-64 border">
        <p>Options</p>
    </animated.div>
]

export function FocusTimer({ className }: IFocusTimerProps) {
    const activePage = useFocusTimerStore((state) => state.activePage);
    const setTimerPage = useFocusTimerStore(state => state.setTimerPage);
    const setSettingsPage = useFocusTimerStore(state => state.setSettingsPage);
    const transRef = useSpringRef();
    const transitions = useTransition(activePage, {
        ref: transRef,
        keys: null,
        from: { display: "none", transform: 'translateX(50%)' },
        enter: { display: "block", transform: 'translateX(0%)' },
        leave: { display: "none", transform: 'translateX(-50%)' },
    });

    useEffect(() => {
        transRef.start();
    }, [activePage]);

    return (
        <div className={cn("border-gray-200 border rounded-md p-4 flex flex-col items-center", className)}>
            <div className="focus-part">
                {transitions((style, i) => {
                    const Page = pages[i]
                    return <Page style={style} />
                })}
            </div>
            <div className="controls-part">
                <Button onClick={() => setTimerPage()}>Start</Button>
                <Button onClick={() => setSettingsPage()}>Options</Button>
            </div>
        </div >

    );
}
