import multiprocessing
import os
import time

def launch_stats_gen():
    os.system("python3 stats_gen.py")

def launch_gen():
    os.system("python3 backend/gen.py")

if __name__ == '__main__':
    # Create two separate processes
    p1 = multiprocessing.Process(target=launch_stats_gen)
    p2 = multiprocessing.Process(target=launch_gen)

    # Start the processes
    p1.start()
    time.sleep(3)
    p2.start()

    # Wait for the processes to finish
    p1.join()
    p2.join()
