from sqlalchemy.types import TypeDecorator, UserDefinedType
import numpy as np
from typing import Optional, List, Any, cast

class Vector(UserDefinedType):
    """Postgres vector type for SQLAlchemy"""
    
    def __init__(self, dim: int):
        self.dim = dim
    
    def get_col_spec(self, **kw: Any) -> str:
        return f"VECTOR({self.dim})"
    
    def bind_processor(self, dialect):
        def process(value: Optional[List[float]]):
            if value is None:
                return None
            return f"[{','.join(str(x) for x in value)}]"
        return process
    
    def result_processor(self, dialect, coltype):
        def process(value):
            if value is None:
                return None
            # Remove brackets and convert to numpy array
            return np.array(eval(value))
        return process
