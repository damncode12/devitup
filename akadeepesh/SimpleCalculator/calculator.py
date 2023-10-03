import tkinter as tk

def evaluate_expression():
    try:
        result.set(eval(entry.get()))
    except Exception as e:
        result.set("Error")

def clear_input():
    entry.delete(0, tk.END)

def append_to_input(char):
    current_input = entry.get()
    entry.delete(0, tk.END)
    entry.insert(0, current_input + char)

root = tk.Tk()
root.title("Calculator")

entry = tk.Entry(root, width=30)
entry.grid(row=0, column=0, columnspan=4)

result = tk.StringVar()
result.set("")

result_label = tk.Label(root, textvariable=result)
result_label.grid(row=1, column=0, columnspan=4)

buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+'
]

row_val = 2
col_val = 0

for button_text in buttons:
    tk.Button(root, text=button_text, width=5, height=2,
              command=lambda char=button_text: append_to_input(char) if char != '=' else evaluate_expression()).grid(row=row_val, column=col_val)
    col_val += 1
    if col_val > 3:
        col_val = 0
        row_val += 1

clear_button = tk.Button(root, text='C', width=5, height=2, command=clear_input)
clear_button.grid(row=6, column=0, columnspan=2)

root.mainloop()
