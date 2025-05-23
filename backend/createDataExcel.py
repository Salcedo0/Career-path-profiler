import pandas as pd
from pymongo import MongoClient

# Conectar a MongoDB
client = MongoClient("mongodb+srv://sebaxdenc:DDUqIOcxw0DRhLEL@ppmagneto.1oatsme.mongodb.net/?appName=PPMagneto")
db = client['magneto']
collection = db['jobs_excel']

def usar_excel():
    # Leer las primeras 100 filas del Excel
    df = pd.read_excel(r'c:\Users\USER\Desktop\progressive_profiling_magneto\searchV1\searchV1\MagnetoGeneral2.xlsx', nrows=100)

    # Seleccionar solo las columnas necesarias (ajusta los nombres si es necesario)
    columnas_necesarias = ['title', 'empresa', 'description', 'experience_education', 'salary', 'city', 'key_words']
    df = df[columnas_necesarias]

    # Convertir DataFrame a diccionarios y limpiar NaN
    records = df.where(pd.notnull(df), None).to_dict(orient='records')

    # Insertar en MongoDB
    result = collection.insert_many(records)
    print(f"Insertados {len(result.inserted_ids)} documentos en magneto/jobs_excel")

usar_excel()