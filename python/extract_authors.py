#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from __future__ import print_function
import sys, re
from lxml import objectify
from logger import LogBuffer

from similarity_set import SimilaritySet, string_similarity

tokenize_regex = ur',|\s+and\s+|×|†|◊|#|‡|∆|Φ|⊗|¶|♠|♣|‖|◦|§|$|⋆|\*|∗'
logger = LogBuffer("out.log")
# sets how much similarity is needed to call two string equivalent
CUTOFF = 0.78

stopwords = []

repl = {u'á' : u'a', u'ä' : u'a', u'à' : u'a', u'è' : u'e', u'é' : u'e', 
            u'ô' : u'o', u'ó' : u'o', u'ö' : u'o', u'ő' : u'o', u'ü' : u'u', 
            u'ű' : u'u', u'ú' : u'u', u'í' : u'i', u'ı' : u'i', u'Æ' : u'a', 
            u'ã' : u'a', u'Å' : u'A', u'Ž' : u'Z', u'Ç' : u'C', u'ł' : u'l', 
            u'ñ' : u'n', u'ğ' : u'g', u'ß' : u'ss', u'ć' : u'c', u'ø' : u'o'} 

def turn_unicode(obj, encoding='utf-8'):
    ''' to make sure everything is in utf-8 '''
    if isinstance(obj, basestring):
        if not isinstance(obj, unicode):
            obj = unicode(obj, encoding)
    return obj

def replace(text):
    """ Replaces the misclassified utf8 characters 
        with equivalent ascii characters """
    for key, val in repl.items():
        text = text.replace(key, val)
    # There are multiple utf8 hyphens but we want the ascii one only
    text = text.replace(u'_', u' ')
    text = text.replace(u'–', u'-')
    text = text.replace(u'−', u'-')
    text = text.replace(u'.', u'')

    # normalize name order
    splt = text.split(u',')
    if len(splt) == 2:
        text = splt[1].strip()+" "+splt[0]

    res = []
    # remove every nonalpha characters
    for c in text:
        if re.match(ur'[A-Za-z -]', c):
            res.append(c)
    return ''.join(res)

def rm_stopwords(stopw, authors):
    ''' removes stopwords like "University" from the tags '''
    res = []
    for author in authors:
        for stopword in stopw:
            author=re.sub(ur'\s+', ' ', author)
            if re.match(ur'\b{}\b'.format(stopword), author):
                print(author, u'[\''+stopword+u'\']')
            author = re.sub(ur'\b{}\b'.format(stopword), u' ', author)

       # print(u"" + author)
        if not re.match(ur'^\s*$', author):
            res.append(author)
    return res

def rm_existing(authors):
    ''' removes duplicate authors '''
    res = SimilaritySet(cutoff=CUTOFF)
    for a in authors:
        for b in authors:
            if b in a and string_similarity(b, a)<0.90:
                a = a.replace(b, '')
        res.add(a.strip())

    return res

def filter_authors(tags):
    ''' reads the xml author tags, 
        filters duplicates and stopwords in the text ''' 
    res = SimilaritySet(cutoff=CUTOFF)
    res.set_callback(replace)
    for author in tags:
        if "confidence" in author.attrib:
            # split authors on special characters
            author_text = map(lambda x: x.strip(), re.split(tokenize_regex, turn_unicode(author.text)))
            #author_text = turn_unicode(author.text).strip()
        
        #for a in [author_text]:
        for a in author_text:
            if not len(a.split(" ")) > 6:
                res.add(a)

    res = rm_existing(res)
    res = rm_stopwords(stopwords, res)
    return res

def read_file(fname):
    ''' read a file, return the text'''
    with open(fname, "r") as f:
        text = f.read()
    return text

def listauthors(root):
    ''' parses xml with lxml objectify parser and calls 
        filter_authors to extract authors '''
    res = SimilaritySet(cutoff=CUTOFF)
    if root.algorithm is None:
        return res
    
    # the similarity_set callback to replace or remove special characters
    res.set_callback(replace)
    for alg in root.algorithm:
        # hibakezelesek, ha nem letezik a tag akkor ne is nezze
        if alg.find("variant") is not None and alg.variant.find("author") is not None:
            res.update(filter_authors(alg.variant.author))

    return res



def main():
    global CUTOFF, stopwords

    if len(sys.argv) < 2:
        print("No inputfile")
        sys.exit(1)

    infile = sys.argv[1]
    outfile = "out.txt"
    if len(sys.argv) >= 3:
        outfile = sys.argv[2]

    with open("python/stopwords.txt", "r") as f:
        stopwords = map(lambda x: turn_unicode(x.strip()), f.read().splitlines()) 

    text = read_file(infile)

    parser = objectify.makeparser(recover=True, encoding="utf-8")
    tree = objectify.fromstring(text, parser)
    
    authors = listauthors(tree)

    with open(outfile, 'w') as f:
        f.write(u'\n'.join(authors))

if __name__ == "__main__":
    main()


