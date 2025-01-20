import os

def find_and_print_astro_files(repo_path, output_file):
    """
    Iterates through a repository, finds all .astro files, and prints
    their contents to a markdown file.

    Args:
        repo_path (str): The path to the repository.
        output_file (str): The path to the output markdown file.
    """

    with open(output_file, 'w', encoding='utf-8') as md_file:
        for root, _, files in os.walk(repo_path):
            for file in files:
                if file.endswith(".astro"):
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, repo_path)
                    
                    md_file.write(f"{relative_path}:\n")
                    md_file.write("```\n")
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            file_contents = f.read()
                            md_file.write(file_contents)
                    except Exception as e:
                        md_file.write(f"Error reading file: {e}\n")
                    md_file.write("```\n\n")
    print(f"Successfully processed .astro files and wrote to: {output_file}")

if __name__ == "__main__":
    repo_path = "."  # Replace with your repository path, or use "." for current directory
    output_file = "astro_file_contents.md"
    find_and_print_astro_files(repo_path, output_file)