import { FocusTimer } from "@/features/focusTimer/components/FocusTimer";

function FocusRoute() {
    return (
        <>
            <div className="grid grid-cols-3 gap-1">
                <FocusTimer className="col-start-1 col-end-2" />
                <div className="col-start-2 col-end-4 bg-amber-200"> asd</div>
            </div>
        </>
    );
};

export default FocusRoute;