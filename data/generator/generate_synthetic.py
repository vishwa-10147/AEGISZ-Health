"""Generate synthetic FHIR data."""
import random
import json

def generate_data(seed: int = 42):
    random.seed(seed)
    print("Generating data...")
