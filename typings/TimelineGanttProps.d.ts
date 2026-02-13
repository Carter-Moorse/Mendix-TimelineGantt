/**
 * This file was generated from TimelineGantt.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { DynamicValue, ListValue, ListActionValue, ListAttributeValue, ListExpressionValue, ListReferenceValue } from "mendix";
import { Big } from "big.js";

export type ZoomKeyEnum = "none" | "altKey" | "ctrlKey" | "shiftKey" | "metaKey";

export type ZoomMax_unitEnum = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

export type ZoomMin_unitEnum = "second" | "minute" | "hour" | "day" | "week" | "month" | "year";

export type TooltipOverflowMethodEnum = "cap" | "flip" | "none";

export type TimeAxisScaleEnum = "auto" | "millisecond" | "second" | "minute" | "hour" | "weekday" | "week" | "day" | "month" | "year";

export type OrientationAxisEnum = "top" | "bottom" | "both" | "none";

export type OrientationItemEnum = "top" | "bottom";

export type TypeEnum = "box" | "point" | "range" | "background";

export type AlignEnum = "auto" | "center" | "left" | "right";

export type GroupHeightModeEnum = "auto" | "fixed" | "fitItems";

export type GroupOrderEnum = "order" | "title" | "id";

export interface TimelineGanttContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    item_data: ListValue;
    item_group?: ListReferenceValue;
    group_useData: boolean;
    group_data?: ListValue;
    width: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    autoResize: boolean;
    clickToUse: boolean;
    rtl: boolean;
    showCurrentTime: boolean;
    showMajorLabels: boolean;
    showMinorLabels: boolean;
    showWeekScale: boolean;
    start?: DynamicValue<Date>;
    end?: DynamicValue<Date>;
    min?: DynamicValue<Date>;
    max?: DynamicValue<Date>;
    moveable: boolean;
    zoomable: boolean;
    preferZoom: boolean;
    zoomKey: ZoomKeyEnum;
    zoomFriction: number;
    zoomMax: number;
    zoomMax_unit: ZoomMax_unitEnum;
    zoomMin: number;
    zoomMin_unit: ZoomMin_unitEnum;
    horizontalScroll: boolean;
    verticalScroll: boolean;
    showTooltips: boolean;
    tooltipFollowMouse: boolean;
    tooltipOverflowMethod: TooltipOverflowMethodEnum;
    tooltipDelay: number;
    rollingModeFollow: boolean;
    rollingModeOffset: Big;
    timeAxisScale: TimeAxisScaleEnum;
    timeAxisStep: number;
    orientationAxis: OrientationAxisEnum;
    orientationItem: OrientationItemEnum;
    marginAxis: number;
    marginItemHorizontal: number;
    marginItemVertical: number;
    item_startdate: ListAttributeValue<Date>;
    item_enddate?: ListAttributeValue<Date>;
    item_type?: ListExpressionValue<string>;
    item_content: ListExpressionValue<string>;
    item_align?: ListExpressionValue<string>;
    item_title?: ListExpressionValue<string>;
    onUpdate?: ListActionValue;
    type: TypeEnum;
    align: AlignEnum;
    stack: boolean;
    editableOverrideItems: boolean;
    item_class: string;
    item_dynamicClass?: ListExpressionValue<string>;
    selectable: boolean;
    item_selectable?: ListExpressionValue<boolean>;
    multiselect: boolean;
    multiselectPerGroup: boolean;
    editableAdd: boolean;
    item_entity: string;
    editableRemove: boolean;
    item_remove?: ListExpressionValue<boolean>;
    onRemove?: ListActionValue;
    editableUpdateTime: boolean;
    item_updateTime?: ListExpressionValue<boolean>;
    item_startdateAttr: string;
    item_enddateAttr: string;
    editableUpdateGroup: boolean;
    item_updateGroup?: ListExpressionValue<boolean>;
    item_groupRef: string;
    onMove?: ListActionValue;
    group_content?: ListExpressionValue<string>;
    group_title?: ListExpressionValue<string>;
    groupHeightMode: GroupHeightModeEnum;
    groupOrder: GroupOrderEnum;
    group_class: string;
    group_dynamicClass?: ListExpressionValue<string>;
}

export interface TimelineGanttPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode: "design" | "xray" | "structure";
    translate: (text: string) => string;
    item_data: {} | { caption: string } | { type: string } | null;
    item_group: string;
    group_useData: boolean;
    group_data: {} | { caption: string } | { type: string } | null;
    width: string;
    height: string;
    minHeight: string;
    maxHeight: string;
    autoResize: boolean;
    clickToUse: boolean;
    rtl: boolean;
    showCurrentTime: boolean;
    showMajorLabels: boolean;
    showMinorLabels: boolean;
    showWeekScale: boolean;
    start: string;
    end: string;
    min: string;
    max: string;
    moveable: boolean;
    zoomable: boolean;
    preferZoom: boolean;
    zoomKey: ZoomKeyEnum;
    zoomFriction: number | null;
    zoomMax: number | null;
    zoomMax_unit: ZoomMax_unitEnum;
    zoomMin: number | null;
    zoomMin_unit: ZoomMin_unitEnum;
    horizontalScroll: boolean;
    verticalScroll: boolean;
    showTooltips: boolean;
    tooltipFollowMouse: boolean;
    tooltipOverflowMethod: TooltipOverflowMethodEnum;
    tooltipDelay: number | null;
    rollingModeFollow: boolean;
    rollingModeOffset: number | null;
    timeAxisScale: TimeAxisScaleEnum;
    timeAxisStep: number | null;
    orientationAxis: OrientationAxisEnum;
    orientationItem: OrientationItemEnum;
    marginAxis: number | null;
    marginItemHorizontal: number | null;
    marginItemVertical: number | null;
    item_startdate: string;
    item_enddate: string;
    item_type: string;
    item_content: string;
    item_align: string;
    item_title: string;
    onUpdate: {} | null;
    type: TypeEnum;
    align: AlignEnum;
    stack: boolean;
    editableOverrideItems: boolean;
    item_class: string;
    item_dynamicClass: string;
    selectable: boolean;
    item_selectable: string;
    multiselect: boolean;
    multiselectPerGroup: boolean;
    editableAdd: boolean;
    item_entity: string;
    editableRemove: boolean;
    item_remove: string;
    onRemove: {} | null;
    editableUpdateTime: boolean;
    item_updateTime: string;
    item_startdateAttr: string;
    item_enddateAttr: string;
    editableUpdateGroup: boolean;
    item_updateGroup: string;
    item_groupRef: string;
    onMove: {} | null;
    group_content: string;
    group_title: string;
    groupHeightMode: GroupHeightModeEnum;
    groupOrder: GroupOrderEnum;
    group_class: string;
    group_dynamicClass: string;
}
