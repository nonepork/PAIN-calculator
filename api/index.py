import os
from flask import Flask, request, send_from_directory, render_template
app = Flask(__name__, static_folder='static', template_folder='template')

def calculate(exam1: float, exam2: float, exam3: float, teachersmood: float) -> float:
    # How to calculate:
    # Sum first, second and third exams' score, divided by 3 (rounded to integer) and times 0.6
    # then add usual performance (which is affected by teacher's mood) score times 0.4
    # For simplicity rounded the final value to the first decimal place
    return round(((exam1+exam2+exam3) // 3 * 0.6) + (teachersmood * 0.4), 1)

@app.route('/', methods=["POST","GET"])
def home():
    if request.method == "POST":
        e1 = float(request.form["exam1"])
        e2 = float(request.form["exam2"])
        e3 = float(request.form["exam3"])
        life_is_not_fair = float(request.form["teachersmood"])
        if calculate(e1, e2, e3, life_is_not_fair) >= 60:
            return_string = "score:" + str(calculate(e1, e2, e3, life_is_not_fair)) + ", nice"
            return return_string
        elif 60 > calculate(e1, e2, e3, life_is_not_fair) and calculate(e1, e2, e3, life_is_not_fair) >= 40:
            return_string = "score:" + str(calculate(e1, e2, e3, life_is_not_fair)) + ", 笑死 去補考"
            return return_string 
        else:
            return_string = "score:" + str(calculate(e1, e2, e3, life_is_not_fair)) + ", 笑死 你沒摟"
            return return_string 
    else:
        return render_template("index.html")


@app.route('/robots.txt')
def robots():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
# comment out below code when uploaded to vercel
if __name__ == '__main__':
    app.run(debug=True)
