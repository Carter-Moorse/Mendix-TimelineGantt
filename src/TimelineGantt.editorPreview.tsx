import { ReactElement, createElement } from "react";
// import { TimelineGanttPreviewProps } from "../typings/TimelineGanttProps";

export function preview(): ReactElement {
    return <div className="alert alert-info">Timeline Gantt widget</div>;
}

export function getPreviewCss(): string {
    return require("./ui/TimelineGantt.css");
}
