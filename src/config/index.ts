import {toplevel} from "./toplevel";
import {warnOrError, WidgetConfiguration} from "./WidgetConfiguration";
/**
 * Minimal widget construtor (which should have  an 'is' static property as per
 * skate js best practices)
 */
export interface IWidgetConstructor {
    is: string;
}
export interface IWidgetConfigurationOptions {
    /**
     * allow widget owners to disable the jquery sanity check if they are sure
     * that they don't need jquery and do not want to force app to include in the page
     */
    disableJQuerySanityCheck?: boolean;
    /**
     * allow widget owners to disable the fetch sanity check if they are sure
     * that they dont need fetch and do not want to force app to include the polyfilles in the page
     */
    disableFetchSanityCheck?: boolean;
    /**
     * Singleton instance. Initiatd by call toinit
     */
let configInstance: WidgetConfiguration | undefined;

/**
 * initialize and perform sanity check on widget
 * @param widget Your widget constructor or its tag name
 */
export function initializeWidgetConfiguration(
    widget: string | IWidgetConstructor,
    options: IWidgetConfigurationOptions = {}) {
        const widgetTag = typeof (widget) === "string" ? widget : widget.is;
        if (configInstance) {
            configInstance.log("Widget configuration already initialized... try to prevent this");
        }
        configInstance = new WidgetConfiguration(widgetTag, toplevel.WidgetConfiguration || {});
        performSanityChecks(configInstance, options);
    }
/**
 * TEST-ONLY resetting the widget configuration to default
 */
export function resetWidgetCOnfiguration(){
    configInstance = undefined;
}
function defauiltConfiguration(){
    const defConf = new WidgetConfiguration("@widget/core", {});
    warnOrError(defConf, "initializeWidgetConfiguration (widgetConstructororTagname) has not been called."
    + "using a default configuration. PLease report to widget owner."); 
    performSanityChecks(defConf);
    return defConf;
    }
export function widgetConfiguration(): WidgetConfiguration{
    return configInstance || defauiltConfiguration();
}
function performSanityChecks(config: WidgetConfiguration, options: IWidgetConfigurationOptions= {}){
    if(toplevel.jQuery === undefined&& !options.disableJQuerySanityCheck){
        warnOrError(config, `[SANITYCHECK] JQuery is not available 
        Widgets might depend on it so you are on your own if you do not load it.`);
    }
    if(typeof (toplevel.CustomElementRegistry) === "undefined"){
        warnOrError(config, `[SANITYCHECK] It seems CustomElementRegistry is not defined at all.
        Are you sure the necessary polyfills are loaded?`);
    }
    if(toplevel.fetch === undefined && !options.disableFetchSanityCheck){
        warnOrError(config, `[SANITYCHECK] It seems fetch is not available.
        Are you sure the necessary polyfills are loaded?`);
    }
}
}
