import zipfile
import xml.etree.ElementTree as ET
import sys
import codecs

def extract_text(docx_file):
    try:
        with zipfile.ZipFile(docx_file) as docx:
            xml_content = docx.read('word/document.xml')
            tree = ET.XML(xml_content)
            
            content = []
            for paragraph in tree.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}p'):
                texts = [node.text
                         for node in paragraph.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t')
                         if node.text]
                if texts:
                    content.append(''.join(texts))
            return '\n'.join(content)
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    # Force utf-8 stdout encoding for powershell
    sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())
    print(extract_text("VOID-estrategia-marketing-drop04.docx"))
