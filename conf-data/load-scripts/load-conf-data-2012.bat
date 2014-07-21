echo "Loading ESWC 2012"

mlcp import -mode local ^
-host localhost -port 10041 -username admin -password admin ^
-mode local ^
-input_file_path "../data/eswc-2012-complete.rdf" ^
-input_file_type RDF ^
-output_collections "http://data.semanticweb.org/conference/eswc/2012/complete" 
