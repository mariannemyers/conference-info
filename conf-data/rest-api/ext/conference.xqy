xquery version "1.0-ml";

module namespace conference =
"http://marklogic.com/rest-api/resource/conference";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function conference:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    (: Return details of what papers are at the conference collection requested :)
    let $graph := map:get($params, "graph")
    let $options := (fn:concat("default-graph=", $graph))

    let $result := sem:sparql('
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      PREFIX dc: <http://purl.org/dc/elements/1.1/>
      PREFIX swrc: <http://swrc.ontoware.org/ontology#>

      SELECT ?s ?title
      FROM<$graph>
      where {
        ?s a swrc:InProceedings;
        dc:title ?title .
      } order by asc(?title)

      ',
     (), $options
    )
    return document { xdmp:to-json($result) }
};

declare function conference:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function conference:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function conference:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};