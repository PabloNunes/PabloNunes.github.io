import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]


def test_blocks_json_valid():
    data = json.loads((ROOT / 'static' / 'blocks.json').read_text())
    assert isinstance(data, list)
    assert any(block.get('name') == 'Projects' for block in data)


def test_index_contains_container():
    html = (ROOT / 'index.html').read_text()
    assert re.search(r'id="blocks-container"', html)
