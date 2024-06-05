import csv
import json

def csv_to_jsonl(csv_file_path, jsonl_file_path, mode):
    with open(csv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file)
        
        with open(jsonl_file_path, mode=mode, encoding='utf-8') as jsonl_file:
            for row in csv_reader:
                # Convert each row to a JSON object
                row = {key: value.strip('"') for key, value in row.items()}
                json_object = {
                "messages" : [
                    {"role": "system", "content": "Here are sentences in English that may contain slang terms.\nFind all slang terms if they exist, list each out on its own line followed by a dash and the definition for the slang, with a single header \"contains slangs:\".\nIf no slangs are found, output \"does not contain any slangs\""},
                    {"role": "user", "content": row["Example"]},
                    {"role": "assistant", "content": "contains slangs:\n" + row["Slang term"] + " - " + row["Definition"]},
                ]    
                }
                # Write the JSON object to the JSONL file
                jsonl_file.write(json.dumps(json_object) + '\n')


def tsv_to_jsonl(tsv_file_path, jsonl_file_path, mode):
    with open(tsv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter='\t')
        
        with open(jsonl_file_path, mode=mode, encoding='utf-8') as jsonl_file:
            row_cnt = 0
            for row in csv_reader:
                if (row["DEFINITION_SENTENCE"] == ""):
                    continue
                if row_cnt > 800:
                    break
                # Convert each row to a JSON object
                json_object = {
                "messages" : [
                    {"role": "system", "content": "Here are sentences in English that may contain slang terms.\nFind all slang terms if they exist, list each out on its own line followed by a dash and the definition for the slang, with a single header \"contains slangs:\".\nIf no slangs are found, output \"does not contain any slangs\""},
                    {"role": "user", "content": row["SENTENCE"]},
                    {"role": "assistant", "content": "contains slangs:\n" + row["SLANG_TERM"] + " - " + row["DEFINITION_SENTENCE"]},
                ]    
                }
                # Write the JSON object to the JSONL file
                jsonl_file.write(json.dumps(json_object) + '\n')
                row_cnt+=1

def tsv_to_jsonl_neg(tsv_file_path, jsonl_file_path, mode):
    with open(tsv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter='\t')
        
        with open(jsonl_file_path, mode=mode, encoding='utf-8') as jsonl_file:
            row_cnt = 0
            for row in csv_reader:
                if row_cnt > 500:
                    break
                # Convert each row to a JSON object
                json_object = {
                "messages" : [
                    {"role": "system", "content": "Here are sentences in English that may contain slang terms.\nFind all slang terms if they exist, list each out on its own line followed by a dash and the definition for the slang, with a single header \"contains slangs:\".\nIf no slangs are found, output \"does not contain any slangs\""},
                    {"role": "user", "content": row["SENTENCE"]},
                    {"role": "assistant", "content": "does not contain any slangs"},
                ]    
                }
                # Write the JSON object to the JSONL file
                jsonl_file.write(json.dumps(json_object) + '\n')
                row_cnt+=1

def tsv_to_jsonl_val(tsv_file_path, jsonl_file_path, mode):
    with open(tsv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter='\t')
        
        with open(jsonl_file_path, mode=mode, encoding='utf-8') as jsonl_file:
            row_cnt = 0
            for row in csv_reader:
                if (row["DEFINITION_SENTENCE"] == "" or row["SENTENCE"] == "" or row["SLANG_TERM"] == ""):
                    continue
                if row_cnt < 800:
                    row_cnt+=1
                    continue
                if row_cnt > 1000:
                    break
                # Convert each row to a JSON object
                json_object = {
                "messages" : [
                    {"role": "system", "content": "Here are sentences in English that may contain slang terms.\nFind all slang terms if they exist, list each out on its own line followed by a dash and the definition for the slang, with a single header \"contains slangs:\".\nIf no slangs are found, output \"does not contain any slangs\""},
                    {"role": "user", "content": row["SENTENCE"]},
                    {"role": "assistant", "content": "contains slangs:\n" + row["SLANG_TERM"] + " - " + row["DEFINITION_SENTENCE"]},
                ]    
                }
                # Write the JSON object to the JSONL file
                jsonl_file.write(json.dumps(json_object) + '\n')
                row_cnt+=1

def tsv_to_jsonl_neg_val(tsv_file_path, jsonl_file_path, mode):
    with open(tsv_file_path, mode='r', encoding='utf-8') as csv_file:
        csv_reader = csv.DictReader(csv_file, delimiter='\t')
        
        with open(jsonl_file_path, mode=mode, encoding='utf-8') as jsonl_file:
            row_cnt = 0
            for row in csv_reader:
                if row_cnt < 500:
                    row_cnt+=1
                    continue
                if row_cnt > 601:
                    break
                # Convert each row to a JSON object
                json_object = {
                "messages" : [
                    {"role": "system", "content": "Here are sentences in English that may contain slang terms.\nFind all slang terms if they exist, list each out on its own line followed by a dash and the definition for the slang, with a single header \"contains slangs:\".\nIf no slangs are found, output \"does not contain any slangs\""},
                    {"role": "user", "content": row["SENTENCE"]},
                    {"role": "assistant", "content": "does not contain any slangs"},
                ]    
                }
                # Write the JSON object to the JSONL file
                jsonl_file.write(json.dumps(json_object) + '\n')
                row_cnt+=1

# Example usage
csv_file_path1 = 'List_of_Generation_Z_slang_1.csv'
csv_file_path2 = 'List_of_Boomer_slang_1.csv'
csv_file_path3 = 'genz_slang.csv'
tsv_file_path = 'slang_OpenSub.tsv'
tsv_neg_file_path = 'slang_OpenSub_negatives.tsv'
jsonl_file_path = 'genz_slang_terms.jsonl'
val_jsonl_file_path = 'genz_slang_terms_val.jsonl'
csv_to_jsonl(csv_file_path1, jsonl_file_path, 'w')
csv_to_jsonl(csv_file_path2, jsonl_file_path, 'a')
tsv_to_jsonl(tsv_file_path, jsonl_file_path, 'a')
tsv_to_jsonl_neg(tsv_neg_file_path, jsonl_file_path, 'a')
csv_to_jsonl(csv_file_path3, jsonl_file_path, 'a')
tsv_to_jsonl_val(tsv_file_path, val_jsonl_file_path, 'w')
tsv_to_jsonl_neg_val(tsv_neg_file_path, val_jsonl_file_path, 'a')


