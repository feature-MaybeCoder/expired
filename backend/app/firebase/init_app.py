import firebase_admin
from firebase_admin import credentials


def init_firebase_app(cert: dict) -> None:
    creds = credentials.Certificate(cert=cert)
    firebase_admin.initialize_app(creds)
