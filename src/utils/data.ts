import { TimelineGanttContainerProps, ZoomMax_unitEnum, ZoomMin_unitEnum } from "../../typings/TimelineGanttProps";
import { WidgetDataGroup, WidgetDataItem, WidgetTimelineOptions } from "./widget";

import { useMemo } from "react";
import classNames from "classnames";

// Not yet supported!
// Widget MyFirstModule.Home_Web.timelineGantt1 is attempting to call "setValue". This operation is not yet supported on attributes linked to a datasource.
// function updateProperty({ item_startdate, item_enddate }: TimelineGanttContainerProps, { start, end, obj }: WidgetTimelineItem) {    
//     if (obj == undefined) return;

//     if (start instanceof Date) item_startdate.get(obj).setValue(start);
//     else item_startdate.get(obj).setTextValue(String(start));

//     if (end instanceof Date) item_enddate?.get(obj).setValue(end);
//     else item_enddate?.get(obj).setTextValue(String(end));
// }

// Work around
function updateProperties(attributes?: {name?: string, value?: any}[], references?: {name?: string, guid: string | number}[], id?: string) {
    if (id == undefined) return;

    mx.data.get({
        guid: id,
        callback: obj => {
            attributes?.forEach(({ name, value }) => name && obj.set(name, value));
            references?.forEach(({ name, guid }) => name && obj.addReference(name, guid));
            mx.data.commit({
                mxobj: obj,
                callback: () => { }
            });
        }
    });
}

function calcTime(unit: ZoomMax_unitEnum | ZoomMin_unitEnum, value: number) {
    switch (unit) {
        case "day":
            return (((value * 1000) * 60) * 60) * 24
        case "hour":
            return ((value * 1000) * 60) * 60
        case "minute":
            return (value * 1000) * 60;
        case "month":
            return ((((value * 1000) * 60) * 60) * 24) * 30
        case "second":
            return (value * 1000);
        case "week":
            return ((((value * 1000) * 60) * 60) * 24) * 7
        case "year":
            return ((((value * 1000) * 60) * 60) * 24) * 365
    }
}

