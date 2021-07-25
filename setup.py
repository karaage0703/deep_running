from setuptools import setup, Extension
from setuptools import find_packages
from os import listdir

with open("README.md") as f:
    long_description = f.read()

scripts = ["scripts/"+i for i in listdir("scripts")]

if __name__ == "__main__":
    setup(
        name="deep_running",
        scripts=scripts,
        version="0.0.1",
        description="Japanese Joke.",
        long_description=long_description,
        long_description_content_type="text/markdown",
        author="karaage0703",
        url="http://karaage.hatenadiary.jp",
        license="MIT License",
        packages=find_packages(),
        python_requires=">3.6",
    )
