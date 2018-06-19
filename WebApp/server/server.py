from flask import Flask, render_template
import sys
sys.path.append('../../WirelessThroughputTest/')
sys.path.append('../../Database')
from main import *

import random

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

def get_hello():
	greeting_list = ['Ciao', 'Hei', 'Salut', 'Hola', 'Hallo', 'Hej']
	return random.choice(greeting_list)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/hello")
def hello():
    return get_hello()

@app.route("/run")
def run_test():
    parser = build_parser()
    command_builder(parser)
    return 'lul'

if __name__ == "__main__":
    app.run()
