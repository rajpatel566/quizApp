from flask import Flask, request, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Database connection function
def connect_db():
    return mysql.connector.connect(
        host="",
        user="",
        password="",
        database=""
    )

# User Signup (Only username is needed)
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')

    db = connect_db()
    cursor = db.cursor()
    
    try:
        cursor.execute("INSERT INTO Users (username, password_hash) VALUES (%s, 'dummy')", (username,))
        db.commit()
        return jsonify({"message": "User  registered successfully"}), 201
    except mysql.connector.IntegrityError:
        return jsonify({"error": "Username already exists"}), 400
    finally:
        cursor.close()
        db.close()

# User Login 
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')

    db = connect_db()
    cursor = db.cursor()
    
    cursor.execute("SELECT id FROM Users WHERE username = %s", (username,))
    user = cursor.fetchone()
    cursor.close()
    db.close()

    if user:
        return jsonify({"message": "Login successful", "user_id": user[0]}), 200

    return jsonify({"message": "Invalid credentials"}), 401

# CRUD Operations for Users

# Read all users
@app.route('/users', methods=['GET'])
def get_users():
    db = connect_db()
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT id, username,  attempt_count, money_won, attempt_timestamp  FROM Users")
    users = cursor.fetchall()

    cursor.close()
    db.close()
    return jsonify(users), 200

# Read a specific user by ID
@app.route('/users/<int:user_id>', methods=['GET'])
def get_user(user_id):
    db = connect_db()
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT id, username FROM Users WHERE id = %s", (user_id,))
    user = cursor.fetchone()

    cursor.close()
    db.close()
    
    if user:
        return jsonify(user), 200
    else:
        return jsonify({"error": "User  not found"}), 404

# Update a user
@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json
    username = data.get('username')

    db = connect_db()
    cursor = db.cursor()

    query = "UPDATE Users SET username = %s WHERE id = %s"
    values = (username, user_id)

    cursor.execute(query, values)
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "User  not found"}), 404

    cursor.close()
    db.close()
    
    return jsonify({"message": "User  updated successfully"}), 200

# Delete a user
@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    db = connect_db()
    cursor = db.cursor()

    cursor.execute("DELETE FROM Users WHERE id = %s", (user_id,))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "User  not found"}), 404

    cursor.close()
    db.close()
    
    return jsonify({"message": "User  deleted successfully"}), 200

# CRUD Operations for Questions

# Create a new question
@app.route('/questions', methods=['POST'])
def create_question():
    data = request.json
    db = connect_db()
    cursor = db.cursor()

    query = """INSERT INTO Questions (question, option1, option2, option3, option4, correct_option) 
                VALUES (%s, %s, %s, %s, %s, %s)"""
    values = (data['question'], data['option1'], data['option2'], data['option3'], data['option4'], data['correct_option'])

    cursor.execute(query, values)
    db.commit()
    
    cursor.close()
    db.close()
    
    return jsonify({"message": "Question added successfully"}), 201

@app.route('/questions', methods=['GET'])
def get_questions():
    db = connect_db()
    cursor = db.cursor()
    
    cursor.execute("SELECT  id, question, option1, option2, option3, option4, correct_option  FROM Questions")  # Adjust the query as needed
    questions = cursor.fetchall()
    cursor.close()
    db.close()

    # Format the questions into a JSON-friendly structure
    formatted_questions = [
        {
            "question": q[1],
            "option1": q[2],
            "option2": q[3],
            "option3": q[4],
            "option4": q[5],
            "correct_option": q[6]
        }
        for q in questions
    ]

    return jsonify(formatted_questions), 200

# Read a specific question by ID
@app.route('/questions/<int:question_id>', methods=['GET'])
def get_question(question_id):
    db = connect_db()
    cursor = db.cursor(dictionary=True)
    
    cursor.execute("SELECT * FROM Questions WHERE id = %s", (question_id,))
    question = cursor.fetchone()

    cursor.close()
    db.close()
    
    if question:
        return jsonify(question), 200
    else:
        return jsonify({"error": "Question not found"}), 404

# Update a question
@app.route('/questions/<int:question_id>', methods=['PUT'])
def update_question(question_id):
    data = request.json
    db = connect_db()
    cursor = db.cursor()

    query = """UPDATE Questions 
            SET question = %s, option1 = %s, option2 = %s, option3 = %s, option4 = %s, correct_option = %s 
            WHERE id = %s"""
    values = (data['question'], data['option1'], data['option2'], data['option3'], data['option4'], data['correct_option'], question_id)

    cursor.execute(query, values)
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Question not found"}), 404

    cursor.close()
    db.close()
    
    return jsonify({"message": "Question updated successfully"}), 200

# Delete a question
@app.route('/questions/<int:question_id>', methods=['DELETE'])
def delete_question(question_id):
    db = connect_db()
    cursor = db.cursor()

    cursor.execute("DELETE FROM Questions WHERE id = %s", (question_id,))
    db.commit()

    if cursor.rowcount == 0:
        return jsonify({"error": "Question not found"}), 404

    cursor.close()
    db.close()
    
    return jsonify({"message": "Question deleted successfully"}), 200

# Submit an attempt
@app.route('/attempts', methods=['POST'])
def submit_attempt():
    data = request.json
    user_id = data.get('user_id')
    question_id = data.get('question_id')
    selected_option = data.get('selected_option')

    db = connect_db()
    cursor = db.cursor(dictionary=True)

    cursor.execute("SELECT correct_option FROM Questions WHERE id = %s", (question_id,))
    question = cursor.fetchone()
    
    if question:
        is_correct = (selected_option == question["correct_option"])
        cursor.execute("INSERT INTO UserAttempts (user_id, question_id, selected_option, is_correct) VALUES (%s, %s, %s, %s)",
                    (user_id, question_id, selected_option, is_correct))
        db.commit()

        response = {"message": "Attempt recorded", "is_correct": is_correct}
    else:
        response = {"error": "Invalid question ID"}

    cursor.close()
    db.close()
    
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
