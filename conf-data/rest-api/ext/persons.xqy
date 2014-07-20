xquery version "1.0-ml";

module namespace persons =
"http://marklogic.com/rest-api/resource/persons";

import module namespace json="http://marklogic.com/xdmp/json"
at "/MarkLogic/json/json.xqy";

declare default function namespace
"http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function persons:get(
$context as map:map,
$params  as map:map
) as document-node()* {
    (: Return collection name (named graph) and title of conference :)
    let $result := sem:sparql('
      PREFIX foaf: <http://xmlns.com/foaf/0.1/>
      PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

      select ?iri ?name
      where { ?iri rdf:type foaf:Person ;
             foaf:name ?name ;
             foaf:lastName ?lastname .
            } order by asc(?lastname)
    ', ())

    return document {  xdmp:to-json($result) }
};

declare function persons:put(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()?  {
    document { "put" }
};

declare function persons:post(
$context as map:map,
$params  as map:map,
$input   as document-node()*
) as document-node()* {
    document { "post" }

};

declare function persons:delete(
$context as map:map,
$params  as map:map
) as document-node()? {
    document { "delete" }
};