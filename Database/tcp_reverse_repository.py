from protocol_repository import ProtocolRepository

class TcpReverseRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = 'tcp_reverse'