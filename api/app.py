from os import getenv

from main import create_app
from config import config_selector

app = create_app()
configs = config_selector[getenv("FLASK_ENV")]

if __name__ == "__main__":
    # ligne ajoutée par rapport à Heroku qui affecte un numéro de port aléatoire
    port = int(getenv("PORT", configs.FLASK_RUN_PORT))
    app.run(host=configs.FLASK_RUN_HOST, port=port, debug=configs.DEBUG)
