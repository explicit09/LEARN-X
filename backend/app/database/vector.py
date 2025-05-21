from sqlalchemy.types import UserDefinedType
import numpy as np
from typing import Optional, List, Any, cast
import logging

class Vector(UserDefinedType):
    """Postgres vector type for SQLAlchemy with Neon compatibility"""
    
    def __init__(self, dim: int):
        self.dim = dim
    
    def get_col_spec(self, **kw: Any) -> str:
        return f"vector({self.dim})"  # Lowercase for Neon compatibility
    
    def bind_processor(self, dialect):
        def process(value: Optional[List[float]]):
            if value is None:
                return None
            try:
                # Convert to a string representation that works with pgvector
                return f"[{','.join(str(float(x)) for x in value)}]"
            except (TypeError, ValueError) as e:
                logging.error(f"Error processing vector value: {e}")
                return None
        return process
    
    def result_processor(self, dialect, coltype):
        def process(value):
            if value is None:
                return None
            try:
                # Handle different string formats that might come from the database
                if isinstance(value, str):
                    # Remove any surrounding brackets and split by comma
                    value = value.strip('[]{}()')
                    values = [float(x) for x in value.split(',') if x.strip()]
                    return np.array(values, dtype=np.float32)
                elif isinstance(value, (list, np.ndarray)):
                    return np.array(value, dtype=np.float32)
                return None
            except Exception as e:
                logging.error(f"Error converting vector result: {e}")
                return None
        return process
    
    def adapt(self, impltype, **kw):
        # Ensure proper type adaptation for different SQLAlchemy versions
        return impltype(self.dim)
