import tkinter as tk
from tkinter import ttk
from customtkinter import *
from PIL import Image, ImageTk
from itertools import count, cycle
from PIL import Image, ImageTk
import subprocess
import os

current_directory = os.getcwd()

class ImageLabel(tk.Label):
    """
    A Label that displays images, and plays them if they are gifs
    :im: A PIL Image instance or a string filename
    """
    def load(self, im):
        if isinstance(im, str):
            im = Image.open(im)
        frames = []
 
        try:
            for i in count(1):
                frames.append(ImageTk.PhotoImage(im.copy()))
                im.seek(i)
        except EOFError:
            pass
        self.frames = cycle(frames)
 
        try:
            self.delay = im.info['duration']
        except:
            self.delay = 100
 
        if len(frames) == 1:
            self.config(image=next(self.frames))
        else:
            self.next_frame()
 
    def unload(self):
        self.config(image=None)
        self.frames = None
 
    def next_frame(self):
        if self.frames:
            self.config(image=next(self.frames))
            self.after(self.delay, self.next_frame)
 
i = 0

def load():
    global i
    if i <= 5:
        txt = 'Loading...' + str(20 * i) + '%'
        progress_label.configure(text=txt)
        progress['value'] = 20 * i
        i += 1
        progress_label.after(500, load)
    else:
        root.destroy()  
        top()  

def top():
    subprocess.Popen(['python3', 'main.py'])

root = tk.Tk()
root.title("Splash screen")
#root.eval('tk::PlaceWindow . center')
root.overrideredirect(True)

width = 551 # Width 
height = 371 # Height
 
screen_width = root.winfo_screenwidth()  # Width of the screen
screen_height = root.winfo_screenheight() # Height of the screen
 
# Calculate Starting X and Y coordinates for Window
x = (screen_width/2) - (width/2)
y = (screen_height/2) - (height/2)
 
root.geometry('%dx%d+%d+%d' % (width, height, x, y))
root.resizable(False, False)

lbl = ImageLabel(root)
lbl.pack(pady=(5,0))

rel_path_gif = "assets/anim.gif"
img_path_gif = os.path.join(current_directory, rel_path_gif)

lbl.load(img_path_gif)
lbl.configure(height=200,width=500)
#img = CTkImage(light_image=Image.open("splash.png"),dark_image=Image.open("splash.png"),size=(500,300))
#imglabel= CTkLabel(root, text='', image = img, corner_radius=50, bg_color='#101828').pack(side=TOP,padx=0,pady=0)

root.config(background="#0e101e")

welcome_label=CTkLabel(root,text="DOCK-X",font=("Montserrat Bold", 40), fg_color="#0e101e",text_color='White')
welcome_label.pack(side=TOP,fill=BOTH, expand=True,padx=0,pady=(0,20))

progress= ttk.Style()
progress.theme_use('alt')
progress.configure("red.Horizontal.TProgressbar", background='#0e101e')

#progress = ttk.Progressbar(root, orient="horizontal", length=300, mode="determinate", style="red.Horizontal.TProgressbar")
progress = CTkProgressBar(master=root, orientation="horizontal", width=400, height=15, corner_radius=15, mode="determinate", determinate_speed=0.5)
progress.set(0)
progress.start()

progress.pack(side=BOTTOM, expand=True,padx=0,pady=(0,30))

progress_label = tk.Label(root, text='Loading...',font=("Montserrat Medium", 12), background="#0e101e", foreground='white')
progress_label.pack(side=BOTTOM, expand=True,padx=0,pady=10)

load()

root.mainloop()
