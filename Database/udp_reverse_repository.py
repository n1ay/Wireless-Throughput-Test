from protocol_repository import ProtocolRepository
from db_config import *

class UdpReverseRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = db_udp_reverse_collection
