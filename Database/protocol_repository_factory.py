from tcp_repository import TcpRepository
from udp_repository import UdpRepository
from tcp_reverse_repository import TcpReverseRepository
from udp_reverse_repository import UdpReverseRepository

class ProtocolRepositoryFactory:

    UDP = 'udp'
    UDP_R = 'udp_reverse'
    TCP = 'tcp'
    TCP_R = 'tcp_reverse'

    def __init__(self):
        pass

    def get_repository(self, transport_layer_protocol, reversed_transmission_direction):
        return self.get_repository_by_type(self.get_repository_type(transport_layer_protocol, reversed_transmission_direction))

    def get_repository_by_type(self, repository_type):
        if repository_type == ProtocolRepositoryFactory.UDP:
            return UdpRepository()
        elif repository_type == ProtocolRepositoryFactory.UDP_R:
            return UdpReverseRepository()
        elif repository_type == ProtocolRepositoryFactory.TCP:
            return TcpRepository()
        elif repository_type == ProtocolRepositoryFactory.TCP_R:
            return TcpReverseRepository()
        else:
            raise Exception('No such type of repository')

    def get_repository_type(self, transport_layer_protocol, reversed_transmission_direction):
        repository_type = None
        if transport_layer_protocol == 'udp':
            if reversed_transmission_direction:
                repository_type = ProtocolRepositoryFactory.UDP_R
            else:
                repository_type = ProtocolRepositoryFactory.UDP
        elif transport_layer_protocol == 'tcp':
            if reversed_transmission_direction:
                repository_type = ProtocolRepositoryFactory.TCP_R
            else:
                repository_type = ProtocolRepositoryFactory.TCP

        return repository_type