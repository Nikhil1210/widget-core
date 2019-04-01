export const toplevel: ITopLevel = (typeof window !== "undefined") ? window : global;
export const supportShadowDom = toplevel.HTMLElement && toplevel.HTMLElement.prototype &&
toplevel.HTMLElement.prototype.attachShadow;

/**
 * Represents the neccessary toplevel (window in browser) variables we need
 */
export interface ITopLevel {
    WidgetConfiguration?:IGlobalWidgetConfiguration;
    jQuery?: JQueryStatic;
    fetch?: typeof fetch;
    CustomElementRegistry?: any;
    HTMLElement?: typeof HTMLElement;
}
/**
 * This is the interface of the global object that
 * application embedding widgets should provide in
 * the 'window/WidgetConfoguration' property.
 * It should not be used in widgets
 */
export interface IGlobalWidgetConfiguration {
/**
 * The runtime envromment of the application.
 * It usually is "development", "UAT" or "production"
 */
environment?: string;
/**
 * CSS Urls that are shared with the widgets.
 * Bootsrtap, Font aweosme and pixedon should be included
 */
sharedCssUrls?: string[];
/**
 * A FETCH FUNCTION (by default its window.fetch)but it
 * it could b a good placeholder to add some functionality
 */
fetch?: typeof fetch;
/**
 * A Logging function similar to console.log
 * It will always recieve the tag name of the widget (surrounded by [] as a first parameter)
 */
log?: typeof console.log;
}
