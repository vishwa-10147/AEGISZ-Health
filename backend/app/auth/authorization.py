import json
import os
from typing import Dict, Any, Optional
from app.models.user import User

class PolicyEngine:
    def __init__(self, policy_path: str = "../security/policies/default_policy.json"):
        # Adjust path for running from backend directory
        if not os.path.exists(policy_path):
            policy_path = "security/policies/default_policy.json"
            
        with open(policy_path, "r") as f:
            self.policies = json.load(f)

    def evaluate_access(self, user: User, target_hospital: str, resource_type: str, action: str = "read") -> bool:
        """
        Evaluate if a user is allowed to perform an action on a resource at a target hospital.
        """
        user_role = user.role.value
        
        # 1. System Admin always allowed (for emergency/override)
        if user_role == "SECURITY_ADMIN":
            return True
            
        role_policy = self.policies.get("roles", {}).get(user_role, {})
        
        # 2. Check if role can perform action
        allowed_actions = role_policy.get("allowed_actions", [])
        if action not in allowed_actions:
            return False
            
        # 3. Check hospital restrictions
        # DOCTOR can access their own hospital fully, and federated exchange for other hospitals
        if user_role == "DOCTOR":
            if user.hospital_id == target_hospital:
                return True
            # For cross-hospital, check if they can request federated exchange
            if "request_exchange" in allowed_actions:
                # We can add more strict rules here like patient consent verification
                return True
                
        # 4. Auditor can read anywhere but cannot write or request exchanges
        if user_role == "AUDITOR":
            return action == "read"
            
        return False
        
policy_engine = PolicyEngine()
