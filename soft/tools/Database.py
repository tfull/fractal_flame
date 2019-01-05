import MySQLdb
import argparse

DB_NAME = "fractal_flame"

def create_table(args):
    connection = MySQLdb.connect(user=args.user, passwd=args.password, database=DB_NAME)
    cursor = connection.cursor()
    query = """create table if not exists images (
    id int unsigned auto_increment not null primary key,
    txt mediumtext not null,
    png mediumblob not null,
    created_at timestamp not null
    ) default character set utf8"""
    cursor.execute(query)
    cursor.execute("alter table images add index index_images_on_created_at(created_at)")
    cursor.close()
    connection.close()

def read_file(filename, mode):
    with open(filename, mode) as f:
        return f.read()

def save_image(args):
    connection = MySQLdb.connect(user=args.user, passwd=args.password, database=DB_NAME)
    cursor = connection.cursor()
    query = "insert into images (png, txt) values (%s, %s)"
    cursor.execute(query, (read_file(args.png, "rb"), read_file(args.txt, "r")))
    cursor.close()
    connection.close()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description = "Manage image database.")
    parser.add_argument("command")
    parser.add_argument("--user", dest="user")
    parser.add_argument("--password", dest="password")
    parser.add_argument("--png", dest="png")
    parser.add_argument("--txt", dest="txt")
    args = parser.parse_args()
    if args.command == "create":
        create_table(args)
    elif args.command == "save":
        save_image(args)
    else:
        sys.stderr.write("no such command\n")
        exit(1)
