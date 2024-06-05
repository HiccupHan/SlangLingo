from pathlib import Path
import os
import openai
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv('.env')

client = OpenAI(
    # This is the default and can be omitted
    api_key=os.environ.get("OPENAI_API_KEY"),
)
        
client.fine_tuning.jobs.create(
  training_file="file-CLCIgHlbVv3HxmNq283oeZgY",
  validation_file="file-WWZD1TU9RkFL4eJbUBka29y5",
  model="gpt-3.5-turbo"
)