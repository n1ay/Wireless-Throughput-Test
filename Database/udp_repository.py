from protocol_repository import ProtocolRepository

class UdpRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = 'udp'