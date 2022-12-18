from os import getenv

port = getenv("PORT", getenv("FLASK_RUN_PORT", 5000))
bind = f"0.0.0.0:{port}"
workers = 4
threads = 4
timeout = 120
