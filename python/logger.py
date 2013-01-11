#!/usr/bin/env python
# -*- coding: utf-8 -*-

import codecs

class LogBuffer():
    ''' simple (stupid) logging class '''
    def __init__(self, fname):
        self.name = fname
        self.buff = []

    def add(self, string):
        self.buff.append(string)
    
    def write_buffer(self):
        with codecs.open(self.name, "w", "utf-8-sig") as f:
            f.write("\n".join(self.buff) + "\n")
            f.flush()

