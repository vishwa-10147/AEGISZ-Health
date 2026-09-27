"""FHIR Resource Selector."""

class ResourceSelector:
    def select_by_type(self, resources: list, resource_type: str) -> list:
        return []

    def filter_authorized(self, resources: list, policy) -> list:
        return []
