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
    self._declarationList(self._tree.children[0])
    self._addLine()

  def _generateOperations(self):
    self._addLine('.text')
    self._addLine('.globl main')

    self._addLine()
    self._comment('OPERATIONS')
    self._operationList(self._tree.children[1])

    self._addLine()

  def _generateExit(self):
    self._comment('Exit Program')
    self._addLine('li   $v0, 10          # system call for exit')
    self._addLine('syscall               # program exited')

  def _pushStack(self, value: int | str):
    isInt = isinstance(value, int)

    loadOp = 'li' if isInt else 'lw'
    loadee = value if isInt else f'nom_{value}'

    self._addLine('addi $sp, $sp, -4')

    self._addLine(f'{loadOp} $t0 {loadee}')

    self._addLine('sw $t0 ($sp)')

  def _pushStackFromReg(self, register: int):
    reg = f'$t{register}'

    self._addLine('addi $sp, $sp, -4')
    self._addLine(f'sw {reg} ($sp)')


  def _popStack(self, register: int):
    reg = f'$t{register}'

    self._addLine(f'lw {reg} ($sp)')
    self._addLine('addi $sp, $sp, 4')

  # Productions

  def _declarationList(self, dec_list: Node):
    for dec in dec_list.children:
      self._declaration(dec)

  def _declaration(self, dec: Node):
    type = dec.children[0].value
    var_name = dec.children[1].value
    
    if (type == DataTypesEnum.STRING):
      self._addLine(f'stw_{var_name}: .space 128')
    elif (type == DataTypesEnum.NUMBER):
      self._addLine(f'nom_{var_name}: .word')

  def _operationList(self, opList: Node):
    for opStmt in opList.children:
      self._operationStatement(opStmt)

  def _operationStatement(self, opStmt: Node):
    type = opStmt.type

    for child in opStmt.children:
      self._term(child)

    if (type in BINARY_OPS):
      self._binaryOp(type)
    elif (type == ProductionTokensEnum.ASSIGN):
      pass
    elif (type == ProductionTokensEnum.INPUT):
      pass
    elif (type == ProductionTokensEnum.OUTPUT):
      pass
  
  def _term(self, term: Node):
    if term.type in BINARY_OPS:
      self._operationStatement(term)
    else:
      self._pushStack(term.value)

  def _binaryOp(self, type: ProductionTokensEnum):
    self._popStack(1)     # Pop Second Operand to $t1
    self._popStack(0)     # Pop First Operand to $t0

    if (type == ProductionTokensEnum.PLUS):
      self._addLine('add $t0 $t0 $t1')
    elif(type == ProductionTokensEnum.MINUS):
      self._addLine('sub $t0 $t0 $t1')
    elif(type == ProductionTokensEnum.TIMES):
      self._addLine('mul $t0 $t0 $t1')
    elif(type == ProductionTokensEnum.DIVIDE):
      self._addLine('div $t0 $t0 $t1')
    
    self._pushStackFromReg(0)


# Sample

start = Node(ProductionTokensEnum.PROGRAM)

dec_list = Node(ProductionTokensEnum.DEC_LIST)
dec_list.addChild(Node(ProductionTokensEnum.DEC))
dec_list.addChild(Node(ProductionTokensEnum.DEC))

dec_list.children[0].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.NUMBER))
dec_list.children[0].addChild(Node(ProductionTokensEnum.ID, 'x'))

dec_list.children[1].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.STRING))
dec_list.children[1].addChild(Node(ProductionTokensEnum.ID, 'words'))

op_list = Node(ProductionTokensEnum.OP_LIST)

op1 = Node(ProductionTokensEnum.PLUS)
op1.addChild(Node(ProductionTokensEnum.NUMBER, 5))
op1.addChild(Node(ProductionTokensEnum.NUMBER, 12))

op_list.addChild(op1)

start.addChild(dec_list)
start.addChild(op_list)

codeGen = CodeGenerator(start)
print(codeGen.generateProgram())


