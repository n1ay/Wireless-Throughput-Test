from protocol_repository import ProtocolRepository

class TcpRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = 'tcp'