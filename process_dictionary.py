import os

input_path = "pn.csv.m3.120408.trim"
output_dir = "lib/data"
output_path = os.path.join(output_dir, "pn.csv.m3.120408.trim")

print(f"Processing {input_path} -> {output_path}")

if not os.path.exists(output_dir):
    os.makedirs(output_dir)
    print(f"Created directory {output_dir}")

try:
    with open(input_path, "r", encoding="utf-8") as f_in:
        lines = f_in.readlines()
        
    print(f"Read {len(lines)} lines.")

    filtered_count = 0
    with open(output_path, "w", encoding="utf-8") as f_out:
        for line in lines:
            parts = line.split("\t")
            if len(parts) > 1 and parts[1].strip() == "e":
                continue # Skip neutral
            f_out.write(line)
            filtered_count += 1

    print(f"Wrote {filtered_count} lines to {output_path}.")
    
    # Remove original to complete the "move" logic
    os.remove(input_path)
    print("Removed original file.")

except Exception as e:
    print(f"Error: {e}")
    exit(1)
