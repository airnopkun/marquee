from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import os

#Init app
app = Flask(__name__)
app.config['CORS_HEADERS'] = 'Content-Type'
cors = CORS(app, resources={r"/conversion": {"origins": "*"}})

@app.route('/', methods=['GET'])
def hello():
    return jsonify({
        'msg': "hello world"
    })

@app.route('/conversion', methods=['POST'])
@cross_origin(origin='*',headers=['Content- Type','Authorization'])
def conversion():

    print(request.files)
    #request.files[''].save("./newfile")
    #file = open("./newfile", "r")

    file = request.files['']
    print(file)
    paragraphs = []
    '''
    def paragraph(str):
        return '<pre>{\`\n' + str + '\n\`}</pre>\n'
    '''
    p = ''
    converted = ''
    for l in file:
        stripped_line = l.strip()
        print(stripped_line)
        if stripped_line == bytes("", 'utf-8'):
            if p:
               paragraphs.append(p)
               p = ''
        else:
            p = p + str(l)[2:-5] + ' '
    paragraphs.append(p)
    print(len(paragraphs))
    return jsonify(paragraphs)



#Run Server
if __name__ == '__main__':
    app.run(debug=True)
