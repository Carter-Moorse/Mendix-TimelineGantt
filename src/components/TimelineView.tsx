import { ReactElement, createElement, useRef, useEffect, CSSProperties } from "react";
import {
    Timeline,
    DataItem,
    DataGroup,
    TimelineOptions,
    DataSet,
    TimelineOptionsItemCallbackFunction
} from "vis-timeline/standalone";
import classNames from "classnames";

export interface TimelineViewProps {
    options: TimelineOptions;
    items: DataItem[];
    groups?: DataGroup[];
    className?: string;
    style?: CSSProperties;
    onSelect?: ((properties: any, data: DataItem[]) => void) | undefined;
    onAdd?: TimelineOptionsItemCallbackFunction;
    onUpdate?: TimelineOptionsItemCallbackFunction;
    onMove?: TimelineOptionsItemCallbackFunction;
    onMoveGroup?: TimelineOptionsItemCallbackFunction;
    onRemove?: TimelineOptionsItemCallbackFunction;
}

export function TimelineView({
    options,
    items,
    groups,
    className,
    style,
    onSelect,
    onAdd,
    onUpdate,
    onMove,
    onMoveGroup,
    onRemove
}: TimelineViewProps): ReactElement {
    const wrapper = useRef<HTMLDivElement>(null);
    const timeline = useRef<Timeline | null>(null);
    const data = useRef(new DataSet<DataItem, "id">());
    const group = useRef(new DataSet<DataGroup, "id">());

    // Build up/Tear down
    useEffect(() => {
        timeline.current = wrapper.current ? new Timeline(wrapper.current, data.current, options) : null;

        if (timeline.current) {
            timeline.current.on("select", props => {
                if (onSelect) {
                    const selected = data.current.get({ filter: item => props.items?.includes(item.id) });
                    onSelect(props, selected);
                }
            });
        }
        return () => timeline.current?.destroy();
    }, [wrapper]);
    // Main options - if changed, will cause view to shift
    useEffect(() => timeline.current?.setOptions(options), [options]);
    // Callback options - if changed, should not cause view to shift
    useEffect(
        () => timeline.current?.setOptions({ onAdd, onUpdate, onMove, onMoveGroup, onRemove }),
        [onAdd, onUpdate, onMove, onMoveGroup, onRemove]
    );
    // Update/remove items
    useEffect(() => {
        const currentIds = data.current.getIds();
        const newIds = items.map(i => i.id);
        data.current.update(items);
        data.current.remove(currentIds.filter(id => !newIds.includes(id)));
    }, [items]);
    // Update/remove groups
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

    if (options.height === "100%") {
        style = style ?? {};
        style.height = "100%";
        style.position = "relative";
    }

    return <div ref={wrapper} className={classNames("widget-timelinegantt", className)} style={style}></div>;
}
