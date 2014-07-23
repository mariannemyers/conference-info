# conference-info

This application shows linked data (RDF) from the Semantic Web [Dog Food corpus](http://data.semanticweb.org) via an application originally created via
the [MarkLogic Slush Generator](https://github.com/marklogic/slush-marklogic-node).  Use it to see conferences,
papers at a conference and their details, and also the people associated with the conferences.  Data is ingested
into MarkLogic via the [MarkLogic Content Pump (mlcp)](http://developer.marklogic.com/products/mlcp). 

This application uses mostly SPARQL to browse conferences, conference proceedings, and the people associated with the conferences.  People and papers (conference proceedings) each have their own detail pages.  You can also add and update comments about a paper.  Each person page details not only the papers that they wrote, but also has coauthor information as was my original plan.  I also include roles a person has at a conference, location information, and a picture if they have one


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

If these ports are not available:
- Edit conf-data/deploy/build.properties; set the -port properties to available ports
- Edit conf-data/gulpfile.js. In the options section near the top, set your desired ports

<pre>
$ cd conf-data
$ ml local bootstrap
$ ml local deploy modules
</pre>

## Load required data

Assumes mlcp is in your PATH... and that you're using Windows.

<pre>
$ cd conf-data/load-scripts
$ load-conf-data-2010.bat
$ load-conf-data-2011.bat
$ load-conf-data-2012.bat
$ load-conf-data-2013.bat
$ load-conf-data-2014.bat
</pre>

## Start gulp server
<pre>
$ gulp server
</pre>

## Navigate to http://localhost:10070/ 
Login to see content.

# Data
## Provided Data
Five years of data is provided within conf-data/data.  Scripts to load this data reside in conf-data/load-scripts.

## Data hints
Use data from 2014.  This has the richest dataset.  Rapahel Troncy is a good person to help navigate through the data.
He is well connected.

# Known Issues
## Person detail page does not show paper if the person is a sole author
It is rare that conference proceedings only have one author.  I have actually never seen this, until I looked at this
dataset.  The person detail page should show all papers even if the subject is the only author of the paper.

## Person detail page assumes a person has at least one role
As I navigated through older data, I found some people did not have appropriate data for roles held at a conference even if, for example, he was an author.  Fix display to hide role display if the person holds no roles.

# Future Development
## Add abstract to detail page
Some years of data have an abstract about papers.  This should be added in a future release.

## Throw a 501 on not implemented REST endpoints
Fix REST API XQuery modules to throw a 501 Not Implemented for POST, PUT, DELETE if not supported.

## Add unit tests
Build Karma unit tests to support the application.

## Add keyword search for paper or person
Implement a search feature to search for a person or paper. 

## Add "real" shell scripts for mlcp data ingest
Make the scripts work in environments other than Windows.

