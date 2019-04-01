export interface ISciptLocation{
    fullPath: string;
    path: string;
    file:string;
fileNoExt: string;
query: string;
}

/**
 * Try to load the url fo the script tag rha loaded the curret script
 */
export function scriptLocation(): ISciptLocation{
    let pathParts: RegExpMatchArray | null = null;
    try {
        // Throw an error to generate stack trace
        throw new Error();
    } catch (e) {
        // split the trace into each line
        const stackLines = (e as Error).stack!.split("\n");
        let callerIndex= 0;
        // Now walk through each lne untill we find a path reference
        for (let i =0; i< stackLines.length; i++){
            const element = stackLines[i];
            if(!stackLines[i].match(/http[s]?:\/\//)){
                continue;
            }
            // we skipped allthe lines with out an http so we can have a script reference
            // this one is the script loaction() call
            // the one after that is the usr code is requesting the path info 9so offset by 1)
            callerIndex = i+1;
            break;
        }
        // Now parse the string for each sectipn we want to return
        pathParts = stackLines[callerIndex].match(/((http[s]?:\/\/.+\/)([^\/]+\.[a-zA-Z]+)(\?[\w\d]+)?):/);
        if(pathParts){
            const parts = pathParts[3].split(".");
            parts.length = parts.length !== 1 ? parts.length -1: 1;
            const fileNoExt = parts.join(".");
            return {
            file:pathParts[3],
            fileNoExt,
            fullPath: pathParts[1],
            path: pathParts[2],
            query: pathParts[4] || "",
        };
    } else {
        return {
            file: "couldnotgetloaction.js",
            fileNoExt: "couldnotgetloaction",
            fullPath: "https://example.com/path/couldnotgetlocation.js?qyery",
            path: "https:// exmaple.com/path/",
            query: "?query",
        };
    }
    }
}
