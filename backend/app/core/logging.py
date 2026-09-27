import logging
import sys
import structlog

def setup_logging(is_dev: bool = False):
    if is_dev:
        processors = [
            structlog.dev.ConsoleRenderer()
        ]
    else:
        processors = [
            structlog.processors.JSONRenderer()
        ]
        
    structlog.configure(
        processors=[
            structlog.processors.TimeStamper(fmt="iso"),
            structlog.processors.add_log_level,
        ] + processors,
        wrapper_class=structlog.make_filtering_bound_logger(logging.NOTSET),
        context_class=dict,
        logger_factory=structlog.PrintLoggerFactory(file=sys.stdout),
        cache_logger_on_first_use=True,
    )

def get_logger(name: str):
    return structlog.get_logger(name)
