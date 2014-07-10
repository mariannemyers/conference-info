xquery version "1.0-ml";

module namespace conf-data =
"http://marklogic.com/rest-api/resource/conf-data";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function conf-data:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    let $uri := map:get($params, "uri")
    return document { json:transform-to-json(fn:doc($uri), json:config("full")) }
};

declare function conf-data:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function conf-data:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function conf-data:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};