import customtkinter as ctk

class MyApp:
    def __init__(self):
        self.root = ctk.CTkToplevel()
        self.root.title("Custom Tkinter GUI")
        self.root.geometry("400x300")

        # Create a frame to contain the GUI elements
        frame = ctk.CTkFrame(self.root)
        frame.grid(row=0, column=0)

        # Create a label
        label = ctk.CTkLabel(frame, text="This is a Custom Tkinter GUI")
        label.grid(row=0, column=0)

        # Create an entry box
        entry = ctk.CTkEntry(frame)
        entry.grid(row=1, column=0)

        # Create a button
        button = ctk.CTkButton(frame, text="Click Me", command=self.click_me)
        button.grid(row=2, column=0)

    def click_me(self):
        # Get the text from the entry box
        text = self.entry.get()

        # Show a message box with the text
        ctk.CTkMessageBox.show_info(self.root, "Message", text)

if __name__ == "__main__":
    app = MyApp()
    app.root.mainloop()
