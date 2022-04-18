from xml.dom.pulldom import parseString
from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

res = 0
pro = 0

@app.route('/')
def index2():
    return render_template('index.html')
@app.route('/enter-values', methods = ['POST', 'GET'])
def index1():
    global res,pro
    if request.method == 'POST':
        res_content = request.form['res']
        pro_content = request.form['pro']
        res = int(res_content)
        pro = int(pro_content)
        data = str(res_content) + " " + str(pro_content)
        return  render_template('values.html',data = data)
    else:
        return render_template('index.html')

@app.route('/play', methods = ['POST', 'GET'])
def index():
    if request.method == 'POST':
        data = str(res) + " " + str(pro) + " "
        for i in range(res + 2*pro*res):
            if(i < res + 2*pro*res - 1):
                data = data + request.form[str(i)] + " "
            else:
                data = data + request.form[str(i)]
        return  render_template('play.html',data = data)
    else:
        return render_template('values.html')
'''
@app.route('/delete/<int:id>')
def delete(id):
    task_to_delete = ToDo.query.get_or_404(id)
    try:
        db.session.delete(task_to_delete)
        db.session.commit()
        return redirect('/')
    except:
        return 'There was a problem deleting that task'

@app.route('/update/<int:id>', methods = ['GET', 'POST'])
def update(id):
    task = ToDo.query.get_or_404(id)
    if request.method == 'POST':
        task.content = request.form['content']
        try:
            db.session.commit()
            return redirect('/')
        except:
            return "There was an issue updating your task"
    else:
        return render_template('update.html', task = task)
'''
if __name__ == '__main__':
    app.run(debug = True)
