import os
import time

from fastapi import FastAPI, Request, Response
from sse_starlette import EventSourceResponse
from sh import tail

from fuzzy_match_helper import create_ocr_matched_df, create_select_voter_records
from ocr_helper import create_ocr_df, log_filename
from settings.settings_repo import config
from utils import logger
from routers import file
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(root_path="/api")
app.state.voter_records_df = None

origins = [
    "http://localhost",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(file.router)

@app.post("/ocr", tags=["OCR"])
def ocr(response: Response):
    """
    Triggers the OCR process on the uploaded petition signatures PDF file.
    """
    if not os.path.exists('temp/ballot.pdf'):
        logger.error("No PDF file found for petition signatures")
        response.status_code = 400
        return {"error": "No PDF file found for petition signatures"}
    if app.state.voter_records_df is None:
        logger.error("No voter records file found")
        response.status_code = 400
        return {"error": "No voter records file found"}
    logger.info("Starting OCR processing...")
    # Process files if in processing state
    logger.info("Converting PDF to images...")
    
    ocr_df = create_ocr_df(filedir='temp', 
                            filename='ballot.pdf')
    
    logger.info("Compiling Voter Record Data...")

    select_voter_records = create_select_voter_records(app.state.voter_records_df)
    
    logger.info("Matching petition signatures to voter records...")

    ocr_matched_df = create_ocr_matched_df(
        ocr_df, 
        select_voter_records, 
        threshold=config['BASE_THRESHOLD']
    )
    response.headers['Content-Disposition'] = 'attachment; filename=ocr_matched.csv'
    response.headers['Content-Type'] = 'text/csv'
    return ocr_matched_df.to_csv()



# @app.get("/ocr", tags=["OCR"])
# async def stream_logs(request: Request):
#     """
#     Streams the logs for the OCR process.
#     """
#     log_file_path = f'logs/{log_filename}'
#     if not os.path.exists(log_file_path):
#         return Response(f"Log file {log_filename} not found.", media_type="text/plain")
    
#     async def logGenerator(request):
#         for line in tail("-f", log_file_path, _iter=True):
#             if await request.is_disconnected():
#                 print("client disconnected!!!")
#                 break
#             yield line
#             time.sleep(0.5)
#     event_generator = logGenerator(request)

#     return EventSourceResponse(event_generator)