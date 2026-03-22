import sys
import os

# Ensure the backend directory is in the Python path
sys.path.insert(0, os.path.dirname(__file__))

from server import app
from a2wsgi import ASGIMiddleware

# Phusion Passenger expects a WSGI callable named 'application'
# a2wsgi bridges FastAPI (ASGI) to Passenger (WSGI)
application = ASGIMiddleware(app)
