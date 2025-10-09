"""ASGI config for Nafila Shop project."""
import os
from django.core.asgi import get_asgi_application

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nafila_shop.settings")

application = get_asgi_application()
