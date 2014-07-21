xquery version "1.0-ml";

module namespace author-detail =
"http://marklogic.com/rest-api/resource/author-detail";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function author-detail:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    (: Return details of a person :)
    let $person := map:get($params, "person")
    let $query-params :=
      map:new(map:entry("subject",
        sem:iri($person)))

    let $result :=
      sem:sparql("
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>

        SELECT ?pub ?title ?coauthor ?coauthorname ?proceedings
        WHERE { ?subject foaf:made ?pub .
                ?pub foaf:maker ?coauthor .
                ?coauthor foaf:name ?coauthorname .
                ?pub dc:title ?title .
                ?pub swc:isPartOf ?proceedings .
                FILTER ( ?subject != ?coauthor) .
              } order by asc(?pub)
      ", $query-params)
    return document { xdmp:to-json($result) }
};

declare function author-detail:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function author-detail:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function author-detail:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};