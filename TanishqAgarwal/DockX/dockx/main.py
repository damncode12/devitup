from tkinter import LabelFrame, PhotoImage,messagebox, ttk
from customtkinter import *
from PIL import Image, ImageTk
import os

current_directory = os.getcwd()

set_appearance_mode("dark")  # Modes: system (default), light, dark
set_default_color_theme("dark-blue")  # Themes: blue (default), dark-blue, green

def fun_yes():
    messagebox.showinfo('Return','All containers are closed.')
    y=messagebox.askyesno("Confirmation","Do you want to Logout?")
    if y==True:
        root.destroy()
    else:
        messagebox.showinfo('Return','You will now return to the main screen.')

def fun_no():
    y=messagebox.askyesno("Confirmation","Do you want to Logout?")
    if y==True:
        root.destroy()
    else:
        messagebox.showinfo('Return','You will now return to the main screen.')

def fun():
    x= messagebox.askyesno("Confirmation","Do you want to close all containers?")
    if x==True:
        fun_yes()
    else:
        fun_no()

def stats():
    root.destroy()
    import launcher

def cont():
    root.destroy()
    import cont

def _create_circle(self, x, y, r, **kwargs):
    return self.create_oval(x-r, y-r, x+r, y+r, **kwargs)
CTkCanvas.create_circle = _create_circle

def _create_circle_arc(self, x, y, r, **kwargs):
    if "start" in kwargs and "end" in kwargs:
        kwargs["extent"] = kwargs["end"] - kwargs["start"]
        del kwargs["end"]
    return self.create_arc(x-r, y-r, x+r, y+r, **kwargs)
CTkCanvas.create_circle_arc = _create_circle_arc

