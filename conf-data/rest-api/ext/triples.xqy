xquery version "1.0-ml";

module namespace triples =
"http://marklogic.com/rest-api/resource/triples";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

import module namespace sem = "http://marklogic.com/semantics"
at "/MarkLogic/semantics.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function triples:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    let $iri := map:get($params, "iri")
    let $log := xdmp:log($iri)
    let $bindings := ( map:entry("s",
      sem:iri($iri))
     )
    let $triples := sem:sparql-values("select * { ?s ?p ?o }",$bindings)
    let $log := xdmp:log($triples)
    return (
      xdmp:set-response-code(200, "OK"),
      document { xdmp:to-json($triples)}
    )
};

declare function triples:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function triples:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function triples:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};