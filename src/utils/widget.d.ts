import { DataItem, DataGroup, TimelineItem, TimelineOptions } from "vis-timeline/standalone";
import { ObjectItem } from "mendix";

export type WidgetTimelineOptionsItemCallbackFunction = (
    item: WidgetTimelineItem,
    callback: (item: WidgetTimelineItem | null) => void
) => void;

export interface WidgetTimelineItem extends TimelineItem {
    obj?: ObjectItem;
    start: Date;
    end?: Date;
}

export interface WidgetDataItem extends DataItem {
    obj?: ObjectItem;
}

export interface WidgetDataGroup extends DataGroup {
    obj?: ObjectItem;
    order: number;
}

export interface WidgetTimelineOptions extends TimelineOptions {
    onAdd?: WidgetTimelineOptionsItemCallbackFunction;
    onUpdate?: WidgetTimelineOptionsItemCallbackFunction;
    onMove?: WidgetTimelineOptionsItemCallbackFunction;
    onMoveGroup?: WidgetTimelineOptionsItemCallbackFunction;
    onRemove?: WidgetTimelineOptionsItemCallbackFunction;
}

export type onSelectCallback = (
    properties: { items: WidgetDataItem[]?; event: PointerEvent },
    selected: WidgetDataItem[]
) => void;
