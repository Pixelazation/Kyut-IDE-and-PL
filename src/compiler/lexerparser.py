from __future__ import annotations
from typing import List

import re

# Scanner for identifiers, numbers, and keywords
# Token Specification 
TOKENS = [
    
    ('TYPE',     r'nom|stwing'),        # Declaration Types
    ('KEYWORD',  r'pwease|rawr'),             # Input/Output
    ('STRING',   r'".+"'),              # Strings
    ('END',      r'<3'),                # Terminators
    ('NUMBER',   r'\d+(\.\d+)?'),       # Integer or decimal number
    ('ID',       r'[A-Za-z_]\w*'),      # Identifiers
    ('ASSIGN',   r'='),                 # Assignment operator
    ('PLUS',     r'\+'),                # Addition operator
    ('MINUS',    r'-'),                 # Subtraction operator
    ('TIMES',    r'\*'),                # Multiplication operator
    ('DIVIDE',   r'/'),                 # Division operator
    ('LPAREN',   r'\('),                # Left parenthesis
    ('RPAREN',   r'\)'),                # Right parenthesis
    ('SKIP',     r'[ \t]+'),            # Skip spaces and tabs
    ('NEWLINE',  r'\n'),                # Line endings
    ('UNKNOWN',  r'.'),                 # Any other character (unknown)
]

# Lexer
def lexer(code):
    token_regex = '|'.join(f'(?P<{name}>{pattern})' for name, pattern in TOKENS)
    token_pattern = re.compile(token_regex)
    tokens = []
    line_num = 1

    for match in token_pattern.finditer(code):
        kind = match.lastgroup
        value = match.group()

        if kind == 'NUMBER':
            value = float(value) if '.' in value else int(value)
            tokens.append((kind, value))
        elif kind == 'ID':
            tokens.append((kind, value))
        elif kind == 'NEWLINE':
            line_num += 1
        elif kind == 'SKIP':
            continue
        elif kind == 'UNKNOWN':
            raise SyntaxError(f'Unknown character {value!r} at line {line_num}')
        else:
            tokens.append((kind, value))
    
    return tokens

# Parser
class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
    
    def l(self, x=1):
        return self.tokens[self.pos+(x-1)] if self.pos < len(self.tokens) else (None, None)
    
    def shift(self, expected_type=None):
        current = self.l()
        if current[0] is None:
            raise SyntaxError("Unexpected end of input")
        if expected_type and current[0] != expected_type:
            raise SyntaxError(f"Expected {expected_type}, got {current[0]}")
        self.pos += 1
        return current
    
    def parse(self):
         return self.program()
    
    # Grammar rule: program ::= dec_list op_list
    def program(self):
        declarations = self.declaration_list()
        operations = self.operation_list()
        return(("Kyut",("Declarations", declarations),("Operations", operations)))
    
    # Grammar rule: dec_list ::= dec dec_list | e
    def declaration_list(self):
        declarations = []
        while self.l()[0] == 'TYPE':
            declarations.append(self.declaration())
        return declarations
    # Grammar rule: dec ::= TYPE ID END
    def declaration(self):
        var_type = self.shift('TYPE')[1]
        var_name = self.shift('ID')[1]
        self.shift('END')
        return (var_type, var_name)
    # Grammar rule: op_list ::= op END op_list | e
    def operation_list(self):
        operations = []
        while self.l()[0] in ('ID', 'KEYWORD'):
            operations.append(self.operation())
            self.shift('END')
        return operations
    # Grammar rule: op ::= as| exp | INPUT ID | OUTPUT val | e
    def operation(self):
        current = self.l()
        if current[0] == 'ID':
            s = self.l(2)
            if s[0] in ('PLUS', 'MINUS', 'TIMES', 'DIVIDE'):
                return self.expression()
            elif s[0] == 'ASSIGN':
                return self.assignment()
            else:
                raise SyntaxError(f"Unexpected statement: {current}")
        elif current[1] == 'pwease':
            self.shift('KEYWORD')
            return ('INPUT', self.shift('ID')[1])
        elif current[1] == 'rawr':
            self.shift('KEYWORD')
            return ('OUTPUT', self.value())
        else:
            raise SyntaxError(f"Unexpected statement: {current}")
    # Grammar rule: as ::= ID = VAL
    def assignment(self):
        var_name = self.shift('ID')[1]
        self.shift('ASSIGN')
        value = self.value()
        return ('ASSIGN', ('ID', var_name), value)
    
    # Grammar rule: ass ::= exp | STRING | ID
    def value(self):
        current = self.l()
        if current[0] in ('STRING', 'ID'):
            return self.shift(current[0])
        else:
            return self.expression()
        
    # Grammar rule: exp ::= term (('+' | '-') term)* 
    def expression(self):
        node = self.term()
        while self.l()[0] in ('PLUS', 'MINUS'):
            op = self.shift()[0]
            right = self.term()
            node = (op, node, right)
        return node
    
    # Grammar rule: term ::= factor (('*' | '/') factor)*
    def term(self):
        node = self.factor()
        while self.l()[0] in ('TIMES', 'DIVIDE'):
            op = self.shift()[0]
            right = self.factor()
            node = (op, node, right)
        return node
    
    # Grammar rule: factor ::= NUMBER | ID | (exp)
    def factor(self):
        token_type, value = self.l()
        if token_type == 'NUMBER':
            self.shift('NUMBER')
            return ('NUMBER', value)
        elif token_type == 'ID':
            self.shift('ID')
            return ('ID', value)
        elif token_type == 'LPAREN':
            self.shift('LPAREN')
            node = self.expression()
            self.shift('RPAREN')
            return node
        else:
            raise SyntaxError(f"Unexpected token: {value}")
        
# Tree
class Node:
    def __init__(self, type, value=None):
        self.type = type
        self.value = value
        self.children: List[Node] = []
    def addChild(self, child: Node):
        self.children.append(child)
def printLevelOrder(root):
    q = []
    q.append(root)
    while q:
        for i in q[0].children:
            q.append(i)
        print(q[0].data)
        q.pop(0)  

# Syntax Analysis
def dec_validation(tokens:list, declared:dict, root:Node)->int:
    # print(tokens)
    while len(tokens)>=3:
        if (tokens[0] == "nom" or tokens[0] == "stwing") and tokens[2] == "<3":     
            if tokens[1] in declared.keys():
                raise BaseException(tokens[1]+" is already declared.")
            else:
                if tokens[0] == "nom":
                    d = Node("declare numerical")
                elif tokens[0] == "stwing":
                    d = Node("declare string")
                else:
                    raise BaseException("This case should be impossible")
                declared[tokens[1]] = tokens[0]
                d.addChild(Node(tokens[1]))
                root.addChild(d)
        else:
            return 0
        tokens = tokens[3:]
    return 1
def op_validation(state:int, s:str, declared:dict)->int:
    return 0

def tokenize(h:str, root:Node)->list:
    lines = h.split("\n")
    tokens = []
    declaredVariables = {}
    declaration = 1
    index = 0
    while declaration:
        declaration = dec_validation(lines[index].replace("<3"," <3 ").split(), declaredVariables, language.children[0])
        index = index + declaration
    lines=lines[index:]
    for i in lines:
        operation = op_validation(i.replace("<3"," <3 ").split()),
        print(i)
    return tokens

# language = Node("kyut")
# language.addChild(Node("declaration"))
# language.addChild(Node("operation"))

# print(tokenize(open(input(),"r").read(),language))

# printLevelOrder(language)

# print(Parser(lexer(open(input(),"r").read())).parse())
# How to separate lexer-parser
# Validate declared variables/IDs