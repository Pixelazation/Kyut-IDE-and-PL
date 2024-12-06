from generator import *
import sys
import re

filepath = sys.argv[1]
outpath = re.sub(r'\..*', ".asm", filepath)

syntaxTree = Parser(lexer(open(filepath,"r").read())).ast
generator = CodeGenerator(syntaxTree)

output = generator.generateProgram()
open(outpath, "w").write(output)