import warnings
warnings.filterwarnings('ignore')
import numpy as np
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask import Flask, request, jsonify
import sys
import json

# Cargar top40_idx como antes
top40_idx = np.load('backend/top40_idx.npy')

# Conectar a MongoDB
client = MongoClient("mongodb+srv://sebaxdenc:DDUqIOcxw0DRhLEL@ppmagneto.1oatsme.mongodb.net/?appName=PPMagneto")
db = client['magneto']
collection = db['jobs_excel']

def get_recommendations(title):
    doc = collection.find_one({'title': title})
    if not doc or 'idx' not in doc:
        return {'error': 'Vacante no encontrada o sin campo idx'}

    idx = doc['idx']
    score = top40_idx[idx]
    indices = score[1:6]

    recommendations = []
    for x in indices:
        similar_doc = collection.find_one({'idx': int(x)})
        if similar_doc:
            recommendations.append({
                'title': similar_doc['title'],
                'empresa': similar_doc['empresa'],
                'city': similar_doc['city'],
                'description': similar_doc['description'],
                'experience_education': similar_doc['experience_education'],
                'salary': similar_doc['salary'],
                'key_words': similar_doc['key_words'],
            })

    return recommendations

if __name__ == '__main__':
    # Leer el título desde los argumentos de la línea de comandos
    title = sys.argv[1]
    recommendations = get_recommendations(title)
    print(json.dumps(recommendations))  # Imprimir las recomendaciones como JSON

