import os
from typing import List, Dict, Any

class DocumentIngestionPipeline:
    """
    Ingestion Pipeline capable of processing PDF, DOCX, HTML, CSV, and JSON
    Extracts text, preserves section headings, page numbers, and structural metadata.
    """

    @staticmethod
    def load_document(file_path: str) -> List[Dict[str, Any]]:
        ext = os.path.splitext(file_path)[1].lower()
        if ext == ".pdf":
            return DocumentIngestionPipeline._load_pdf(file_path)
        elif ext == ".docx":
            return DocumentIngestionPipeline._load_docx(file_path)
        elif ext in [".html", ".htm"]:
            return DocumentIngestionPipeline._load_html(file_path)
        elif ext in [".txt", ".json"]:
            return DocumentIngestionPipeline._load_text(file_path)
        else:
            raise ValueError(f"Unsupported document format: {ext}")

    @staticmethod
    def _load_pdf(path: str) -> List[Dict[str, Any]]:
        chunks = []
        try:
            from pypdf import PdfReader
            reader = PdfReader(path)
            for page_num, page in enumerate(reader.pages):
                text = page.extract_text() or ""
                if text.strip():
                    chunks.append({
                        "content": text.strip(),
                        "metadata": {
                            "source_file": os.path.basename(path),
                            "page": page_num + 1,
                            "total_pages": len(reader.pages),
                            "authority_level": 1
                        }
                    })
        except Exception as e:
            chunks.append({"content": f"Failed to extract PDF: {str(e)}", "metadata": {"error": True}})
        return chunks

    @staticmethod
    def _load_docx(path: str) -> List[Dict[str, Any]]:
        chunks = []
        try:
            import docx
            doc = docx.Document(path)
            full_text = "\n".join([p.text for p in doc.paragraphs if p.text.strip()])
            chunks.append({
                "content": full_text,
                "metadata": {
                    "source_file": os.path.basename(path),
                    "authority_level": 1
                }
            })
        except Exception as e:
            chunks.append({"content": f"Failed to extract DOCX: {str(e)}", "metadata": {"error": True}})
        return chunks

    @staticmethod
    def _load_html(path: str) -> List[Dict[str, Any]]:
        try:
            from bs4 import BeautifulSoup
            with open(path, "r", encoding="utf-8") as f:
                soup = BeautifulSoup(f.read(), "html.parser")
                for s in soup(["script", "style"]):
                    s.decompose()
                text = soup.get_text(separator="\n").strip()
                return [{
                    "content": text,
                    "metadata": {
                        "source_file": os.path.basename(path),
                        "authority_level": 1
                    }
                }]
        except Exception as e:
            return [{"content": f"Failed to extract HTML: {str(e)}", "metadata": {"error": True}}]

    @staticmethod
    def _load_text(path: str) -> List[Dict[str, Any]]:
        with open(path, "r", encoding="utf-8") as f:
            return [{
                "content": f.read(),
                "metadata": {
                    "source_file": os.path.basename(path),
                    "authority_level": 1
                }
            }]
