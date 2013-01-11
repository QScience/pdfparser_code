#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from collections import MutableSet

def get_bigrams(string):
    ''' Takes a string and returns a list of bigrams '''
    s = string.lower()
    return [s[i:i+2] for i in xrange(len(s) - 1)]

def string_similarity(str1, str2):
    ''' Perform bigram comparison between two strings
        and return a percentage match in decimal form '''
    pairs1 = get_bigrams(str1)
    pairs2 = get_bigrams(str2)

    union  = len(pairs1) + len(pairs2)
    if union == 0:
        union = 1

    hit_count = 0
    for x in pairs1:
        for y in pairs2:
            if x == y: 
                hit_count += 1
    return (2.0 * hit_count) / union


class SimilaritySet(MutableSet):
    ''' A set to contain the author names without duplication '''

    def __init__(self, initvalue=(), cb=None, cutoff=0.75):
        self._theset = set()
        self.cutoff = cutoff

        if not cb:
            cb = self.default_cb
        self.callback = cb
        for x in initvalue: self.add(x)

    def __contains(self, item, alist):
        if alist is None or len(alist) == 0:
            return False

        for element in alist:
            if string_similarity(item, element) >= self.cutoff:
                return True
        return False

    def default_cb(cls, item):
        return item
    
    def __len__(self):
        return len(self._theset)

    def add(self, item):
        item = self.callback(item)
        if item and item not in self:
            self._theset.add(item)

    def discard(self, item):
        item = self.callback(item)
        if item in self:
            self._theset.discard(item)

    def __iter__(self):
        return iter(self._theset)

    def __contains__(self, key):
        key = self.callback(key)
        return self.__contains(key, self)

    def update(self, other):
        for a in other:
            self.add(a)

    def union(self, other):
        return SimilaritySet([b for b in self] + [a for a in other])

    def intersect(self, other):
        return SimilaritySet([item for item in self._theset if item in other]) 

    def subtract(self, other):
        return SimilaritySet([item for item in self._theset if item not in other])

    def __add__(self, other):
        return self.union(other)

    def __sub__(self, other):
        return self.subtract(other)

    def __str__(self):
        return str(self._theset)

    def set_callback(self, fn):
        self.callback = fn
