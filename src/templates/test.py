from google.cloud import storage, functions_v1, bigquery
from helpers import delete_files, invoke_functions, run_bigquery_jobs

def main(request):
    # Eliminar archivos de las carpetas CSVs, recorridos y unzipped
    delete_files('buket-transporte', 'CSVs/')
    delete_files('buket-transporte', 'recorridos/')
    delete_files('buket-transporte', 'unzipped/')

    # Invocar funciones en orden
    function_names = [
        'https://southamerica-west1-tough-zoo-369405.cloudfunctions.net/funcion-api-red',
        'https://southamerica-west1-tough-zoo-369405.cloudfunctions.net/function-historica',
        'https://southamerica-west1-tough-zoo-369405.cloudfunctions.net/function-historica-2'
    ]
    invoke_functions(function_names)

    # Ejecutar jobs de BigQuery y enviar a Looker
    run_bigquery_jobs()

    return 'Proceso completado'

--*helpers.py*:

from google.cloud import storage, functions_v1, bigquery
import time

from google.api_core.exceptions import GoogleAPICallError, NotFound

def delete_files(bucket_name, prefix):
    client = storage.Client()
    bucket = client.bucket(bucket_name)
    try:
        blobs = bucket.list_blobs(prefix=prefix)
        for blob in blobs:
            blob.delete()
    except NotFound:
        print(f"No se encontraron archivos en {prefix}")
    except Exception as e:
        print(f"Error al eliminar archivos: {e}")

def invoke_functions(function_names):
    client = functions_v1.CloudFunctionsServiceClient()
    for name in function_names:
        try:
            # Asume que name es la URL completa para la invocación de la función
            response = client.call_function(name)
            print(f"Respuesta de la función {name}: {response}")
            time.sleep(10)
        except GoogleAPICallError as e:
            print(f"Error al invocar la función {name}: {e}")

import logging

logging.basicConfig(level=logging.INFO)

def run_bigquery_jobs():
    client = bigquery.Client()
    query = """WITH TiemposPromedio AS (
        SELECT
            st.stop_id,
            AVG(
                EXTRACT(HOUR FROM st.departure_time) * 60 + EXTRACT(MINUTE FROM st.departure_time)
                - (EXTRACT(HOUR FROM st.arrival_time) * 60 + EXTRACT(MINUTE FROM st.arrival_time))
            ) AS tiempo_promedio_minutos
        FROM
            tough-zoo-369405.transporte_publico.stop_times st
        JOIN
            tough-zoo-369405.transporte_publico.trips t ON st.trip_id = t.trip_id
        GROUP BY
            st.stop_id
    )
    SELECT
        s.stop_id,
        s.stop_name,
        s.stop_name AS paradero,
        CONCAT(CAST(s.stop_lat AS STRING), ',', CAST(s.stop_lon AS STRING)) AS location,
        r.route_short_name AS buses,
        tp.tiempo_promedio_minutos
    FROM
        tough-zoo-369405.transporte_publico.stops s
    JOIN
        tough-zoo-369405.transporte_publico.stop_times st ON s.stop_id = st.stop_id
    JOIN
        tough-zoo-369405.transporte_publico.trips t ON st.trip_id = t.trip_id
    JOIN
        tough-zoo-369405.transporte_publico.routes r ON CAST(t.route_id AS STRING) = CAST(r.route_id AS STRING)
    LEFT JOIN
        TiemposPromedio tp ON s.stop_id = tp.stop_id
    GROUP BY
        s.stop_id, s.stop_name, s.stop_lat, s.stop_lon, r.route_short_name, tp.tiempo_promedio_minutos
    ORDER BY
        s.stop_name;"""
    try:
        job = client.query(query)
        results = job.result()
        logging.info("Consulta ejecutada correctamente y resultados obtenidos")
    except Exception as e:
        logging.error(f"Error al ejecutar la consulta: {e}")