if __name__ == '__main__':
    
    root=CTk()
    root.title("DOCK-X")

    root.attributes('-fullscreen', True)
    screen_width =(int)(root.winfo_screenwidth())
    screen_height =(int)(root.winfo_screenheight())
    root.geometry("%d,%d" % (screen_width,screen_height))
    
    '''rel_path_favicon = "assets/favicon.ico"
    img_path_favicon = os.path.join(current_directory, rel_path_favicon)
    root.iconbitmap(img_path_favicon)
    '''
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

    homelabel = CTkButton(master=framemenu,text="Home",font=("Montserrat SemiBold" ,20), cursor='arrow', fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_home).pack(side=TOP,padx=(0,20),pady=(110,10))
        
    rel_path_stats = "assets/statistics.png"
    img_path_stats = os.path.join(current_directory, rel_path_stats)
    download_stat=CTkImage(light_image=Image.open(img_path_stats),dark_image=Image.open(img_path_stats),size=(30,30))

    cpustatslabel = CTkButton(master=framemenu,text="Statistics",font=("Montserrat SemiBold", 20), cursor='arrow',fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_stat, command=stats).pack(side=TOP,padx=0,pady=(20,10))

    rel_path_box = "assets/box.png"
    img_path_box = os.path.join(current_directory, rel_path_box)
    download_cont=CTkImage(light_image=Image.open(img_path_box),dark_image=Image.open(img_path_box),size=(25,25))

    contlabel = CTkButton(master=framemenu,text="Containers",font=("Montserrat SemiBold", 20), cursor='arrow',fg_color='#3E3E3E',hover_color='#3E3E3E',text_color='White',image=download_cont, command=cont).pack(side=TOP,padx=0,pady=(20,10))

    rel_path_dock = "assets/docker_greenjpg.jpg"
    img_path_dock = os.path.join(current_directory, rel_path_dock)
    run_img = CTkImage(light_image=Image.open(img_path_dock),dark_image=Image.open(img_path_dock),size=(200,50))
    running_label = CTkLabel(framemenu,text='', image= run_img,fg_color='green',corner_radius=0).pack(side=BOTTOM,padx=0,pady=(51,0))
    button = CTkButton(framemenu,text="Logout",font=("Montserrat", 20), fg_color="#1D0042", width=140,height=40,corner_radius=10,command=fun).pack(side=BOTTOM,padx=0,pady=(100,20))

    framemenu.pack(side=LEFT,fill=BOTH,padx=0,pady=0)

    #mainWindowFrame                                                                                                                                                                                                                                    
    frame_main = CTkFrame(master=root, width=1000, height=800, fg_color="Black")

    frame_Top = CTkFrame(master= frame_main, width=1000, height=500, fg_color="gray10")

    cpu_values=[]
    mem_values=[]
    net_mem_values=[]

    can_def1 = CTkCanvas(frame_Top, bg = "#383E54",height = "530",width = 400,highlightthickness=0)

    can_def1.create_circle(200, 200, 100, fill='#CA00AA', outline="", width=4)
    can_def1.create_circle_arc(200, 200, 100, fill='#7C7C7C', outline="", start=45, end=140)
    can_def1.create_circle(200, 200, 70, fill='#383E54', outline="", width=4)
    #frame_Bottom_can1 = CTkFrame(master=can_def1, width=400, height=100, fg_color="gray10").pack(side=BOTTOM,fill=BOTH,expand=True,padx=0,pady=0)
    CTkLabel(can_def1,text="Container CPU Utilization",font=("Montserrat Medium", 25), fg_color='#383E54',text_color='White').pack(side=BOTTOM,fill=BOTH,expand=True,padx=(30,40),pady=(150,100))
    CTkLabel(can_def1,text="75%",font=("Montserrat Bold", 25), fg_color='#383E54',text_color='White').pack(side=BOTTOM,padx=(30,30),pady=(185,0))
    can_def1.pack(side=LEFT,expand=True, padx=(20,15),pady=10)

    can_def2 = CTkCanvas(frame_Top,bg = "#383E54",height = "530",width = 400,highlightthickness=0)

    can_def2.create_circle(200, 200, 100, fill='#00D27A', outline="", width=4)
    can_def2.create_circle_arc(200, 200, 100, fill='#7C7C7C', outline="", start=165, end=220)
    can_def2.create_circle(200, 200, 70, fill='#383E54', outline="", width=4)
    CTkLabel(can_def2,text="Container Memory Utilization",font=("Montserrat Medium", 25), fg_color='#383E54',text_color='White').pack(side=BOTTOM,fill=BOTH, expand=True,padx=(20,20),pady=(135,115))
    CTkLabel(can_def2,text="65%",font=("Montserrat Bold", 25), fg_color='#383E54',text_color='White').pack(side=BOTTOM,padx=(20,50),pady=(185,0))
    can_def2.pack(side=LEFT, expand=True, padx=(5,15),pady=10)

    can_def3 = CTkCanvas(frame_Top,bg = "#383E54",height = "530",width = 400,highlightthickness=0)

    can_def3.create_circle(200, 200, 100, fill='#EDC700', outline="", width=4)
    can_def3.create_circle_arc(200, 200, 100, fill='#7C7C7C', outline="", start=165, end=300)
    can_def3.create_circle(200, 200, 70, fill='#383E54', outline="", width=4)
    CTkLabel(can_def3,text="Net CPU Utilization",font=("Montserrat Medium", 25), fg_color='#383E54',text_color='White').pack(side=BOTTOM,fill=BOTH,expand=True,padx=(80,80),pady=(150,100))
    CTkLabel(can_def3,text="70%",font=("Montserrat Bold", 25), fg_color='#383E54',text_color='White').pack(side=BOTTOM,padx=(30,30),pady=(185,0))
    can_def3.pack(side=LEFT,expand = True,padx=(5,20), pady=10)

    frame_Top.pack(side=TOP,fill=BOTH,expand=True,padx=0,pady=0)

    frame_Bottom = CTkFrame(master=frame_main, width=1000, height=400, fg_color="gray10")
    style = ttk.Style(root)
    style.theme_use("alt")
    style.configure("Treeview", background="black", fieldbackground="black", foreground="white", font=('Montserrat Medium', 14), rowheight=40)
    style.configure("Treeview.Heading", background="black", fieldbackground="black", foreground="#ACAAFF", font=('Montserrat SemiBold', 17))

    table=ttk.Treeview(frame_Bottom, columns= ('ID', 'Name', 'Status'),show= 'headings')
    table.configure(height=10)
    table.column("# 1", anchor='center')
    table.heading('ID', text='Container ID')
    table.column("# 2", anchor='center')
    table.heading('Name', text='Container Name')
    table.column("# 3", anchor='center')
    table.heading('Status', text='Container Status')

    for i in range(11):   
        ID=('2023xa201a')
        Name=('Redis Enterprise')
        Status=('Running')
        data = (ID,Name , Status)
        table.insert(parent='',index = 0 , values= data)

    table.pack(fill=BOTH,expand=False,padx=75,pady=(10,0))

    frame_Bottombar = CTkFrame(master=frame_Bottom, width=1000, height=0.5, fg_color="gray19", corner_radius=0)
    CPUlabel = CTkLabel(master=frame_Bottombar,text="CPU: 65.01%",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=LEFT,padx=40,pady=0)
    Memlabel = CTkLabel(master=frame_Bottombar,text="Memory: 61%",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=LEFT,padx=10,pady=0)
    Disklabel = CTkLabel(master=frame_Bottombar,text="Disk: 35%",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=LEFT,padx=10,pady=0)
    Conlabel = CTkLabel(master=frame_Bottombar,text="Containers: Online ✅",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=RIGHT,padx=(0,40),pady=0)
    Servlabel = CTkLabel(master=frame_Bottombar,text="Service: Running ⚡",font=("Montserrat" ,15), fg_color='gray19',text_color='White').pack(side=RIGHT,padx=20,pady=0)
    frame_Bottombar.pack(side=BOTTOM,fill=BOTH,expand=True,padx=0,pady=(40,0))

    frame_Bottom.pack(side=BOTTOM,fill=BOTH,expand=True,padx=0,pady=0)
    frame_main.pack(side=RIGHT,padx=0,expand=True,fill=BOTH)

    root.mainloop()