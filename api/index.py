import os
from flask import Flask, request, send_from_directory, render_template
app = Flask(__name__, static_url_path='', static_folder='./static', template_folder='./template')

# TODO:
# Add choose your 聖物
# Make score announcing more funnier

# NOTE:
# 聖物idea: 木魚(cps test) 念經(typing game) 畫符咒(drawing)

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
        result = calculate(e1, e2, e3, life_is_not_fair)

        if result % 1 == 0:
            result = int(result)
        if result >= 60:
            return_string = str(result) + ", Pass"
            return render_template("index.html", result=return_string)
        elif 60 > result and result >= 40:
            return_string = str(result) + ", 補考Time"
            return render_template("index.html", result=return_string)
        else:
            return_string = str(result) + ", 重修舊好"
            return render_template("index.html", result=return_string)
    else:
        return render_template("index.html")


@app.route('/test-image')
def test_image():
    return app.send_static_file('assets/wooden fish icon.png')


@app.route('/robots.txt')
def robots():
    return send_from_directory(app.static_folder, request.path[1:])


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')
# comment out below code when uploaded to vercel
# if __name__ == '__main__':
#     app.run(debug=True)
