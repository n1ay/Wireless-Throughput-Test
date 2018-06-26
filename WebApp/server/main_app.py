from flask import Flask, render_template, request
import sys
sys.path.append('../../WirelessThroughputTest/')
sys.path.append('../../Database')
from main import *
from utils import *
from mongodb_encoder import MongoDBEncoder
import json

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

def get_hello():
	greeting_list = ['Ciao', 'Hei', 'Salut', 'Hola', 'Hallo', 'Hej']
	return random.choice(greeting_list)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/tests/get", methods=["GET"])
def get_all_tests():
    test_repository = TestInstanceRepository();
    data = json.dumps(test_repository.get_all(), cls=MongoDBEncoder)
    return app.response_class(
            response = data,
            status = 200,
            mimetype = 'application/json',
        )

@app.route("/run", methods=["POST"])
def run_test():
    input_args = get_test_params(request)
    data = json.dumps(run_tests(input_args), cls=MongoDBEncoder)
    return app.response_class(
        response = data,
        status = 200,
        mimetype = 'application/json',
    )

@app.route("/tcp/test/<test_id>", methods=["GET"])
def get_tcp_by_test_id(test_id):
    tcp_repository = ProtocolRepositoryFactory().get_repository_by_type(ProtocolRepositoryFactory.TCP);
    data = json.dumps(tcp_repository.get_all_by_test_id(test_id), cls=MongoDBEncoder)
    return app.response_class(
        response = data,
        status = 200,
        mimetype = 'application/json',
    )
@app.route("/udp/test/<test_id>", methods=["GET"])
def get_udp_by_test_id(test_id):
    udp_repository = ProtocolRepositoryFactory().get_repository_by_type(ProtocolRepositoryFactory.UDP);
    data = json.dumps(udp_repository.get_all_by_test_id(test_id), cls=MongoDBEncoder)
    return app.response_class(
        response = data,
        status = 200,
        mimetype = 'application/json',
    )

@app.route("/tcp_reverse/test/<test_id>", methods=["GET"])
def get_tcp_reverse_by_test_id(test_id):
    tcp_reverse_repository = ProtocolRepositoryFactory().get_repository_by_type(ProtocolRepositoryFactory.TCP_R);
    data = json.dumps(tcp_reverse_repository.get_all_by_test_id(test_id), cls=MongoDBEncoder)
    return app.response_class(
        response = data,
        status = 200,
        mimetype = 'application/json',
    )

@app.route("/udp_reverse/test/<test_id>", methods=["GET"])
def get_udp_reverse_by_test_id(test_id):
    udp_reverse_repository = ProtocolRepositoryFactory().get_repository_by_type(ProtocolRepositoryFactory.UDP_R);
    data = json.dumps(udp_reverse_repository.get_all_by_test_id(test_id), cls=MongoDBEncoder)
    return app.response_class(
        response = data,
        status = 200,
        mimetype = 'application/json',
    )

def get_test_params(request):
    ip = request.form['ip_address']
    transport_layer_protocol = request.form['protocol']
    time_per_test = request.form['time']
    reversed_transmission_direction = bool_from_text(request.form['reversed'])
    store_in_db = bool_from_text(request.form['store_in_db'])
    buffer_length = transport_layer_protocol == 'udp' or bool_from_text(request.form['buffer_length'])
    window_size = not (transport_layer_protocol == 'udp') and bool_from_text(request.form['window_size'])
    maximum_segment_size = not (transport_layer_protocol == 'udp') and bool_from_text(request.form['maximum_segment_size'])

    return (ip, transport_layer_protocol, time_per_test, reversed_transmission_direction, store_in_db,
            buffer_length, window_size, maximum_segment_size)


if __name__ == "__main__":
    app.run()
