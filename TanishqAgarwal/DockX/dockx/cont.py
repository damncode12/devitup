from tkinter import LabelFrame, PhotoImage, messagebox, ttk
from customtkinter import *
from PIL import Image, ImageTk
import os
#from . import main, launcher

current_directory = os.getcwd()

set_appearance_mode("dark")  # Modes: system (default), light, dark
set_default_color_theme("dark-blue")  # Themes: blue (default), dark-blue, green

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

def stats():
    root.destroy()
    import launcher

root = CTk()
root.title("DOCK-X")
root.attributes('-fullscreen', True)
screen_width = root.winfo_screenwidth()
screen_height = root.winfo_screenheight()
root.geometry(f"{screen_width},{screen_height}")

rel_path_favicon = "dock_x/assets/favicon.ico"
img_path_favicon = os.path.join(current_directory, rel_path_favicon)

root.iconbitmap(img_path_favicon)
#sidePaneMenu
framemenu = CTkFrame(master=root,height=screen_height,width=screen_width/4,fg_color="#313131")

rel_path_round = "dock_x/assets/round.png"
img_path_round = os.path.join(current_directory, rel_path_round)

img = CTkImage(light_image=Image.open(img_path_round),dark_image=Image.open(img_path_round),size=(150,150))
imglabel= CTkLabel(framemenu, text='', image = img, corner_radius=50).pack(side=TOP,padx=(10,10),pady=(20,10))

label = CTkLabel(master=framemenu,text="047pegasus",font=("Montserrat SemiBold", 20), fg_color='#3E3E3E',text_color='White').pack(side=TOP,padx=0,pady=(25,25))

rel_path_home = "dock_x/assets/home.png"
img_path_home = os.path.join(current_directory, rel_path_home)

download_home=CTkImage(light_image=Image.open(img_path_home),dark_image=Image.open(img_path_home),size=(30,30))
homelabel = CTkButton(master=framemenu,text="Home",font=("Montserrat SemiBold" ,20), cursor='arrow', fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_home, command=home).pack(side=TOP,padx=(0,20),pady=(110,10))

rel_path_stats = "dock_x/assets/statistics.png"
img_path_stats = os.path.join(current_directory, rel_path_stats)

download_stat=CTkImage(light_image=Image.open(img_path_stats),dark_image=Image.open(img_path_stats),size=(30,30))
cpustatslabel = CTkButton(master=framemenu,text="Statistics",font=("Montserrat SemiBold", 20), cursor='arrow',fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_stat, command = stats).pack(side=TOP,padx=0,pady=(20,10))

rel_path_box = "dock_x/assets/box.png"
img_path_box = os.path.join(current_directory, rel_path_box)

download_cont=CTkImage(light_image=Image.open(img_path_box),dark_image=Image.open(img_path_box),size=(25,25))
contlabel = CTkButton(master=framemenu,text="Containers",font=("Montserrat SemiBold", 20), cursor='arrow',fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_cont).pack(side=TOP,padx=0,pady=(20,10))

rel_path_dock = "dock_x/assets/docker_greenjpg.jpg"
img_path_dock = os.path.join(current_directory, rel_path_dock)

run_img = CTkImage(light_image=Image.open(img_path_dock),dark_image=Image.open(img_path_dock),size=(200,50))
running_label = CTkLabel(framemenu,text='', image= run_img,fg_color='green',corner_radius=0).pack(side=BOTTOM,padx=0,pady=(51,0))

button = CTkButton(framemenu,text="Logout",font=("Montserrat", 20), fg_color="#1D0042", width=140,height=40,corner_radius=10,command=fun).pack(side=BOTTOM,padx=0,pady=(100,20))
framemenu.pack(side=LEFT, fill=BOTH, padx=0, pady=0)

# mainWindowFrame
frame_main = CTkFrame(master=root, width=1000, height=800, fg_color="Black")

frame_Top = CTkFrame(master=frame_main, width=1000, height=700, fg_color="gray10")
frame_Left = CTkFrame(master=frame_Top, width=1000, height=600, fg_color="gray10")
frame_Right = CTkFrame(master=frame_Top, width=800, height=600, fg_color="#071330")

can1 = CTkCanvas(frame_Right, bg="#071330", height="600", width=680, highlightthickness=0)

rel_path_cloud = "dock_x/assets/cloud.png"
img_path_cloud = os.path.join(current_directory, rel_path_cloud)
cloudimg = CTkImage(light_image=Image.open(img_path_cloud), dark_image=Image.open(img_path_cloud), size=(30, 30))
instab = CTkLabel(can1, text="Network Inspector Tab", font=("Montserrat SemiBold", 20), fg_color="#071330", text_color='White', anchor="w")

