from unko import *

def main():
    try:
        print(1 / 0)
    except ZeroDivisionError:
        deru()

if __name__ == '__main__':
    main()
