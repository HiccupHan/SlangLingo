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
        
client.files.create(
  file=open("genz_slang_terms.jsonl", "rb"),
  purpose="fine-tune"
)

client.files.create(
  file=open("genz_slang_terms_val.jsonl", "rb"),
  purpose="fine-tune"
)