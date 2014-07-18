xquery version "1.0-ml";

module namespace person =
"http://marklogic.com/rest-api/resource/person";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function person:get(
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

        SELECT ?name ?depiction ?based_near ?mbox
        WHERE { ?subject foaf:name ?name .
                { OPTIONAL { ?subject foaf:depiction ?depiction } } .
                { OPTIONAL { ?subject foaf:based_near ?based_near } } .
                { OPTIONAL { ?subject foaf:mbox ?mbox } } 
      }
      ", $query-params)
    return document { xdmp:to-json($result) }
};

declare function person:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function person:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function person:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};