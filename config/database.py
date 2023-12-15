from pymongo import MongoClient

from pymongo import MongoClient

class DatabaseConnection:
    _instance = None

    @staticmethod
    def get_instance():
        if DatabaseConnection._instance is None:
            DatabaseConnection._instance = MongoClient("mongodb+srv://Octivion:rk220101@cluster0.7euyxep.mongodb.net")
        return DatabaseConnection._instance

# To use the singleton instance
db_instance = DatabaseConnection.get_instance()
db = db_instance.shax
user_collection = db['users']
group_collection = db['groups']