cloud_label = CTkLabel(can1, text='', image=cloudimg, fg_color='#071330', corner_radius=0, anchor="w")
cloud_label.pack(side=LEFT, anchor="nw", padx=(100,0), pady=5)

instab.pack(side=LEFT, anchor="nw", padx=(20, 100), pady=5)

can1.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=0)

frame_LeftTop=CTkFrame(master=frame_Left, width=1000, height=50, fg_color="gray10")

frame_LeftBottom=CTkFrame(master=frame_Left, width=1000, height=500, fg_color="#1560BD")
rel_path_eth = "dock_x/assets/ethernet.png"
img_path_eth = os.path.join(current_directory, rel_path_eth)
ethernet_img = CTkImage(light_image=Image.open(img_path_eth), dark_image=Image.open(img_path_eth), size=(30, 30))
activity_label = CTkLabel(frame_LeftBottom, text="Port Exposure Activity Tab", font=("Montserrat SemiBold", 20), fg_color="#1560BD", text_color='White')

ethernet_label = CTkLabel(frame_LeftBottom, text='', image=ethernet_img, fg_color='#1560BD', corner_radius=0)
ethernet_label.pack(side=LEFT, anchor=NW, padx=10, pady=5)

activity_label.pack(side=TOP, anchor=NW, padx=(0,0), pady=5)


frame_cname=CTkFrame(master=frame_LeftTop, width=850, height=50, fg_color="#1560BD")
cname=CTkCanvas(frame_cname, bg="#1560BD", height="50", width=850,highlightthickness=0)
contname = CTkLabel(cname, text="Container name :", font=("Montserrat SemiBold", 20), fg_color="#1560BD", text_color='White').pack(side=LEFT, padx=(10,0), pady=5)
rel_path_refresh = "dock_x/assets/refresh.png"
img_path_refresh = os.path.join(current_directory, rel_path_refresh)
refimg = CTkImage(light_image=Image.open(img_path_refresh), dark_image=Image.open(img_path_refresh),size=(30,30))
ref_label = CTkLabel(cname, text='', image=refimg, fg_color='#1560BD', corner_radius=0).pack(side=RIGHT, padx=(800,0),  pady=(0,0))
cname.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=0)

frame_spin=CTkFrame(master=frame_LeftTop, width=200, height=50, fg_color="#1560BD")
spin=CTkCanvas(frame_spin, bg="#1560BD", height="50", width=200,highlightthickness=0)
sp = CTkButton(master=spin, text="Spin new", font=("Montserrat", 20), cursor='arrow', fg_color='#1560BD', hover_color='#1560BD', text_color='White').pack(side=LEFT, padx=(10,0), pady=5)
rel_path_hard = "dock_x/assets/hard_drive.png"
img_path_hard = os.path.join(current_directory, rel_path_hard)
hardimg = CTkImage(light_image=Image.open(img_path_hard), dark_image=Image.open(img_path_hard),size=(30,30))
hard_label = CTkLabel(spin, text='', image=hardimg, fg_color='#1560BD', corner_radius=0).pack(side=RIGHT, padx=(0,20),  pady=(0,0))

spin.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=0)
frame_cname.pack(side=LEFT, fill=BOTH, padx=0, pady=10)
frame_spin.pack(side=RIGHT, fill=BOTH, padx=(10,0), pady=10)


frame_LeftBottomIn=CTkFrame(master=frame_LeftBottom, width=1000, height=500, fg_color="#0A2351")
ins=CTkCanvas(frame_LeftBottomIn, bg="#0A2351", height="500", width=1000,highlightthickness=0)
ins.pack(side=BOTTOM, fill=BOTH, expand=True, padx=0, pady=0)

frame_LeftBottomIn.pack(side=BOTTOM, fill=BOTH, padx=(0,50), pady=10)

frame_LeftTop.pack(side=TOP, fill=BOTH, padx=0, pady=10)
frame_LeftBottom.pack(side=BOTTOM, fill=BOTH, padx=0, pady=(0,30))
frame_Left.pack(side=LEFT, fill=BOTH, padx=(10,0), pady=0)
frame_Right.pack(side=RIGHT, fill=BOTH, padx=(10,10), pady=(20,30))

frame_Top.pack(side=TOP, fill=BOTH, expand=True, padx=0, pady=(0,0))

frame_Bottom = CTkFrame(master=frame_main, width=1000, height=1200, fg_color="gray10")
can2=CTkCanvas(frame_Bottom, bg="gray17", height="300", width=1000,highlightthickness=2)
can2.pack(side=TOP, fill=BOTH, expand=True, padx=20, pady=(0,10))

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