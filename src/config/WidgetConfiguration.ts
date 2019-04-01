/**
 * configuration object available to widgets
 */
import {IGlobalWidgetConfiguration, toplevel} from "./toplevel";

export class WidgetConfiguration {
    /**
     * environment of the application intergation the widget
     */
    public readonly environment: string;
/**
 * URLs of the CSS that should be injected inside widgets (with Global Css)
 * when real shadow dom is in use
 */
public readonly sharedCssUrls: string[];
/**
 * fetch function taht widgets should use ti allow rge application to intercept/log
 * network calls
 */
public readonly fetch: typeof fetch;
/**
 * log function obtained from global configuration
 */
private readonly logfn: typeof console.log;

constructor(private readonly widgetTag: string, globalConfig: IGlobalWidgetConfiguration) {
    this.environment = globalConfig.environment || "production";
    this.fetch = globalConfig.fetch || (toplevel.fetch ? toplevel.fetch.bind(toplevel) : undefined);
    this.logfn = globalConfig.log || console.log.bind(console);
    this.sharedCssUrls = globalConfig.sharedCssUrls || [];
}
/**
 * log function that widgets shoulduse instead of console.log
 */
public log(message: any, ...optinalParams: any[]): void {
    this.logfn(`[${this.widgetTag}]`, message, ...optinalParams);
}
}
export function warnOrError(config: WidgetConfiguration, message: string) {
    if (process.env.MODE_ENV === "production") {
       config.log(`[widget/core] WARNING: ${message}`);
    }else {
        throw new Error(`[widget/core] ${message}`);
    }
}
