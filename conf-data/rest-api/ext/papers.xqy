xquery version "1.0-ml";

module namespace papers =
"http://marklogic.com/rest-api/resource/papers";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function papers:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    let $result := sem:sparql('
      PREFIX dc: <http://purl.org/dc/elements/1.1/>
      PREFIX swrc: <http://swrc.ontoware.org/ontology#>

      SELECT ?iri ?title
      where {
        ?iri a swrc:InProceedings;
        dc:title ?title .
      } order by asc(?title)
    ', ())

    return document {  xdmp:to-json($result) }
};

declare function papers:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function papers:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function papers:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};