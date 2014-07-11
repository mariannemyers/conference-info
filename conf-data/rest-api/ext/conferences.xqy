xquery version "1.0-ml";

module namespace conferences =
"http://marklogic.com/rest-api/resource/conferences";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function conferences:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    (: Return collection name (named graph) and title of conference :)
    let $graphs := cts:collections()
    let $maps :=
        for $graph in $graphs
        return
            map:new((
              (: map:entry("conference",( :)
                    (: TODO: Need a map that has all titles of graphs mgm :)
                    map:entry("name", "11th ESWC 2014"),
                    map:entry("graph", $graph)
                    (:    ) :)
                )
            )
    let $map := map:map()
    let $put := map:put($map, "conferences", $maps)
    return document {  xdmp:to-json($map) }
};

declare function conferences:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function conferences:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function conferences:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};