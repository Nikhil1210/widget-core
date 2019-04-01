import {h} from "preact";
import WithCss from "./WithCss";

export interface IProps{
    styles?: {toString:() => string} | string;
    children?: JSX.Element[] | JSX.Element;
}

export default (props: IProps) => <WithCss {...props} withGlobal/>;