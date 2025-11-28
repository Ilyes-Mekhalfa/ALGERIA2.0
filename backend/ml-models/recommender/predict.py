#!/usr/bin/env python3
import sys
import json

"""
Simple prediction shim for the recommender.
Reads a JSON array of feature dicts from stdin and writes a JSON array of float scores to stdout.
This is a lightweight fallback for testing the integration. Replace with your real model later.
"""

def compute_score(f):
    # f expected to be a dict with keys used in JS fallback
    try:
        quality_score = float(f.get('quality_score', 2))
    except Exception:
        quality_score = 2.0
    is_fresh = bool(f.get('is_fresh_listing', False))
    # simple heuristic similar to JS fallback
    score = (quality_score / 3.0) * 0.5 + (0.5 if is_fresh else 0.2)
    return score


def main():
    try:
        raw = sys.stdin.read()
        if not raw:
            features = []
        else:
            features = json.loads(raw)
        if not isinstance(features, list):
            # if a single object was passed
            features = [features]
        scores = [compute_score(f) for f in features]
        sys.stdout.write(json.dumps(scores))
    except Exception as e:
        sys.stderr.write(str(e))
        sys.exit(1)

if __name__ == '__main__':
    main()
