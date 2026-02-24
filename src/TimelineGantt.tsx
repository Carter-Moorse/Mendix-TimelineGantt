import { ReactElement, createElement } from "react";
import { TimelineView } from "./components/TimelineView";

import { TimelineGanttContainerProps } from "../typings/TimelineGanttProps";

import "./ui/TimelineGantt.css";
import useOptions from "./utils/data";

export function TimelineGantt(props: TimelineGanttContainerProps): ReactElement {
    const { options, items, groups, onSelect, onAdd, onMove, onRemove, onUpdate } = useOptions(props);

    return (
        <TimelineView
            options={options}
            items={items || []}
            groups={groups}
            className={props.class}
            style={props.style}
            onSelect={onSelect}
            onAdd={onAdd}
            onMove={onMove}
            onRemove={onRemove}
            onUpdate={onUpdate}
        />
    );
}
