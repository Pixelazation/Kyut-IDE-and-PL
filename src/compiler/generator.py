from lexerparser import Node
from enums import *

# Generator
class CodeGenerator:
  def __init__(self, tree: Node):
    self._tree = tree
    self._code = ""

  def generateProgram(self):
    self._generateDeclarations()
    self._generateOperations()
    self._generateExit()
    return self._code
  
  def _addLine(self, line: str = ''):
    self._code += f'{line}\n'

  def _comment(self, comment: str):
    self._addLine(f'# {comment}')

  def _generateDeclarations(self):
    self._comment('VARIABLE DECLARATIONS')
    self._addLine()
    self._addLine('.data')
    self._addLine()
    self._declaration_list(self._tree.children[0])
    self._addLine()

  def _generateOperations(self):
    self._addLine('.text')
    self._addLine('.globl main')

    self._addLine()
    self._comment('OPERATIONS')

    self._addLine()

  def _generateExit(self):
    self._comment('Exit Program')
    self._addLine('li   $v0, 10          # system call for exit')
    self._addLine('syscall               # program exited')

  def _pushStack(self, value: int | str):
    self._addLine()

  # Productions

  def _declaration_list(self, dec_list: Node):
    for dec in dec_list.children:
      self._declaration(dec)

  def _declaration(self, dec: Node):
    type = dec.children[0].value
    var_name = dec.children[1].value
    
    if (type == DataTypesEnum.STRING):
      self._addLine(f'stw_{var_name}: .space 128')
    elif (type == DataTypesEnum.NUMBER):
      self._addLine(f'nom_{var_name}: .word')

  def _operationStatement(self, opStmt: Node):
    type = opStmt.type

    for child in opStmt.children:
      self._pushStack(child)

    if (type == ProductionTokensEnum.PLUS):
      pass
    elif (type == ProductionTokensEnum.MINUS):
      pass
    elif (type == ProductionTokensEnum.TIMES):
      pass
    elif (type == ProductionTokensEnum.DIVIDE):
      pass
    elif (type == ProductionTokensEnum.ASSIGN):
      pass
    elif (type == ProductionTokensEnum.INPUT):
      pass
    elif (type == ProductionTokensEnum.OUTPUT):
      pass


# Sample

start = Node(ProductionTokensEnum.PROGRAM)

dec_list = Node(ProductionTokensEnum.DEC_LIST)
dec_list.addChild(Node(ProductionTokensEnum.DEC))
dec_list.addChild(Node(ProductionTokensEnum.DEC))

dec_list.children[0].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.NUMBER))
dec_list.children[0].addChild(Node(ProductionTokensEnum.ID, 'x'))

dec_list.children[1].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.STRING))
dec_list.children[1].addChild(Node(ProductionTokensEnum.ID, 'words'))

start.addChild(dec_list)

codeGen = CodeGenerator(start)
print(codeGen.generateProgram())


