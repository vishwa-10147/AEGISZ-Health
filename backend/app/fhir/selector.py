from typing import List, Dict, Any

class ResourceSelector:
    @staticmethod
    def filter_authorized(resources: List[Dict[str, Any]], allowed_types: List[str]) -> List[Dict[str, Any]]:
        """
        Filters a list of FHIR resources, returning only those whose resourceType
        is in the allowed_types list. This strictly enforces data minimization.
        """
        return [r for r in resources if r.get("resourceType") in allowed_types]
