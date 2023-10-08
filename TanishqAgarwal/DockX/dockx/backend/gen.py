import docker
import time
import socket
import pickle

def get_container_stats():
    client = docker.from_env()
    containers = client.containers.list()
    stats_list = []

    for container in containers:
        stats = container.stats(stream=False)
        container_stats =[
            container.id,
            container.name,
            stats['cpu_stats']['cpu_usage']['total_usage'] / stats['cpu_stats']['system_cpu_usage'] * 100,
            stats['memory_stats']['usage'] / stats['memory_stats']['limit'] * 100,
        ]
        stats_list.append(container_stats)

    return stats_list

def send_system_snapshot():
    # Create a socket and connect to the receiver
    host = 'localhost'
    port = 47474
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.connect((host, port))

    try:
        # Continuously send the system snapshot
        while True:
            # Get the system snapshot
            system_snapshot = get_container_stats()

            # Serialize the system snapshot using pickle
            serialized_data = pickle.dumps(system_snapshot)

            # Send the serialized data
            sock.sendall(serialized_data)
            
            print(system_snapshot)
            # Wait for a specified time interval before sending the next snapshot
            time.sleep(1)
            
    finally:
        # Close the socket connection in the finally block to ensure it's closed even if an exception occurs
        sock.close()

if __name__ == '__main__': 
    while True:    
        send_system_snapshot()        
        time.sleep(0.2)

