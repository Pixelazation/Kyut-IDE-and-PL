from lexerparser import Node
from enums import *
from typing import Dict

# Generator
class CodeGenerator:
  def __init__(self, tree: Node):
    self._tree = tree
    self._code = ""
    self._symbolTable: Dict[str, str] = {}

  def generateProgram(self):
    self._generateDeclarations()
    self._generateOperations()
    self._generateExit()
    return self._code
  
  def _addLine(self, line: str = ''):
    self._code += f'{line}\n'

  def _comment(self, comment: str):
    self._addLine(f'# {comment}')

  def _getIdType(self, idNode: Node) -> DataTypesEnum:
    address = self._symbolTable[idNode.value]
    prefix = address[0:3]

    if prefix == 'stw':
      return DataTypesEnum.STRING
    elif prefix == 'nom':
      return DataTypesEnum.NUMBER
    
    raise Exception('HOW AND WHY??? okay im good... (type error)')

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
    self._addLine('main:')
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

    self._addLine(f'{loadOp} $t0, {loadee}')

    self._addLine('sw $t0, ($sp)')

  def _pushStackFromReg(self, register: int):
    reg = f'$t{register}'

    self._addLine('addi $sp, $sp, -4')
    self._addLine(f'sw {reg}, ($sp)')


  def _popStack(self, register: int):
    reg = f'$t{register}'

    self._addLine(f'lw {reg}, ($sp)')
    self._addLine('addi $sp, $sp, 4')

  def _syscall(self, code: SysCallsEnum):
    self._addLine(f'li $v0, {code.value}           # Load system directive')
    self._addLine('syscall')

  # Productions

  def _declarationList(self, dec_list: Node):
    for dec in dec_list.children:
      self._declaration(dec)

  def _declaration(self, dec: Node):
    type = dec.children[0].value
    var_name = dec.children[1].value
    
    if (type == DataTypesEnum.STRING):
      self._addLine(f'stw_{var_name}: .space 128')
      self._symbolTable[var_name] = f'stw_{var_name}'
    elif (type == DataTypesEnum.NUMBER):
      self._addLine(f'nom_{var_name}: .word 0')
      self._symbolTable[var_name] = f'nom_{var_name}'

  def _operationList(self, opList: Node):
    for opStmt in opList.children:
      self._operationStatement(opStmt)

  def _operationStatement(self, opStmt: Node):
    type = opStmt.type

    if (type in BINARY_OPS):
      self._binaryOp(opStmt)

    elif (type == ProductionTokensEnum.ASSIGN):
      self._assignment(opStmt)

    elif (type == ProductionTokensEnum.INPUT):
      self._input(opStmt)

    elif (type == ProductionTokensEnum.OUTPUT):
      self._output(opStmt)
  
  def _expression(self, exp: Node):
    if exp.type in BINARY_OPS:
      self._operationStatement(exp)
    else:
      self._pushStack(exp.value)

  def _binaryOp(self, opStmt: Node):
    type = opStmt.type

    for child in opStmt.children:
        self._expression(child)

    self._popStack(1)     # Pop Second Operand to $t1
    self._popStack(0)     # Pop First Operand to $t0

    if (type == ProductionTokensEnum.PLUS):
      self._addLine('add $t0, $t0, $t1')
    elif(type == ProductionTokensEnum.MINUS):
      self._addLine('sub $t0, $t0, $t1')
    elif(type == ProductionTokensEnum.TIMES):
      self._addLine('mul $t0, $t0, $t1')
    elif(type == ProductionTokensEnum.DIVIDE):
      self._addLine('div $t0, $t0, $t1')
    
    self._pushStackFromReg(0)

  def _assignment(self, asOp: Node):
    id = asOp.children[0].value
    address = self._symbolTable[id]

    valueNode = asOp.children[1]

    if valueNode.type == ProductionTokensEnum.STRING:
      pass

    else:
      self._expression(asOp.children[1])

      self._popStack(0)
      self._addLine(f'sw $t0, {address}')

  def _input(self, inputOp: Node):
    idNode = inputOp.children[0]
    type = self._getIdType(idNode)

    if (type == DataTypesEnum.STRING):
      pass
    elif (type == DataTypesEnum.NUMBER):
      self._syscall(SysCallsEnum.READ_INT)
      self._addLine(f'sw $v0, {self._symbolTable[idNode.value]}')


  def _output(self, outputOp: Node):
    valueNode = outputOp.children[0]

    if valueNode.type == ProductionTokensEnum.STRING:
      return

    if valueNode.type == ProductionTokensEnum.ID:
      # YOU NEED TO CHECK IF STRINGGGGGG
      self._addLine(f'lw $a0, {self._symbolTable[valueNode.value]}')
      self._syscall(SysCallsEnum.PRINT_INT)

    else:
      self._expression(valueNode)
      self._popStack(0)
      self._addLine('move $a0, $t0')
      self._syscall(SysCallsEnum.PRINT_INT)
      

# Sample

start = Node(ProductionTokensEnum.PROGRAM)

dec_list = Node(ProductionTokensEnum.DEC_LIST)
dec_list.addChild(Node(ProductionTokensEnum.DEC))
dec_list.addChild(Node(ProductionTokensEnum.DEC))
dec_list.addChild(Node(ProductionTokensEnum.DEC))

dec_list.children[0].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.NUMBER))
dec_list.children[0].addChild(Node(ProductionTokensEnum.ID, 'x'))

dec_list.children[1].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.NUMBER))
dec_list.children[1].addChild(Node(ProductionTokensEnum.ID, 'y'))

dec_list.children[2].addChild(Node(ProductionTokensEnum.TYPE, DataTypesEnum.NUMBER))
dec_list.children[2].addChild(Node(ProductionTokensEnum.ID, 'z'))

op_list = Node(ProductionTokensEnum.OP_LIST)

op1 = Node(ProductionTokensEnum.PLUS)
op1.addChild(Node(ProductionTokensEnum.NUMBER, 5))
op1.addChild(Node(ProductionTokensEnum.NUMBER, 12))

op2 = Node(ProductionTokensEnum.ASSIGN)
op2.addChild(Node(ProductionTokensEnum.ID, 'x'))
op2.addChild(op1)

userIn = Node(ProductionTokensEnum.INPUT)
userIn.addChild(Node(ProductionTokensEnum.ID, 'y'))

sum = Node(ProductionTokensEnum.PLUS)
sum.addChild(Node(ProductionTokensEnum.ID, 'x'))
sum.addChild(Node(ProductionTokensEnum.ID, 'y'))

out = Node(ProductionTokensEnum.OUTPUT)
out.addChild(sum)

op_list.addChild(op2)
op_list.addChild(userIn)
op_list.addChild(out)

start.addChild(dec_list)
start.addChild(op_list)

codeGen = CodeGenerator(start)
print(codeGen.generateProgram())


