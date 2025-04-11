import { ReactElement, createElement, useRef, useEffect, CSSProperties } from "react";
import { Timeline, DataItem, DataGroup, TimelineOptions } from "vis-timeline/standalone";
import classNames from "classnames";

export interface TimelineViewProps {
    options: TimelineOptions;
    items: DataItem[];
    groups?: DataGroup[];
    className?: string;
    style?: CSSProperties;
}

export function TimelineView({ options, items, groups, className, style }: TimelineViewProps): ReactElement {
    const wrapper = useRef<HTMLDivElement>(null);
    const timeline = useRef<Timeline | null>(null);
    // const data = useRef(new DataSet<DataItem, "id">());
    // const group = useRef(new DataSet<DataGroup, "id">());

    // Build up/Tear down
    useEffect(() => {
        timeline.current = wrapper.current ? new Timeline(wrapper.current, [], options) : null;
        return () => timeline.current?.destroy();
    }, []);

    useEffect(() => timeline.current?.setOptions(options), [options]);
    useEffect(() => timeline.current?.setItems(items), [items])
    useEffect(() => timeline.current?.setGroups(groups?.length ? groups : undefined), [groups])

    return <div
        ref={wrapper}
        className={classNames("widget-timelinegantt", className)}
        style={style}
    ></div>;
}
