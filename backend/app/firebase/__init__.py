"""
A module with firebase communication.
"""

from .auth import FirebaseAuthIntegration
from .init_app import init_firebase_app

firebase_auth_integration = FirebaseAuthIntegration()
