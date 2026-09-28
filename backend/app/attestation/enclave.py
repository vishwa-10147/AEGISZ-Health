import inspect
import functools
import hashlib
from typing import Callable, Any
from app.attestation.provider import ConfidentialExecutionProvider
from app.config import settings

class SecureExecutionWrapper:
    """
    Decorator to simulate running a sensitive function inside a Secure Enclave.
    """
    @staticmethod
    def execute_in_enclave(func: Callable) -> Callable:
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            if settings.SECURE_EXECUTION_MODE != "simulated":
                raise NotImplementedError("Only simulated secure execution is available in local dev.")
            
            # 1. Measure the function (simulate code measurement)
            source_code = inspect.getsource(func)
            workload_hash = hashlib.sha256(source_code.encode()).hexdigest()
            
            # 2. Get Attestation Quote
            quote = ConfidentialExecutionProvider.get_hardware_quote(workload_hash)
            
            # 3. Execute the actual function securely
            result = func(*args, **kwargs)
            
            # 4. Return result alongside attestation
            return {
                "result": result,
                "attestation_quote": quote
            }
        return wrapper
