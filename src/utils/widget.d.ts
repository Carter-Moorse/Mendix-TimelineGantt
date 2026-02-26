import { DataItem, DataGroup, TimelineItem, TimelineOptions, IdType } from "vis-timeline/standalone";
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

export interface WidgetEventProperties {
    items?: IdType[];
    event: MouseEvent;
}

export interface WidgetMouseEventProperties extends WidgetEventProperties {
    group?: IdType;
    item?: IdType;
    customTime?: number;
    pageX: number;
    pageY: number;
    x: number;
    y: number;
    time: Date;
    snappedTime: Date;
    what?: "item" | "background" | "axis" | "group-label" | "custom-time" | "current-time";
}

export type WidgetMouseEventCallback = (properties: WidgetMouseEventProperties) => void;
