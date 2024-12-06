from parser import *
from enums import *
from typing import Dict

# MISC
BINARY_OPS_VAL = list(map(lambda prod_type: prod_type.value, BINARY_OPS))
STR_BUFFER_ADDR = 'BUFFER'

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
    self._generateHelpers()
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
    self._addLine('NEWLN: .asciiz "\\n"')
    self._addLine(f'{STR_BUFFER_ADDR}: .space {STRING_BUFFER_LENGTH}')
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

  def _generateHelpers(self):
    self._addLine()
    self._comment('HELPERS')
    self._helperCopyStr()

  def _generateExit(self):
    self._comment('Exit Program')
    self._addLine('li   $v0, 10          # system call for exit')
    self._addLine('syscall               # program exited')

  def _helperCopyStr(self):
    self._addLine('copy_loop:')
    self._addLine('lb $t0, 0($a0)')
    self._addLine('sb $t0, 0($a1)')
    self._addLine('beq $t0, $zero, copy_loop_end')
    self._addLine('addi $a0, $a0, 1')
    self._addLine('addi $a1, $a1, 1')
    self._addLine('j copy_loop')
    self._addLine('copy_loop_end:')
    self._addLine('jr $ra')

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

  def _addNewline(self):
    self._addLine(f'la $a0, NEWLN')
    self._syscall(SysCallsEnum.PRINT_STRING)

  def _loadStr(self, string: str, address: str):
    if len(string) > 128:
      raise Exception('String size too large!')
    
    self._addLine(f'la $t0, {STR_BUFFER_ADDR}')

    for i in range(0, len(string)):
      self._addLine(f"li $t1, '{string[i]}'")
      self._addLine(f'sb $t1 {i}($t0)')
    self._addLine(f"li $t1, 0")
    self._addLine(f'sb $t1 {len(string)}($t0)')

  def _copyStr(self, copyFromAddr, copyToAddr):
    self._addLine(f'la $a0, {copyFromAddr}')
    self._addLine(f'la $a1, {copyToAddr}')
    self._addLine('jal copy_loop')

  # Productions

  def _declarationList(self, dec_list: Node):
    for dec in dec_list.children:
      self._declaration(dec)

  def _declaration(self, dec: Node):
    type = dec.children[0].value
    var_name = dec.children[1].value
    
    if (type == DataTypesEnum.STRING.value):
      self._addLine(f'stw_{var_name}: .space 128')
      self._symbolTable[var_name] = f'stw_{var_name}'
    elif (type == DataTypesEnum.NUMBER.value):
      self._addLine(f'nom_{var_name}: .word 0')
      self._symbolTable[var_name] = f'nom_{var_name}'

  def _operationList(self, opList: Node):
    for opStmt in opList.children:
      self._operationStatement(opStmt)

  def _operationStatement(self, opStmt: Node):
    type = opStmt.type

    if (type in BINARY_OPS_VAL):
      self._binaryOp(opStmt)

    elif (type == ProductionTokensEnum.ASSIGN.value):
      self._assignment(opStmt)

    elif (type == ProductionTokensEnum.INPUT.value):
      self._input(opStmt)

    elif (type == ProductionTokensEnum.OUTPUT.value):
      self._output(opStmt)
  
  def _expression(self, exp: Node):
    if exp.type in BINARY_OPS_VAL:
      self._operationStatement(exp)
    else:
      self._pushStack(exp.value)

  def _binaryOp(self, opStmt: Node):
    type = opStmt.type

    for child in opStmt.children:
        self._expression(child)

    self._popStack(1)     # Pop Second Operand to $t1
    self._popStack(0)     # Pop First Operand to $t0

    if (type == ProductionTokensEnum.PLUS.value):
      self._addLine('add $t0, $t0, $t1')
    elif(type == ProductionTokensEnum.MINUS.value):
      self._addLine('sub $t0, $t0, $t1')
    elif(type == ProductionTokensEnum.TIMES.value):
      self._addLine('mul $t0, $t0, $t1')
    elif(type == ProductionTokensEnum.DIVIDE.value):
      self._addLine('div $t0, $t0, $t1')
    
    self._pushStackFromReg(0)

  def _assignment(self, asOp: Node):
    idNode = asOp.children[0]
    id = idNode.value
    idType = self._getIdType(idNode).value
    address = self._symbolTable[id]

    valueNode = asOp.children[1]

    if valueNode.type == ProductionTokensEnum.TYPE.value:
      valueType = self._getIdType(idNode).value

      if not idType == valueType:
        raise Exception(f"Assignment mismatch: {idType} and {valueNode.type}")

    if idType == DataTypesEnum.STRING.value:
      # self._comment('TODO: STRING ASSIGNMENT')
      strToLoad = valueNode.value

      self._loadStr(strToLoad, STR_BUFFER_ADDR)
      self._copyStr(STR_BUFFER_ADDR, address)

    elif idType == DataTypesEnum.NUMBER.value:
      self._expression(asOp.children[1])

      self._popStack(0)
      self._addLine(f'sw $t0, {address}')

  def _input(self, inputOp: Node):
    idNode = inputOp.children[0]
    type = self._getIdType(idNode).value

    if (type == DataTypesEnum.STRING.value):
      address = self._symbolTable[idNode.value]
      self._addLine(f'la $a0, {address}')
      self._addLine(f'li $a1, {STRING_BUFFER_LENGTH}')
      self._syscall(SysCallsEnum.READ_STRING)
      # self._addNewline()
      
    elif (type == DataTypesEnum.NUMBER.value):
      self._syscall(SysCallsEnum.READ_INT)
      self._addLine(f'sw $v0, {self._symbolTable[idNode.value]}')

  def _output(self, outputOp: Node):

    valueNode = outputOp.children[0]

    if valueNode.type == ProductionTokensEnum.STRING.value:
      self._loadStr(valueNode.value, STR_BUFFER_ADDR)
      self._addLine(f'la $a0, {STR_BUFFER_ADDR}')
      self._syscall(SysCallsEnum.PRINT_STRING)

    elif valueNode.type == ProductionTokensEnum.ID.value:

      if self._getIdType(valueNode) == DataTypesEnum.STRING:
        self._addLine(f'la $a0, {self._symbolTable[valueNode.value]}')
        self._syscall(SysCallsEnum.PRINT_STRING)

      elif self._getIdType(valueNode) == DataTypesEnum.NUMBER:
        self._addLine(f'lw $a0, {self._symbolTable[valueNode.value]}')
        self._syscall(SysCallsEnum.PRINT_INT)

    elif valueNode.type == ProductionTokensEnum.NUMBER.value or valueNode.type in BINARY_OPS_VAL:
      self._expression(valueNode)
      self._popStack(0)
      self._addLine('move $a0, $t0')
      self._syscall(SysCallsEnum.PRINT_INT)

    self._addNewline()