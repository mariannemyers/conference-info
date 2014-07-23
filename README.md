# conference-info

This application shows linked data (RDF) from the Semantic Web [Dog Food corpus](http://data.semanticweb.org) via an application originally created via
the [MarkLogic Slush Generator](https://github.com/marklogic/slush-marklogic-node).  Use it to see conferences,
papers at a conference and their details, and also the people associated with the conferences.  Data is ingested
into MarkLogic via the [MarkLogic Content Pump (mlcp)](http://developer.marklogic.com/products/mlcp). 

# Use

## Required
- node
- npm
- gulp
- mlcp

## Bootstrap MarkLogic

conf-data assumes you are using the following ports:
- 10070 for the application
- 10040 for a MarkLogic HTTP server
- 10041 for a MarkLogic XDBC server

If these do not work:
- Edit conf-data/deploy/build.properties; set the -port properties to available ports
- Edit conf-data/gulpfile.js. In the options section near the top, set your desired ports

$ cd conf-data
$ ml local bootstrap
$ ml local deploy modules

## Load required data

Assumes mlcp is in your PATH... and that you're using Windows.

$ cd conf-data/load-scripts
$ load-conf-data-2010.bat
$ load-conf-data-2011.bat
$ load-conf-data-2012.bat
$ load-conf-data-2013.bat
$ load-conf-data-2014.bat

## Start gulp server

$ gulp server

## Navigate to http://localhost:10070/ and login to see content.

# Data
## Provided Data
Five years of data is provided within conf-data/data.  Scripts to load this data reside in conf-data/load-scripts.

