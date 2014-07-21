echo "Loading ESWC 2011"

mlcp import -mode local ^
-host localhost -port 10041 -username admin -password admin ^
-mode local ^
-input_file_path "../data/eswc-2011-complete.rdf" ^
-input_file_type RDF ^
-output_collections "http://data.semanticweb.org/conference/eswc/2011/complete" 
