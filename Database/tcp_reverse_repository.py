from protocol_repository import ProtocolRepository
from db_config import *

class TcpReverseRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = db_tcp_reverse_collection
