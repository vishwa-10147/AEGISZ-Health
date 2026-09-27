"""Script to train Isolation Forest model on access pattern data."""
import numpy as np
from sklearn.ensemble import IsolationForest
import joblib

def train_model(data):
    model = IsolationForest(contamination=0.1, random_state=42)
    model.fit(data)
    joblib.dump(model, "anomaly_model.pkl")
