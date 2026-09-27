from typing import Any, Dict, List

class HospitalBDataLayer:
    def get_patient(self, patient_id: str) -> Dict[str, Any]:
        """Get patient by ID."""
        pass

    def get_resources(self, patient_id: str, resource_types: List[str]) -> List[Dict[str, Any]]:
        """Get specific resources for a patient."""
        pass

    def select_authorized_resources(self, patient_id: str, policy: Dict[str, Any]) -> List[Dict[str, Any]]:
        """Get resources authorized by policy."""
        pass
