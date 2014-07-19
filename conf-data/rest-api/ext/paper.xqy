xquery version "1.0-ml";

module namespace paper =
"http://marklogic.com/rest-api/resource/paper";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function paper:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    (: Return details of a paper :)
    let $paper := map:get($params, "paper")
    let $query-params :=
      map:new(map:entry("subject",
        sem:iri($paper)))

    let $result :=
      sem:sparql("
        PREFIX foaf:  <http://xmlns.com/foaf/0.1/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX swrc: <http://swrc.ontoware.org/ontology#>
        PREFIX owl: <http://www.ontologydesignpatterns.org/ont/eswc/ontology.owl#>

        SELECT ?title ?author ?authorname ?month ?year ?hashtag
        WHERE { ?subject dc:title ?title .
                ?subject foaf:maker ?author .
                ?author foaf:name ?authorname .
                ?subject swrc:month ?month .
                ?subject swrc:year ?year .
                { OPTIONAL { ?subject owl:hashtag ?hashtag } }
      }
      ", $query-params)
    return document { xdmp:to-json($result) }
};

declare function paper:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function paper:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function paper:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};