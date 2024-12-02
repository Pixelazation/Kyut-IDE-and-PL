from enum import Enum

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
    DEC_LIST = 'DECLARATION LIST'
    OP_LIST = 'OPERATION LIST'
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