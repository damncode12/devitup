from tkinter import LabelFrame, PhotoImage, messagebox, ttk
from customtkinter import *
from PIL import Image, ImageTk
from matplotlib.backends.backend_tkagg import FigureCanvasTkAgg
import matplotlib.pyplot as plt
import numpy as np
from scipy.interpolate import make_interp_spline
import socket
import pickle
import threading
import time
import os
import queue

current_directory = os.getcwd()
lock = threading.Lock()

set_appearance_mode("dark")  # Modes: system (default), light, dark
set_default_color_theme("dark-blue")  # Themes: blue (default), dark-blue, green

def resolve_system_snapshot(system_snapshot):
    container_ids = []
    container_names = []
    cpu_utilization = []
    memory_utilization = []

    for container_stats in system_snapshot:
        container_id, container_name, cpu, memory = container_stats

        container_ids.append(container_id)
        container_names.append(container_name)
        cpu_utilization.append(cpu)
        memory_utilization.append(memory)

    return container_ids, container_names, cpu_utilization, memory_utilization

def process_system_snapshot(system_snapshot):
    # Process the received system snapshot
    print("Received system snapshot: ",system_snapshot)
    container_ids, container_names, cpu_utilization, memory_utilization = resolve_system_snapshot(system_snapshot)
    return container_ids, container_names, cpu_utilization, memory_utilization

#Global variables to store the data 
c_ids,c_names, cpu_util, memory_util = [],[],[],[]

def receive_system_snapshot(sock, recieved_flag):
    # Listen for incoming connectionsy karo khub aaj 
    sock.listen(1)
    print("Waiting for a connection...")

    # Accept a connection from the sender
    conn, addr = sock.accept()
    print("Connection established with:", addr)
    try:
        # Receive and process the system snapshot continuously
        while True:
            # Receive the data from the sender
            serialized_data = conn.recv(4096)

            # Deserialize the data using pickle
            system_snapshot = pickle.loads(serialized_data)
            # Process the received system snapshot
            container_ids, container_names, cpu_utilization, memory_utilization = process_system_snapshot(system_snapshot)
            global c_ids,c_names, cpu_util, memory_util
            #data_queue.put(cpu_utilization)
            c_ids,c_names, cpu_util, memory_util = container_ids, container_names, cpu_utilization, memory_utilization
            if(recieved_flag.is_set()):
                continue
            else:
                recieved_flag.set()
                
    finally:
        # Close the connection and the socket
        conn.close()
        sock.close()

def fun_yes():
    messagebox.showinfo('Return', 'All containers are closed.')
    y = messagebox.askyesno("Confirmation", "Do you want to Logout?")
    if y:
        root.destroy()
    else:
        messagebox.showinfo('Return', 'You will now return to the main screen.')

def fun_no():
    y = messagebox.askyesno("Confirmation", "Do you want to Logout?")
    if y:
        root.destroy()
    else:
        messagebox.showinfo('Return', 'You will now return to the main screen.')

def fun():
    x = messagebox.askyesno("Confirmation", "Do you want to close all containers?")
    if x:
        fun_yes()
    else:
        fun_no()

def home():
    root.destroy()
    import main

def cont():
    #root.state('withdrawn')
    root.destroy()
    import cont

def update_graph():
    lock.acquire()
    global y  # Access the global variable y
    global legend_displayed  # Access the global variable legend_displayed
    # Generate random CPU usage values for the containers
    global cpu_util
    #cpu_util = data_queue.get()
    usage = cpu_util
    print("usage:", usage)
    if len(usage) == 0:
        usage = np.zeros(1)

    # Shift the existing data to the left and append new data
    y = np.hstack((y[:, 1:], usage[:, np.newaxis]))
    #print(y)
    x = np.arange(num_points) * 0.25  # Update x with the new range
    # Update the plot with the new data and apply smoothing
    for i, line in enumerate(lines):
        x_smooth = np.linspace(x.min(), x.max(), 300)  # Generate a smooth time axis
        y_smooth = make_interp_spline(x, y[i])(x_smooth)  # Apply spline interpolation to smooth the curve
        line.set_data(x_smooth, y_smooth)
    # Adjust the x-axis limits to hold data for at most 15 seconds
    ax.set_xlim(x[-1] - 15, x[-1])
    # Update the figure canvas
    canvas.draw()
    if legend_displayed:
        leg= ax.legend(
                loc='lower center',
                ncol=1,
                bbox_to_anchor=(1.07, 0.3),
                frameon=False,
                facecolor='white',
                edgecolor='white',
                fontsize=10,
            )
        for text in leg.get_texts():
            text.set_color("white")
            text.set_weight('bold')
    
    lock.release()
    # Pause for a shorter duration to control the refresh rate
    root.after(100, update_graph)  # Schedule the next update after 60 milliseconds

