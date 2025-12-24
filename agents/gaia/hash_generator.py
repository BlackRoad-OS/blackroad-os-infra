#!/usr/bin/env python3
"""
Gaia Hash Generator
===================
Generates SHA-256 hashes for BlackRoad OS components to ensure verification
and mathematical certainty. This is part of the "Proven by Physics" initiative
to provide transparent, verifiable system integrity.

Usage:
    python hash_generator.py <target_data>
    python hash_generator.py --file <filepath>
    python hash_generator.py --verify <component> <expected_hash>
"""

import hashlib
import sys
import argparse
import json
from pathlib import Path
from typing import Optional, Dict, Any


def generate_gaia_hash(target_data: str | bytes) -> str:
    """
    Generates a real SHA-256 hash for BlackRoad verification.
    
    Args:
        target_data: Data to hash (string or bytes)
        
    Returns:
        Hexadecimal SHA-256 hash string
    """
    # Ensure data is in bytes for hashing
    if isinstance(target_data, str):
        target_data = target_data.encode('utf-8')
    
    sha256_hash = hashlib.sha256()
    sha256_hash.update(target_data)
    return sha256_hash.hexdigest()


def generate_gaia_hash_from_file(filepath: str, block_size: int = 4096) -> str:
    """
    Generates SHA-256 hash for large files by reading in blocks.
    
    Args:
        filepath: Path to file to hash
        block_size: Size of blocks to read (default 4KB)
        
    Returns:
        Hexadecimal SHA-256 hash string
    """
    sha256_hash = hashlib.sha256()
    
    with open(filepath, 'rb') as f:
        while True:
            block = f.read(block_size)
            if not block:
                break
            sha256_hash.update(block)
    
    return sha256_hash.hexdigest()


def load_manifest() -> Dict[str, Any]:
    """Load the Live Truth Manifest."""
    manifest_path = Path(__file__).parent / "live_truth_manifest.json"
    
    if not manifest_path.exists():
        return {"components": {}}
    
    with open(manifest_path, 'r') as f:
        return json.load(f)


def save_manifest(manifest: Dict[str, Any]) -> None:
    """Save the Live Truth Manifest."""
    manifest_path = Path(__file__).parent / "live_truth_manifest.json"
    
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, indent=2)


def verify_hash(component: str, expected_hash: str) -> bool:
    """
    Verify a component's hash against the expected hash.
    
    Args:
        component: Component name to verify
        expected_hash: Expected hash value
        
    Returns:
        True if hash matches, False otherwise
    """
    manifest = load_manifest()
    
    if component not in manifest.get("components", {}):
        print(f"⚠️  Component '{component}' not found in manifest")
        return False
    
    stored_hash = manifest["components"][component]["hash"]
    
    if stored_hash == expected_hash:
        print(f"✓ Hash verified for '{component}'")
        print(f"  Hash: {stored_hash}")
        return True
    else:
        print(f"✗ Hash mismatch for '{component}'")
        print(f"  Expected: {expected_hash}")
        print(f"  Got:      {stored_hash}")
        return False


def update_manifest_component(component: str, identity: str, hash_value: str) -> None:
    """
    Update a component in the manifest.
    
    Args:
        component: Component name
        identity: Target identity (e.g., repo name)
        hash_value: SHA-256 hash value
    """
    manifest = load_manifest()
    
    if "components" not in manifest:
        manifest["components"] = {}
    
    manifest["components"][component] = {
        "identity": identity,
        "hash": hash_value
    }
    
    save_manifest(manifest)
    print(f"✓ Updated manifest for '{component}'")


def main():
    parser = argparse.ArgumentParser(
        description="Gaia Hash Generator - SHA-256 verification for BlackRoad OS"
    )
    
    parser.add_argument(
        'data',
        nargs='?',
        help='Data to hash (if not using --file)'
    )
    
    parser.add_argument(
        '--file',
        help='Path to file to hash'
    )
    
    parser.add_argument(
        '--verify',
        nargs=2,
        metavar=('COMPONENT', 'HASH'),
        help='Verify a component hash'
    )
    
    parser.add_argument(
        '--update',
        nargs=3,
        metavar=('COMPONENT', 'IDENTITY', 'HASH'),
        help='Update a component in the manifest'
    )
    
    parser.add_argument(
        '--list',
        action='store_true',
        help='List all components in the manifest'
    )
    
    args = parser.parse_args()
    
    # List components
    if args.list:
        manifest = load_manifest()
        components = manifest.get("components", {})
        
        if not components:
            print("No components in manifest")
            return
        
        print("\nLive Truth Manifest Components:")
        print("=" * 80)
        for component, data in components.items():
            print(f"\nComponent: {component}")
            print(f"  Identity: {data['identity']}")
            print(f"  Hash:     {data['hash']}")
        print("\n" + "=" * 80)
        return
    
    # Verify hash
    if args.verify:
        component, expected_hash = args.verify
        success = verify_hash(component, expected_hash)
        sys.exit(0 if success else 1)
    
    # Update manifest
    if args.update:
        component, identity, hash_value = args.update
        update_manifest_component(component, identity, hash_value)
        return
    
    # Generate hash from file
    if args.file:
        try:
            hash_value = generate_gaia_hash_from_file(args.file)
            print(f"Gaia Hash (File): {hash_value}")
            print(f"  File: {args.file}")
            return
        except FileNotFoundError:
            print(f"Error: File not found: {args.file}", file=sys.stderr)
            sys.exit(1)
        except Exception as e:
            print(f"Error: {e}", file=sys.stderr)
            sys.exit(1)
    
    # Generate hash from data
    if args.data:
        hash_value = generate_gaia_hash(args.data)
        print(f"Gaia Hash: {hash_value}")
        print(f"  Data: {args.data}")
        return
    
    # No action specified
    parser.print_help()
    sys.exit(1)


if __name__ == "__main__":
    main()
