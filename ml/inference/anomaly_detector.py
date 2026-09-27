"""Anomaly detector model inference."""
import joblib

class AnomalyDetectorModel:
    def __init__(self):
        self.model = None

    def load_model(self, path: str):
        self.model = joblib.load(path)

    def predict(self, features):
        return self.model.predict(features)

    def score(self, features):
        return self.model.decision_function(features)
