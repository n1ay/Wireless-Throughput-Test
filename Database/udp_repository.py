from protocol_repository import ProtocolRepository
from db_config import *

class UdpRepository(ProtocolRepository):
    def __init__(self):
        super().__init__()
        self.collection = db_udp_collection
