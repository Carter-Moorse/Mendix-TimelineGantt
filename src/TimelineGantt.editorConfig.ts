import { TimelineGanttPreviewProps } from "../typings/TimelineGanttProps";
import { hidePropertiesIn } from "@mendix/pluggable-widgets-tools";

export type Platform = "web" | "desktop";

export type Properties = PropertyGroup[];

type PropertyGroup = {
    caption: string;
    propertyGroups?: PropertyGroup[];
    properties?: Property[];
};

type Property = {
    key: string;
    caption: string;
    description?: string;
    objectHeaders?: string[]; // used for customizing object grids
    objects?: ObjectProperties[];
    properties?: Properties[];
};

type ObjectProperties = {
    properties: PropertyGroup[];
    captions?: string[]; // used for customizing object grids
};

export type Problem = {
    property?: string; // key of the property, at which the problem exists
    severity?: "error" | "warning" | "deprecation"; // default = "error"
    message: string; // description of the problem
    studioMessage?: string; // studio-specific message, defaults to message
    url?: string; // link with more information about the problem
    studioUrl?: string; // studio-specific link
};

type BaseProps = {
    type: "Image" | "Container" | "RowLayout" | "Text" | "DropZone" | "Selectable" | "Datasource";
    grow?: number; // optionally sets a growth factor if used in a layout (default = 1)
};

type ImageProps = BaseProps & {
    type: "Image";
    document?: string; // svg image
    data?: string; // base64 image
    property?: object; // widget image property object from Values API
    width?: number; // sets a fixed maximum width
    height?: number; // sets a fixed maximum height
};

type ContainerProps = BaseProps & {
    type: "Container" | "RowLayout";
    children: PreviewProps[]; // any other preview element
    borders?: boolean; // sets borders around the layout to visually group its children
    borderRadius?: number; // integer. Can be used to create rounded borders
    backgroundColor?: string; // HTML color, formatted #RRGGBB
    borderWidth?: number; // sets the border width
    padding?: number; // integer. adds padding around the container
};

type RowLayoutProps = ContainerProps & {
    type: "RowLayout";
    columnSize?: "fixed" | "grow"; // default is fixed
};

type TextProps = BaseProps & {
    type: "Text";
    content: string; // text that should be shown
    fontSize?: number; // sets the font size
    fontColor?: string; // HTML color, formatted #RRGGBB
    bold?: boolean;
    italic?: boolean;
};

type DropZoneProps = BaseProps & {
    type: "DropZone";
    property: object; // widgets property object from Values API
    placeholder: string; // text to be shown inside the dropzone when empty
    showDataSourceHeader?: boolean; // true by default. Toggles whether to show a header containing information about the datasource
};

type SelectableProps = BaseProps & {
    type: "Selectable";
    object: object; // object property instance from the Value API
    child: PreviewProps; // any type of preview property to visualize the object instance
};

type DatasourceProps = BaseProps & {
    type: "Datasource";
    property: object | null; // datasource property object from Values API
    child?: PreviewProps; // any type of preview property component (optional)
};

export type PreviewProps =
    | ImageProps
    | ContainerProps
    | RowLayoutProps
    | TextProps
    | DropZoneProps
    | SelectableProps
    | DatasourceProps;

export function getProperties(
    _values: TimelineGanttPreviewProps,
    defaultProperties: Properties /* , target: Platform*/
): Properties {
    // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
    /* Example
    if (values.myProperty === "custom") {
        delete defaultProperties.properties.myOtherProperty;
    }
    */

    if (!_values.zoomable) hidePropertiesIn(defaultProperties, _values, ["preferZoom", "zoomKey", "zoomFriction", "zoomMax", "zoomMax_unit", "zoomMin", "zoomMin_unit"]);
    if (!_values.showTooltips) hidePropertiesIn(defaultProperties, _values, ["tooltipFollowMouse", "tooltipOverflowMethod", "tooltipDelay"]);
    if (!_values.rollingModeFollow) hidePropertiesIn(defaultProperties, _values, ["rollingModeOffset"]);

    if(_values.zoomable && _values.zoomKey === "none") hidePropertiesIn(defaultProperties, _values, ["horizontalScroll"])

    if (!_values.selectable) hidePropertiesIn(defaultProperties, _values, ["item_selectable", "multiselect", "multiselectPerGroup"]);
    else {
        if (!_values.multiselect) hidePropertiesIn(defaultProperties, _values, ["multiselectPerGroup"]);
    }

    if (!_values.editableAdd) hidePropertiesIn(defaultProperties, _values, ["item_entity"]);
    if (!_values.editableRemove) hidePropertiesIn(defaultProperties, _values, ["item_remove", "onRemove"]);
    if (!_values.editableUpdateTime) hidePropertiesIn(defaultProperties, _values, ["item_updateTime", "item_startdateAttr", "item_enddateAttr", "onMove"])
    if (!_values.editableUpdateGroup) hidePropertiesIn(defaultProperties, _values, ["item_updateGroup", "item_groupRef"]);

    if (_values.editableOverrideItems) hidePropertiesIn(defaultProperties, _values, ["item_remove", "item_updateTime", "item_updateGroup"]);

    if(!_values.group_data) hidePropertiesIn(defaultProperties, _values, ["group_content", "group_title", "groupHeightMode", "groupOrder", "group_class", "group_dynamicClass"]);

    return defaultProperties;
}

export function check(_values: TimelineGanttPreviewProps): Problem[] {
    const errors: Problem[] = [];
    // Add errors to the above array to throw errors in Studio and Studio Pro.
    /* Example
    if (values.myProperty !== "custom") {
        errors.push({
            property: `myProperty`,
            message: `The value of 'myProperty' is different of 'custom'.`,
            url: "https://github.com/myrepo/mywidget"
        });
    }
    */

    if(_values.group_useData && _values.group_data == null) errors.push({
        property: "group_data",
        message: "Group data is required when using data source for group retrieval"
    });
    
    return errors;
}

// export function getPreview(values: TimelineGanttPreviewProps, isDarkMode: boolean, version: number[]): PreviewProps {
//     // Customize your pluggable widget appearance for Studio Pro.
//     return {
//         type: "Container",
//         children: []
//     }
// }

// export function getCustomCaption(values: TimelineGanttPreviewProps, platform: Platform): string {
//     return "TimelineGantt";
// }
