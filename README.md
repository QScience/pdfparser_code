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

## Parscit code

Simple usage is:

	citeExtract.pl [-m mode] [-i <inputType>] <filename> [outfile]

Please read the documentation on the [parscit page](http://aye.comp.nus.edu.sg/parsCit/) to get full information on usage.

## Python code

This code makes some heuristics on the final parscit result. It accurates the author extraction.