export default function useOptions(props: TimelineGanttContainerProps) {
    props.group_data?.setLimit(0);

    const groups = useMemo(() => {
        return props.item_data.items?.reduce<WidgetDataGroup[]>((prev, obj) => {
            const group = props.item_group?.get(obj).value;

            if (!group) return prev;
            if (prev.findIndex(val => val.id === group.id.toString()) !== -1) return prev;

            const [
                id,
                content
            ] = [
                    group.id.toString(),
                    props.group_content?.get(group).value
                ]

            prev.push({
                obj: group,
                id,
                content: content || ""
            });

            return prev;
        }, [])
    }, [props.item_data]);

    const items = useMemo(() => {
        return props.item_data.items?.flatMap<WidgetDataItem>(obj => {
            const startAttr = props.item_startdate.get(obj);
            const endAttr = props.item_enddate?.get(obj);

            const [
                id,
                content,
                title,
                type,
                start,
                end,
                align,
                selectable,
                className,
                remove,
                updateTime,
                updateGroup,
                group
            ] = [
                    obj.id.toString(),
                    props.item_content.get(obj).value,
                    props.item_title?.get(obj).value,
                    props.item_type?.get(obj).value,
                    startAttr.value,
                    endAttr?.value,
                    props.item_align?.get(obj).value,
                    props.item_selectable?.get(obj).value,
                    classNames(props.class, props.item_dynamicClass?.get(obj).value),
                    props.item_remove?.get(obj).value,
                    props.item_updateTime?.get(obj).value, // !startAttr.readOnly && !endAttr?.readOnly
                    props.item_updateGroup?.get(obj).value,
                    props.item_group?.get(obj).value?.id.toString()
                ]

            if (content == undefined || start == undefined) return [];

            return {
                obj,
                id,
                content,
                title,
                type,
                start,
                end,
                align,
                selectable,
                class: className,
                editable: {
                    remove,
                    updateTime,
                    updateGroup
                },
                group
            };
        });
    }, [props.item_data]);

    const options: WidgetTimelineOptions = {
        align: props.align,
        autoResize: props.autoResize,
        clickToUse: props.clickToUse,
        editable: {
            add: props.editableAdd,
            overrideItems: props.editableOverrideItems,
            remove: props.editableRemove,
            updateGroup: props.editableUpdateGroup,
            updateTime: props.editableUpdateTime
        },
        end: props.end?.value,
        groupHeightMode: props.groupHeightMode,
        groupOrder: props.groupOrder,
        width: props.width || undefined,
        height: props.height || undefined,
        maxHeight: props.maxHeight || undefined,
        minHeight: props.minHeight || undefined,
        horizontalScroll: props.horizontalScroll,
        // TODO: Always draggable
        //   itemsAlwaysDraggable: props.itemsAlwaysDraggable,
        // TODO: Locale
        //   locale: props.locale,
        //   locales: props.locales,
        // TODO: Long select press time
        //   longSelectPressTime: props.longSelectPressTime,
        margin: {
            axis: props.marginAxis,
            item: {
                horizontal: props.marginItemHorizontal,
                vertical: props.marginItemVertical
            }
        },
        max: props.max?.value,
        min: props.min?.value,
        moveable: props.moveable,
        multiselect: props.multiselect,
        multiselectPerGroup: props.multiselectPerGroup,
        orientation: {
            axis: props.orientationAxis,
            item: props.orientationItem
        },
        preferZoom: props.preferZoom,
        rollingMode: {
            follow: props.rollingModeFollow,
            offset: Number(props.rollingModeOffset.toString())
        },
        rtl: props.rtl,
        selectable: props.selectable,
        showCurrentTime: props.showCurrentTime,
        showMajorLabels: props.showMajorLabels,
        showMinorLabels: props.showMinorLabels,
        showWeekScale: props.showWeekScale,
        showTooltips: props.showTooltips,
        stack: props.stack,
        // TODO: Sub-group functionality
        // stackSubgroups: props.stackSubgroups,
        start: props.start?.value,
        timeAxis: props.timeAxisScale === "auto" ? undefined : {
            scale: props.timeAxisScale,
            step: props.timeAxisStep
        },
        type: props.type,
        tooltip: {
            delay: props.tooltipDelay,
            followMouse: props.tooltipFollowMouse,
            overflowMethod: props.tooltipOverflowMethod
        },
        verticalScroll: props.verticalScroll,
        zoomable: props.zoomable,
        zoomKey: props.zoomKey === "none" ? undefined : props.zoomKey,
        zoomFriction: props.zoomFriction,
        zoomMax: calcTime(props.zoomMax_unit, props.zoomMax),
        zoomMin: calcTime(props.zoomMin_unit, props.zoomMin),
        onAdd: function (item, callback) {
            if (props.onAdd?.canExecute) props.onAdd.execute();
            callback(item);
        },
        onUpdate: function (item, callback) {
            if (item.obj == undefined) {
                callback(null);
                return;
            }
            const action = props.onUpdate?.get(item.obj)
            if (action?.canExecute) action.execute();
            callback(item);
        },
        onMove: function (item, callback) {
            if (item.obj == undefined) {
                callback(null);
                return;
            }

            updateProperties(
                [
                    {name: props.item_startdateAttr, value: item.start},
                    {name: props.item_enddateAttr, value: item.end}
                ], 
                [
                    {name: props.item_groupRef, guid: item.group || ""}
                ], 
                item.obj.id.toString()
            );

            const action = props.onMove?.get(item.obj);
            if (action?.canExecute) action.execute();
            callback(item);
        },
        onRemove: function (item, callback) {
            if (item.obj == undefined) {
                callback(item);
                return;
            }

            const action = props.onRemove?.get(item.obj);
            if (action?.canExecute) action.execute();
            callback(null);
        }
    }

    return { options, items, groups }
}