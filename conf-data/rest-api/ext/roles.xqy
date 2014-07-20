xquery version "1.0-ml";

module namespace roles =
"http://marklogic.com/rest-api/resource/roles";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function roles:get(
$context as map:map,
$params  as map:map
) as document-node()* {
  let $person := map:get($params, "iri")
  let $query-params :=
    map:new(map:entry("subject",
      sem:iri($person)))

  let $result := sem:sparql('
    PREFIX swc: <http://data.semanticweb.org/ns/swc/ontology#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

    SELECT ?role ?conf ?confname
    WHERE { ?subject swc:holdsRole  ?role .
            ?role swc:isRoleAt ?conf .
            ?conf rdfs:label ?confname .
          } order by asc(?conf)
    ', $query-params)

    return document {  xdmp:to-json($result) }
};

declare function roles:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function roles:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function roles:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};