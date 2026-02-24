import { TimelineGanttContainerProps, ZoomMax_unitEnum, ZoomMin_unitEnum } from "../../typings/TimelineGanttProps";
import { onSelectCallback, WidgetDataGroup, WidgetDataItem, WidgetTimelineOptions } from "./widget";

import { useMemo } from "react";
import classNames from "classnames";

// MX pluggable widget feature not yet supported!
// Message - Widget MyFirstModule.Home_Web.timelineGantt1 is attempting to call "setValue". This operation is not yet supported on attributes linked to a datasource.
// https://docs.mendix.com/apidocs-mxsdk/apidocs/pluggable-widgets-client-apis-list-values/#obtaining-attribute-value
/*
function updateProperty({ item_startdate, item_enddate }: TimelineGanttContainerProps, { start, end, obj }: WidgetTimelineItem) {    
    if (obj == undefined) return;

    if (start instanceof Date) item_startdate.get(obj).setValue(start);
    else item_startdate.get(obj).setTextValue(String(start));

    if (end instanceof Date) item_enddate?.get(obj).setValue(end);
    else item_enddate?.get(obj).setTextValue(String(end));
}
*/

// Work around for updating property on ListAttributeValue using MX client
function updateProperties(
    attributes?: Array<{ name?: string; value?: any }>,
    references?: Array<{ name?: string; guid: string | number }>,
    id?: string
) {
    if (id === undefined) {
        return;
    }

    mx.data.get({
        guid: id,
        callback: obj => {
            attributes?.forEach(({ name, value }) => name && obj.set(name, value));
            references?.forEach(({ name, guid }) => name && obj.addReference(name, guid));
            mx.data.commit({
                mxobj: obj,
                callback: () => console.trace("Committed object: " + obj.getGuid())
            });
        }
    });
}
// Work around for creating new MX object in versions < 9 using MX client
function createObject(entity: string): Promise<mendix.lib.MxObject> {
    return new Promise((resolve, reject) => {
        mx.data.create({
            entity,
            callback(obj) {
                resolve(obj);
            },
            error(err) {
                reject(err);
            }
        });
    });
}

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
                    remove: props.item_remove?.get(obj).value,
                    updateTime: props.item_updateTime?.get(obj).value,
                    updateGroup: props.item_updateGroup?.get(obj).value
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
            zoomMin: calcTime(props.zoomMin_unit, props.zoomMin),
            onAdd(item, callback) {
                createObject(props.item_entity).then(obj => {
                    if (props.item_startdateAttr) {
                        obj.set(props.item_startdateAttr, item.start);
                    }
                    if (props.item_enddateAttr) {
                        obj.set(props.item_enddateAttr, item.end);
                    }
                    if (props.item_groupRef && item.group) {
                        obj.addReference(props.item_groupRef, item.group);
                    }
                    mx.data.commit({ mxobj: obj, callback: () => console.trace("Committed object: " + obj.getGuid()) });
                });

                callback(null);
            },
            onUpdate(item, callback) {
                if (item.obj === undefined) {
                    callback(null);
                    return;
                }
                const action = props.onUpdate?.get(item.obj);
                if (action?.canExecute) {
                    action.execute();
                }
                callback(item);
            },
            onMove(item, callback) {
                if (item.obj === undefined) {
                    callback(null);
                    return;
                }

                updateProperties(
                    [
                        { name: props.item_startdateAttr, value: item.start },
                        { name: props.item_enddateAttr, value: item.end }
                    ],
                    [{ name: props.item_groupRef, guid: item.group || "" }],
                    item.obj.id.toString()
                );

                const action = props.onMove?.get(item.obj);
                if (action?.canExecute) {
                    action.execute();
                }
                callback(item);
            },
            onRemove(item, callback) {
                if (item.obj === undefined) {
                    callback(item);
                    return;
                }

                const action = props.onRemove?.get(item.obj);
                if (action?.canExecute) {
                    action.execute();
                }
                callback(null);
            }
        };
    }, [props.start, props.end, props.min, props.max]);

    const onSelect: onSelectCallback = (_properties, selected) => {
        if (props.selection === undefined) {
            return;
        }

        const selectedObjs = selected?.map(item => item.obj!);
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

    return { options, items, groups, onSelect };
}
