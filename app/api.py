import os
from enum import Enum
from io import BytesIO

import pandas as pd
from fastapi import FastAPI, Response, UploadFile
from fuzzy_match_helper import create_ocr_matched_df, create_select_voter_records
from ocr_helper import create_ocr_df
from settings.settings_repo import config
from utils import logger

app = FastAPI()
app.state.voter_records_df = None

class UploadFileTypes(str, Enum):
    voter_records = "voter_records"
    petition_signatures = "petition_signatures"
    
@app.post("/upload/{filetype}")
def upload_file(filetype: UploadFileTypes, file: UploadFile, response: Response):
    """Uploads file to the server and saves it to a temporary directory.

    Args:
        filetype (UploadFileTypes): can be voter_records or petition_signatures
    """
    logger.info(f"Received file: {file.filename} of type: {filetype}")

    # Validate file type extension
    match filetype:
        case UploadFileTypes.petition_signatures:
            if not file.filename.endswith(".pdf"):
                response.status_code = 400
                return {"error": "Invalid file type. Only pdf files are allowed."}
            with open(os.path.join('temp', 'ballot.pdf'), "wb") as buffer:
                buffer.write(file.file.read())
                logger.info("File saved to temporary directory: temp/ballot.pdf")
        case UploadFileTypes.voter_records:
            if not file.filename.endswith(".csv"):
                response.status_code = 400
                return {"error": "Invalid file type. Only .csv files are allowed."}
            contents = file.file.read()
            buffer = BytesIO(contents)
            df = pd.read_csv(buffer, dtype=str)

            # Create necessary columns
            df['Full Name'] = df["First_Name"] + ' ' + df['Last_Name']
            df['Full Address'] = df["Street_Number"] + " " + df["Street_Name"] + " " + \
                                    df["Street_Type"] + " " + df["Street_Dir_Suffix"]

            required_columns = ["First_Name", "Last_Name", "Street_Number", 
                             "Street_Name", "Street_Type", "Street_Dir_Suffix"]
            app.state.voter_records_df = df
            
            # Verify required columns
            if not all(col in df.columns for col in required_columns):
                response.status_code = 400
                return {"error": "Missing required columns in voter records file."}


    return {"filename": file.filename}

@app.post("/ocr")
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

@app.delete("/clear")
def clear_all_files():
    """
    Delete all files
    """
    app.state.voter_records_df = None
    if os.path.exists('temp/ballot.pdf'):
        os.remove('temp/ballot.pdf')
        logger.info("Deleted all files")
    else:
        logger.warning("No files to delete")
    return {"message": "All files deleted"}
    