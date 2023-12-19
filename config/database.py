from pymongo import MongoClient
from decouple import config

class DatabaseConnection:
    _instance = None

    @staticmethod
    def get_instance():
        if DatabaseConnection._instance is None:
            DatabaseConnection._instance = MongoClient(config('MONGO_URI'))
        return DatabaseConnection._instance

# To use the singleton instance
db_instance = DatabaseConnection.get_instance()
db = db_instance.shax
user_collection = db['users']
group_collection = db['groups']

user_collection.create_index([("email", 1), ("username", 1)], unique=True)