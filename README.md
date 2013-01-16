# Codes for PDF parser

This project's aim is to parse scientific papers.
It extracts some basic information from the paper like:
- title
- abstract
- authors
- references
- authors, titles to references

## Java code

The java code is responsible for converting .pdf files to txt which is used by the [parscit](http://aye.comp.nus.edu.sg/parsCit/).
You can use ant to build the java project and use it to pdf to txt conversion.
The following simply code should build the project:

	ant jar
	
In case you have ant in your computer, it should make PDFConverter.jar file, which you can use to conversion with the following way:

You can provide 1 or 2 arguments. The first argument is for an input file, or a folder, the second argument is for the output file or folder.
In case you not provide the second argument, the converter will put the files next to the original one with an additional ".txt" extension.

The libraries used by java code is listed here:
- [bcprov-jdk15on-147.jar](http://www.bouncycastle.org/latest_releases.html)
- [commons-logging-1.1.1.jar](http://commons.apache.org/logging/)
- [fontbox-1.7.1.jar](http://pdfbox.apache.org/download.html)
- [pdfbox-1.7.1.jar](http://pdfbox.apache.org/download.html)
- [PDFTextStream.jar](http://snowtide.com/)

## Parscit code

Simple usage is:

	citeExtract.pl [-m mode] [-i <inputType>] <filename> [outfile]

Please read the documentation on the [parscit page](http://aye.comp.nus.edu.sg/parsCit/) to get full information on usage.

## Python code

This code makes some heuristics on the final parscit result. It accurates the author extraction.

Usage of the python code is the following. Just call the extract_authors.py script with 1 or 2 arguments.
The first argument is for the input file, the second argument is optional.
If you provide, that will be the output file name, otherwise the default value is "out.txt".