import { DataItem, DataGroup, TimelineItem, TimelineOptions } from "vis-timeline/standalone";
import { ObjectItem } from "mendix";

export type WidgetTimelineOptionsItemCallbackFunction = (item: WidgetTimelineItem, callback: (item: WidgetTimelineItem | null) => void) => void;

export interface WidgetTimelineItem extends TimelineItem {
    obj?: ObjectItem
}

export interface WidgetDataItem extends DataItem {
    obj?: ObjectItem
}

export interface WidgetDataGroup extends DataGroup {
    obj?: ObjectItem
}

export interface WidgetTimelineOptions extends TimelineOptions {
    onAdd?: WidgetTimelineOptionsItemCallbackFunction
    onUpdate?: WidgetTimelineOptionsItemCallbackFunction;
    onMove?: WidgetTimelineOptionsItemCallbackFunction;
    onMoveGroup?: WidgetTimelineOptionsItemCallbackFunction
    onRemove?: WidgetTimelineOptionsItemCallbackFunction;
}