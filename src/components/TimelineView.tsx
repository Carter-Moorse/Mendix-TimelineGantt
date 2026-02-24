import { ReactElement, createElement, useRef, useEffect, CSSProperties } from "react";
import { Timeline, DataItem, DataGroup, TimelineOptions, DataSet } from "vis-timeline/standalone";
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
    const data = useRef(new DataSet<DataItem, "id">());
    const group = useRef(new DataSet<DataGroup, "id">());

    // Build up/Tear down
    useEffect(() => {
        timeline.current = wrapper.current ? new Timeline(wrapper.current, data.current, options) : null;
        return () => timeline.current?.destroy();
    }, [wrapper]);

    useEffect(() => timeline.current?.setOptions(options), [options]);
    useEffect(() => {
        const currentIds = data.current.getIds();
        const newIds = items.map(i => i.id);
        data.current.update(items);
        data.current.remove(currentIds.filter(id => !newIds.includes(id)));
    }, [items]);
    useEffect(() => {
        if (groups?.length) {
            timeline.current?.setGroups(group.current);

            const currentIds = group.current.getIds();
            const newIds = groups.map(i => i.id);
            group.current.update(groups);
            group.current.remove(currentIds.filter(id => !newIds.includes(id)));
        } else {
            timeline.current?.setGroups(undefined);
        }
    }, [groups]);

    return <div ref={wrapper} className={classNames("widget-timelinegantt", className)} style={style}></div>;
}