if __name__ == '__main__':
     # Create a socket and bind it to a specific host and port
    host = 'localhost'
    port = 47474
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((host, port))

    recieved_flag = threading.Event()
    # Create a thread to receive the system snapshot
    recieve_thread = threading.Thread(target=receive_system_snapshot, args=(sock,recieved_flag))
    recieve_thread.start()

    recieved_flag.wait()

    if(recieved_flag.is_set()):
        root = CTk()
        root.title("DOCK-X")
        root.attributes('-fullscreen', True)
        screen_width = root.winfo_screenwidth()
        screen_height = root.winfo_screenheight()
        root.geometry(f"{screen_width},{screen_height}")

        rel_path_favicon = "assets/favicon.ico"
        img_path_favicon = os.path.join(current_directory, rel_path_favicon)
        root.iconbitmap(img_path_favicon)
        #sidePaneMenu
        framemenu = CTkFrame(master=root,height=screen_height,width=screen_width/4,fg_color="#313131")

        rel_path_round = "assets/round.png"
        img_path_round = os.path.join(current_directory, rel_path_round)
        img = CTkImage(light_image=Image.open(img_path_round),dark_image=Image.open(img_path_round),size=(150,150))
        imglabel= CTkLabel(framemenu, text='', image = img, corner_radius=50).pack(side=TOP,padx=(10,10),pady=(20,10))

        label = CTkLabel(master=framemenu,text="047pegasus",font=("Montserrat SemiBold", 20), fg_color='#3E3E3E',text_color='White').pack(side=TOP,padx=0,pady=(25,25))

        rel_path_home = "assets/home.png"
        img_path_home = os.path.join(current_directory, rel_path_home)
        download_home=CTkImage(light_image=Image.open(img_path_home),dark_image=Image.open(img_path_home),size=(30,30))

        homelabel = CTkButton(master=framemenu,text="Home",font=("Montserrat SemiBold" ,20), cursor='arrow', fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_home, command=home).pack(side=TOP,padx=(0,20),pady=(110,10))

        rel_path_stats = "assets/statistics.png"
        img_path_stats = os.path.join(current_directory, rel_path_stats)
        download_stat=CTkImage(light_image=Image.open(img_path_stats),dark_image=Image.open(img_path_stats),size=(30,30))

        cpustatslabel = CTkButton(master=framemenu,text="Statistics",font=("Montserrat SemiBold", 20), cursor='arrow',fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_stat).pack(side=TOP,padx=0,pady=(20,10))

        rel_path_box = "assets/box.png"
        img_path_box = os.path.join(current_directory, rel_path_box)
        download_cont=CTkImage(light_image=Image.open(img_path_box),dark_image=Image.open(img_path_box),size=(25,25))

        contlabel = CTkButton(master=framemenu,text="Containers",font=("Montserrat SemiBold", 20), cursor='arrow',fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_cont, command=cont).pack(side=TOP,padx=0,pady=(20,10))

        rel_path_dock = "assets/docker_greenjpg.jpg"
        img_path_dock = os.path.join(current_directory, rel_path_dock)
        run_img = CTkImage(light_image=Image.open(img_path_dock),dark_image=Image.open(img_path_dock),size=(200,50))
        running_label = CTkLabel(framemenu,text='', image= run_img,fg_color='green',corner_radius=0).pack(side=BOTTOM,padx=0,pady=(51,0))
        button = CTkButton(framemenu,text="Logout",font=("Montserrat", 20), fg_color="#1D0042", width=140,height=40,corner_radius=10,command=fun).pack(side=BOTTOM,padx=0,pady=(100,20))
        framemenu.pack(side=LEFT, fill=BOTH, padx=0, pady=0)

        # mainWindowFrame
        frame_main = CTkFrame(master=root, width=1000, height=800, fg_color="Black")

        frame_Top = CTkFrame(master=frame_main, width=1000, height=350, fg_color="gray10")
        cpu = CTkCanvas(frame_Top, bg="#1F1E2E", height="350", width=1000,highlightthickness=0)
        header = CTkFrame(cpu, width=1000, height=50, fg_color="#1F1E2E")
        cputag = CTkLabel(header, text="CPU", font=("Montserrat SemiBold", 20), fg_color="#1F1E2E", text_color='White').pack(side=TOP, padx=0, pady=(5,0))
        header.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))

        '''
        Actual Graph implementation
        ''' 

        # Create a matplotlib figure and axes
        fig, ax = plt.subplots(figsize=(10, 2))
        fig.set_size_inches(10, 3)  # Set the size of the plot window
        ax.set_facecolor('#1F1E2E')  # Set the plot background color
        fig.set_facecolor('#1F1E2E')  # Set the plot background color
        ax.tick_params(axis='y', colors='white')
        # Set up the initial plot
        num_points = 60  # Number of data points to show initially (15 seconds with 0.25-second intervals)
        x = np.arange(num_points) * 0.25  # Time axis in seconds
        num_containers = len(c_ids) if c_ids else 0  # Number of containers
        '''if num_containers == 0:
            num_containers = 1
        else:
            num_containers = num_containers
        '''
        y = ((num_containers, num_points))
        y = np.zeros(y)  # Empty array for CPU usage of each container

        # Define a modern and aesthetic color palette
        palette = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C', '#8338EC', '#3A86FF']
        lines = [ax.plot(x, y[i], color=palette[i], label=f'Container {i+1}')[0] for i in range(num_containers)]
        ax.set_ylim(0, 100)  # Set y-axis limits for CPU usage percentage
        ax.set_xticks([])  # Hide x-axis ticks and labels
        ax.spines['top'].set_visible(False)  # Remove top border
        ax.spines['right'].set_visible(False)  # Remove right border
        ax.spines['bottom'].set_visible(False)  # Remove bottom border
        ax.spines['left'].set_visible(False)  # Remove left border
        ax.yaxis.grid(True, color='white', linestyle='solid', linewidth=0.5)  # Add horizontal grid lines
        ax.xaxis.set_tick_params(color='white')  # Set x-axis tick color to white
        ax.yaxis.set_tick_params(color='white')  # Set y-axis tick color to white
        plt.setp(ax.spines.values(), color='white')  # Set color of all spines to white
        plt.setp(ax.xaxis.get_ticklines(), color='white')  # Set color of x-axis tick lines to white
        plt.setp(ax.yaxis.get_ticklines(), color='white')  # Set color of y-axis tick lines to white
        ax.xaxis.label.set_color('white')  # Set color of x-axis label to white
        ax.yaxis.label.set_color('white')  # Set color of y-axis label to white
        plt.ion()  # Enable interactive mode for real-time updating
        legend_displayed = True  # Flag to check if the legend is displayed

        # Create a tkinter canvas and embed the matplotlib figure in it
        canvas = FigureCanvasTkAgg(fig, master=cpu)
        canvas.draw()
        canvas.get_tk_widget().pack(side=TOP, fill=BOTH, expand=True,padx=0, pady=0)

        # Start the graph update function
        update_thread= threading.Thread(target=update_graph)
        update_thread.start()
        #update_graph()

        cpu.pack(side=TOP, fill=BOTH, expand=True, padx=20, pady=20)
        frame_Top.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))

        frame_Bottom = CTkFrame(master=frame_main, width=1000, height=600, fg_color="gray10")

        frame_BottomTop = CTkFrame(master=frame_Bottom, width=1000, height=450, fg_color="gray10")
        #NETWORK GRAPH
        network = CTkCanvas(frame_BottomTop, bg="#1F1E2E", height="400", width=310,highlightthickness=0)
        header_network = CTkFrame(network, width=310, height=50, fg_color="#1F1E2E")
        networktag = CTkLabel(header_network, text="NETWORK", font=("Montserrat SemiBold", 20), fg_color="#1F1E2E", text_color='White').pack(side=TOP, padx=0, pady=(5,0))
        header_network.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))

        '''
        Actual Graph implementation
        '''

        network.pack(side=LEFT, fill=BOTH, expand=TRUE, padx=10, pady=5)
        #STORAGE GRAPH
        storage = CTkCanvas(frame_BottomTop, bg="#1F1E2E", height="400", width=310,highlightthickness=0)
        header_storage = CTkFrame(storage, width=310, height=50, fg_color="#1F1E2E")
        storagetag = CTkLabel(header_storage, text="STORAGE", font=("Montserrat SemiBold", 20), fg_color="#1F1E2E", text_color='White').pack(side=TOP, padx=0, pady=(5,0))
        header_storage.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))
        storagegraph = CTkFrame(storage, width=310, height=350, fg_color="#1F1E2E")

        '''
        Actual Graph implementation
        '''

        storagegraph.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))
        storage.pack(side=LEFT, fill=BOTH, expand=TRUE, padx=10, pady=5)
        rel_path_splash = "assets/splash.png"
        img_path_splash = os.path.join(current_directory, rel_path_splash)
        anim_img = CTkImage(light_image=Image.open(img_path_splash), dark_image=Image.open(img_path_splash), size=(500, 350))
        splash_label= CTkLabel(frame_BottomTop, text='', image=anim_img, corner_radius=0).pack(side=LEFT, fill=BOTH, expand=TRUE, padx=10, pady=(60,20))
        frame_BottomTop.pack(side=TOP, fill=BOTH, expand=True, padx=10, pady=0)

        frame_BottomBottom = CTkFrame(master=frame_Bottom, width=1000, height=250, fg_color="gray10")
        #MEMORY GRAPH
        memory = CTkCanvas(frame_Bottom, bg="#1F1E2E", height="221", width=950,highlightthickness=0)
        header_memory = CTkFrame(memory, width=950, height=50, fg_color="#1F1E2E")
        memorytag = CTkLabel(header_memory, text="MEMORY", font=("Montserrat SemiBold", 20), fg_color="#1F1E2E", text_color='White').pack(side=TOP, padx=0, pady=(5,0))
        header_memory.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))
        memorygraph = CTkFrame(memory, width=950, height=171, fg_color="#1F1E2E")

        '''
        Actual Graph implementation
        '''

        memorygraph.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))
        memory.pack(side=TOP, fill=BOTH, expand=TRUE, padx=20, pady=20)
        frame_BottomBottom.pack(side=TOP, fill=BOTH, expand=True, padx=20, pady=(20,0))

        frame_Bottombar = CTkFrame(master=frame_main, width=1000, height=70, fg_color="gray19", corner_radius=0) 
        CPUlabel = CTkLabel(master=frame_Bottombar,text="CPU: 65.01%",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=LEFT,padx=40,pady=12)
        Memlabel = CTkLabel(master=frame_Bottombar,text="Memory: 61%",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=LEFT,padx=10,pady=12)
        Disklabel = CTkLabel(master=frame_Bottombar,text="Disk: 35%",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=LEFT,padx=10,pady=12)
        Conlabel = CTkLabel(master=frame_Bottombar,text="Containers: Online ✅",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=RIGHT,padx=(0,40),pady=12)
        Servlabel = CTkLabel(master=frame_Bottombar,text="Service: Running ⚡",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=RIGHT,padx=20,pady=12)
        frame_Bottombar.pack(side=BOTTOM,fill=BOTH,expand=True,padx=0,pady=0)

        frame_Bottom.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=0)
        frame_main.pack(side=RIGHT, padx=0, expand=True, fill=BOTH)

        root.mainloop()
