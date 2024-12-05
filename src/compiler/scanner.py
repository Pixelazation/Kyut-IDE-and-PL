import re

# Scanner for identifiers, numbers, and keywords
# Token Specification 
TOKENS = [
    
    ('TYPE',     r'nom|stwing'),        # Declaration Types
    ('KEYWORD',  r'pwease|rawr'),             # Input/Output
    ('STRING',   r'"[^"]+"'),              # Strings
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