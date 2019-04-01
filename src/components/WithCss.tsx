import {Component, h} from "preact";
import {widgetConfiguration} from "../config";
import {supportShadowDom} from "../config/toplevel";

export interface IProps {
    styles?: {toString: () => string} | string;
    children?: JSX.Element[] | JSX.Element;
    withGlobal?: boolean;
}

const WithCss = ({ styles, withGlobal, children}: IProps) => {
    let {sharedCssUrls} = widgetConfiguration();
    sharedCssUrls = sharedCssUrls || [];
    const addGlobal = withGlobal && (sharedCssUrls.length !== 0) && supportShadowDom;
    return (
        <span>
            {(styles || addGlobal) ?
            <style>
                {addGlobal ? sharedCssUrls.map((url) => `@import url (${url});`).join("\n")
                : null}
                {styles ? styles.toString() : null}
                </style> : null}
                {children}
        </span>);
};

export default WithCss;
