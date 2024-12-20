from enum import Enum, IntEnum

class TokenTypesEnum(Enum):
    TYPE = 'TYPE'        
    KEYWORD = 'KEYWORD'             
    STRING = 'STRING'              
    END = 'END'                
    NUMBER = 'NUMBER'       
    ID = 'ID'      
    ASSIGN = 'ASSIGN'                 
    PLUS = 'PLUS'                
    MINUS = 'MINUS'                 
    TIMES = 'TIMES'                
    DIVIDE = 'DIVIDE'                 
    LPAREN = 'LPAREN'                
    RPAREN = 'RPAREN'                
    SKIP = 'SKIP'            
    NEWLINE = 'NEWLINE'                
    UNKNOWN = 'UNKNOWN'                 

class ProductionTokensEnum(Enum):
    PROGRAM = 'KYUT'
    DEC_LIST = 'DECLARATION_LIST'
    OP_LIST = 'OPERATION_LIST'
    DEC = 'DECLARATION'
    TYPE = 'TYPE' 
    OP = 'OPERATION'
    NUMBER = 'NUMBER'
    ID = 'ID'
    STRING = 'STRING'  
    ASSIGN = 'ASSIGN'                 
    PLUS = 'PLUS'                
    MINUS = 'MINUS'                 
    TIMES = 'TIMES'                
    DIVIDE = 'DIVIDE'
    INPUT = 'INPUT'
    OUTPUT = 'OUTPUT'

BINARY_OPS = [ProductionTokensEnum.PLUS, ProductionTokensEnum.MINUS, ProductionTokensEnum.TIMES, ProductionTokensEnum.DIVIDE]

class DataTypesEnum(Enum):
    NUMBER = 'nom'
    STRING = 'stwing'
    UNKNOWN = 'unknown'

class SysCallsEnum(IntEnum):
    PRINT_INT = 1
    READ_INT = 5
    PRINT_STRING = 4
    READ_STRING = 8

STRING_BUFFER_LENGTH = 128