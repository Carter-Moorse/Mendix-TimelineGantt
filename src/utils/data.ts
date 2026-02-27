import { TimelineGanttContainerProps, ZoomMax_unitEnum, ZoomMin_unitEnum } from "../../typings/TimelineGanttProps";
import {
    WidgetDataGroup,
    WidgetDataItem,
    WidgetTimelineOptions,
    WidgetTimelineOptionsItemCallbackFunction,
    WidgetMouseEventCallback
} from "./widget";

import { useMemo } from "react";
import classNames from "classnames";

function calcTime(unit: ZoomMax_unitEnum | ZoomMin_unitEnum, value: number) {
    switch (unit) {
        case "day":
            return value * 1000 * 60 * 60 * 24;
        case "hour":
            return value * 1000 * 60 * 60;
        case "minute":
            return value * 1000 * 60;
        case "month":
            return value * 1000 * 60 * 60 * 24 * 30;
        case "second":
            return value * 1000;
        case "week":
            return value * 1000 * 60 * 60 * 24 * 7;
        case "year":
            return value * 1000 * 60 * 60 * 24 * 365;
    }
}

export default function useOptions(props: TimelineGanttContainerProps) {
    if (!props.group_useData) {
        props.group_data?.setLimit(0);
    }

    const objs = props.group_useData ? props.group_data!.items : props.item_data.items;

    const groups = useMemo(() => {
        return objs?.reduce<WidgetDataGroup[]>((prev, obj, index) => {
            const groupObj = props.group_useData ? obj : props.item_group?.get(obj).value;

            if (!groupObj) {
                return prev;
            }
            if (!props.group_useData && prev.findIndex(val => val.id === groupObj.id.toString()) !== -1) {
                return prev;
            }

            prev.push({
                obj: groupObj,
                id: groupObj.id.toString(),
                content: props.group_content?.get(groupObj).value || "",
                title: props.group_title?.get(groupObj).value,
                className: classNames(props.group_class, props.group_dynamicClass?.get(groupObj).value),
                order: index
            });

            return prev;
        }, []);
    }, [props.item_data, props.group_data]);

    const items = useMemo(() => {
        return props.item_data.items?.flatMap<WidgetDataItem>((obj, index) => {
            const start = props.item_startdate.get(obj);
            const end = props.item_enddate?.get(obj);
            const content = props.item_content.get(obj);

            if (content.value === undefined || start.value === undefined) {
                return [];
            }

            return {
                obj,
                id: obj.id.toString(),
                content: content.value,
                title: props.item_title?.get(obj).value,
                type: props.item_type?.get(obj).value,
                start: start.value,
                end: end?.value,
                align: props.item_align?.get(obj).value,
                selectable: props.item_selectable?.get(obj).value,
                className: classNames(props.item_class, props.item_dynamicClass?.get(obj).value),
                editable: {
                    remove: props.editableRemove && props.item_remove?.get(obj).value,
                    updateTime: props.editableUpdateTime && props.item_updateTime?.get(obj).value,
                    updateGroup: props.editableUpdateGroup && props.item_updateGroup?.get(obj).value
                },
                group: props.item_group?.get(obj).value?.id.toString(),
                order: index
            };
        });
    }, [props.item_data, props.group_data]);

    const options: WidgetTimelineOptions = useMemo(() => {
        return {
            align: props.align,
            autoResize: props.autoResize,
            clickToUse: props.clickToUse,
            editable: {
                add: props.editableAdd,
                overrideItems: false,
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
            multiselect: props.selection?.type === "Multi",
            multiselectPerGroup: props.selection?.type === "Multi" && props.multiselectPerGroup,
            order: (a, b) => a.order - b.order,
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
            selectable: !!props.selection,
            showCurrentTime: props.showCurrentTime,
            showMajorLabels: props.showMajorLabels,
            showMinorLabels: props.showMinorLabels,
            showWeekScale: props.showWeekScale,
            showTooltips: props.showTooltips,
            stack: props.stack,
            // TODO: Sub-group functionality
            // stackSubgroups: props.stackSubgroups,
            start: props.start?.value,
            timeAxis:
                props.timeAxisScale === "auto"
                    ? undefined
                    : {
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
            zoomMin: calcTime(props.zoomMin_unit, props.zoomMin)
        };
    }, [props.start, props.end, props.min, props.max]);

    const onSelect: WidgetMouseEventCallback = properties => {
        if (props.selection === undefined) {
            return;
        }
        const selectedObjs = items
            ?.map(item => (properties.items?.includes(item.id!) ? item.obj! : undefined))
            .filter(item => !!item);
        if (selectedObjs?.length) {
            if (props.selection?.type === "Multi") {
                props.selection?.setSelection(selectedObjs);
            }
            if (props.selection?.type === "Single") {
                props.selection?.setSelection(selectedObjs[0]);
            }
        } else {
            if (props.selection?.type === "Multi") {
                props.selection?.setSelection([]);
            }
            if (props.selection?.type === "Single") {
                props.selection?.setSelection(undefined);
            }
        }
    };

    const onDoubleClick: WidgetMouseEventCallback = properties => {
        // Double-click on item
        if (properties.what === "item") {
            if (properties.item === undefined) {
                return;
            }
            const item = items?.find(x => x.id === properties.item);
            if (!item) {
                return;
            }
            const action = props.item_doubleClick?.get(item.obj!);
            if (action?.canExecute) {
                action.execute();
            }
        }
        // Double-click on group
        else if (properties.what === "group-label") {
            if (properties.group === undefined) {
                return;
            }
            const group = groups?.find(x => x.id === properties.group);
            if (!group) {
                return;
            }
            const action = props.group_doubleClick?.get(group.obj!);
            if (action?.canExecute) {
                action.execute();
            }
        }
    };

    const onAdd: WidgetTimelineOptionsItemCallbackFunction = (item, callback) => {
        const groupObj = groups?.find(x => x.id === item.group)?.obj;
        const action = groupObj ? props.item_onAddToGroup?.get(groupObj) : props.item_onAdd;
        if (action?.canExecute) {
            action?.execute({ StartDate: item.start, EndDate: item.end });
        }
        callback(null);
    };

    const onMove: WidgetTimelineOptionsItemCallbackFunction = (item, callback) => {
        const { start: StartDate, end: EndDate } = item;

        if (props.editableUpdateGroup) {
            const groupObj = groups?.find(x => x.id === item.group)?.obj;
            const GroupGUID = groupObj && groupObj?.id?.toString();
            const GroupRef = groupObj && props.group_onMoveRef?.get(groupObj).displayValue;
            // Run group action
            const action = props.item_onMoveToGroup?.get(item.obj!);
            if (action?.canExecute) {
                action.execute({ StartDate, EndDate, GroupGUID, GroupRef });
                callback(item);
            } else {
                callback(null);
            }
        } else {
            // Run action
            const action = props.item_onMove?.get(item.obj!);
            if (action?.canExecute) {
                action.execute({ StartDate, EndDate });
                callback(item);
            } else {
                callback(null);
            }
        }
    };

    const onRemove: WidgetTimelineOptionsItemCallbackFunction = (item, callback) => {
        if (item.obj === undefined) {
            callback(item);
            return;
        }

        const action = props.item_onRemove?.get(item.obj);
        if (action?.canExecute) {
            action.execute();
        }
        callback(null);
    };

    return { options, items, groups, onSelect, onAdd, onMove, onRemove, onDoubleClick };
}
