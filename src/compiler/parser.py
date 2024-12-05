from scanner import lexer

# Tree
class Node:
    def __init__(self, type, value):
        self.type = type
        self.value = value
        self.children =[]
    def addChild(self, child):
        self.children.append(child)
def printLevelOrder(root):
    q = []
    q.append(root)
    while q:
        for i in q[0].children:
            q.append(i)
        print(f"{q[0]} {q[0].type} {q[0].value}")
        q.pop(0)  
def printPostfixOrder(node):
    if not node:
        return
    for child in node.children:
        printPostfixOrder(child)
    print(f"{node} {node.type} {node.value}")

# Parser
class Parser:
    def __init__(self, tokens):
        self.tokens = tokens
        self.pos = 0
        self.symbol_table = {}
        self.ast = self.parse()

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
         node = Node('PROGRAM',"Kyut")
         self.program(node)
         return node
    
    # Grammar rule: program ::= dec_list op_list
    def program(self, node):
        node.addChild(Node("DECLARATION_LIST", "Declarations"))
        self.declaration_list(node.children[0])
        node.addChild(Node("OPERATION_LIST", "Operations"))
        self.operation_list(node.children[1])
        return 
    
    # Grammar rule: dec_list ::= dec dec_list | e
    def declaration_list(self, node):
        i=0
        while self.l()[0] == 'TYPE':
            node.addChild(Node("DECLARATION", f"Declare_{i+1}"))
            self.declaration(node.children[i])
            i+=1
        return 
    # Grammar rule: dec ::= TYPE ID END
    def declaration(self, node):
        type = self.shift('TYPE')
        name = self.shift('ID')
        if name[1] in self.symbol_table:
            raise SyntaxError(f"Variable '{name[1]}' is already declared.")
        self.symbol_table[name[1]] = type[1]
        node.addChild(Node(type[0],type[1]))
        node.addChild(Node(name[0],name[1]))
        self.shift('END')
        return 
    # Grammar rule: op_list ::= op END op_list | e
    def operation_list(self, node):
        operations = []
        while self.l()[0] in ('ID', 'KEYWORD'):
            operations.append(self.operation())
            self.shift('END')
        for i in operations:
            node.addChild(i)
        return
    # Grammar rule: op ::= as| exp | INPUT ID | OUTPUT val | e
    def operation(self):
        current = self.l()
        if current[0] in ('ID', 'NUMBER'):
            s=self.l(2)
            if s[0] in ('PLUS', 'MINUS', 'TIMES', 'DIVIDE'):
                return self.expression()
            elif s[0] == 'ASSIGN':
                return self.assignment()
            elif s[0] == 'END':
                self.shift('ID')
                return Node(current[0], current[1])
            else:
                raise SyntaxError(f"Unexpected statement: {current}")
        elif current[1] == 'pwease':
            node = Node('INPUT', 'Pwease')
            self.shift('KEYWORD')
            current=self.l()
            node.addChild(Node(current[0],current[1]))
            token_type, value = self.shift('ID')
            if token_type == 'ID' and value not in self.symbol_table:
                raise SyntaxError(f"Variable '{value}' is not declared.")
            return node
        elif current[1] == 'rawr':
            node = Node('OUTPUT', 'Rawr')
            self.shift('KEYWORD')
            out = self.value()
            node.addChild(out)
            return node
        else:
            raise SyntaxError(f"Unexpected statement: {current}")
    # Grammar rule: as ::= ID = VAL
    def assignment(self):
        current = self.shift('ID')
        if current[0] == 'ID' and current[1] not in self.symbol_table:
            raise SyntaxError(f"Variable '{current[1]}' is not declared.")
        left =  Node(current[0],current[1])
        current = self.shift('ASSIGN')
        op = Node(current[0],current[1])
        right = self.value()
        op.addChild(left)
        op.addChild(right)
        return op
    
    # Grammar rule: ass ::= exp | STRING | ID
    def value(self):
        current = self.l()
        s = self.l(2)
        if current[0] == 'ID' and current[1] not in self.symbol_table:
            raise SyntaxError(f"Variable '{current[1]}' is not declared.")
        if s[0] == 'END':
            self.shift(current[0]) 
            return Node(current[0],current[1])
        else:
            return self.expression()
        
    # Grammar rule: exp ::= term (('+' | '-') term)* 
    def expression(self):
        node = self.term()
        current=self.l()
        while current[0] in ('PLUS', 'MINUS'):
            token = self.shift(current[0])
            op = Node(token[0], token[1])
            next = self.term()
            op.addChild(node)
            op.addChild(next)
            node = op
            current = self.l()
        return node
    
    # Grammar rule: term ::= factor (('*' | '/') factor)*
    def term(self):
        node=self.factor()
        current = self.l()
        while current[0] in ('TIMES', 'DIVIDE'):
            token = self.shift(current[0])
            op = Node(token[0], token[1])
            next = self.factor()
            op.addChild(node)
            op.addChild(next)
            node = op
            current = self.l()
        return node
    
    # Grammar rule: factor ::= NUMBER | ID | (exp)
    def factor(self):
        token_type, value = self.l()
        if token_type == 'ID' and value not in self.symbol_table:
          raise SyntaxError(f"Variable '{value}' is not declared.")
        if token_type in ('NUMBER', 'ID') :
            self.shift(token_type)
            return Node(token_type, value)
        elif token_type == 'LPAREN':
            self.shift('LPAREN')
            node = self.expression()
            self.shift('RPAREN')
            return node
        else:
            raise SyntaxError(f"Unexpected token: {value}")

# printLevelOrder(Parser(lexer(open(input(),"r").read())).ast)
printPostfixOrder(Parser(lexer(open(input(),"r").read())).ast)
# Validate declared variables/IDs