#!/bin/bash

rm -rf build/
rm -rf dist/
rm -rf deep_running.egg-info/
python3 setup.py sdist bdist_wheel