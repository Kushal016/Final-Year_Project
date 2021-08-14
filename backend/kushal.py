import sqlite3

conn = sqlite3.connect('voterDB.db')

cur = conn.cursor()

conn.execute(
    'DROP TABLE candidate'

)
conn.execute(
    'CREATE TABLE candidate(name TEXT)'
)
result = cur.execute(
    'SELECT * FROM candidate'
).fetchall()

print(result)
