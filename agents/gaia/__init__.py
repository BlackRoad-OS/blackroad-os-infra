"""
Gaia Agent Module
=================
Live Truth Manifest verification system for BlackRoad OS.

Provides cryptographic verification using SHA-256 hashes to ensure
mathematical certainty and system integrity - "Proven by Physics".
"""

from .hash_generator import generate_gaia_hash, generate_gaia_hash_from_file

__version__ = "1.0.0"
__all__ = ["generate_gaia_hash", "generate_gaia_hash_from_file"]
