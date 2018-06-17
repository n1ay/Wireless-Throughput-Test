from protocol_repository import ProtocolRepository

class UdpReverseRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = 'udp_reverse'