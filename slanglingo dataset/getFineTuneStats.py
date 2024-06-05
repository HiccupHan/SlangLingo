# Import required libraries
from dotenv import load_dotenv
import openai
import csv
import os

# Load environment variables
load_dotenv('.env')
openai.api_key = os.getenv("OPENAI_API_KEY")

# Function to query the fine-tuning job
def get_fine_tuning_job(job_id):
    response = openai.fine_tuning.jobs.retrieve(job_id)
    return response

# Function to download the result file
def download_result_file(file_id):
    response = openai.files.content(file_id)
    return response.read().decode("utf-8")

# Function to write metrics to a CSV file
def write_metrics_to_csv(csv_content, output_file):
    reader = csv.DictReader(csv_content.splitlines())
    
    # Open the output CSV file for writing
    with open(output_file, mode='w', newline='') as file:
        writer = csv.writer(file)
        
        # Write the header
        writer.writerow(['step', 'train_loss', 'train_accuracy', 'valid_loss', 'valid_mean_token_accuracy'])
        
        # Write the rows
        for row in reader:
            writer.writerow([row['step'], row['train_loss'], row['train_accuracy'], row['valid_loss'], row['valid_mean_token_accuracy']])

# Example usage
def main():
    job_id = 'ftjob-nZANpBsen0OAPoY4bbeZrxtW'  # Replace with your fine-tuning job ID
    output_file = 'output_file.csv'  # Replace with your desired output file name

    # Step 1: Get the fine-tuning job details
    job_details = get_fine_tuning_job(job_id)

    # Step 2: Extract the result file ID
    result_files = job_details.result_files
    # Step 3: Retrieve the content of the results CSV file
    csv_content = download_result_file(result_files[0])

    # Step 4: Write the metrics to a CSV file
    write_metrics_to_csv(csv_content, output_file)

    #     print(f"Metrics have been written to {output_file}")
    # else:
    #     print("No result files found for this fine-tuning job.")

if __name__ == "__main__":
    main()