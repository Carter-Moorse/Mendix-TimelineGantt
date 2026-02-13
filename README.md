## Timeline Gantt - Mendix Pluggable Widget
Display a timeline gantt chart in your using [vis-timeline](https://github.com/visjs/vis-timeline) library.

See Demo.

## Features
 - Display items (box, point, range or background) on a timeline gantt
 - Display groups of items
 - Interactive timeline. Zoom, move, scroll around
 - Create, edit and delete items
 - Customisable using CSS

## Limitations
 - No custom content for item/group display
 - Cannot nest groups

## Usage
> [!Warning]
> Requires Mendix Studio Pro 9.17 or later

 1. Add the widget to your project
 2. Drop the widget into a page
 3. Configure Item data source property
 4. Optional: Configure group association
 5. Configure Items > Start date and Content

## Issues, suggestions and feature requests
Please report any issues to [Mendix-TimelineGantt/issues](https://github.com/Carter-Moorse/Mendix-TimelineGantt/issues)

## Development and contribution

1. Install NPM package dependencies by using: `npm install`. If you use NPM v7.x.x, which can be checked by executing `npm -v`, execute: `npm install --legacy-peer-deps`.
1. Run `npm start` to watch for code changes. On every change:
    - the widget will be bundled;
    - the bundle will be included in a `dist` folder in the root directory of the project;
    - the bundle will be included in the `deployment` and `widgets` folder of the Mendix test project.