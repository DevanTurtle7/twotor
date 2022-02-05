from faker import Faker
import secrets
from hashlib import sha512

fake = Faker()
Faker.seed(0)


def generate_salt():
    """
    Internal method to generate a salt for a new user in the database
    128 chars for increased security
    """
    return secrets.token_hex(64)


def hash_password_with_salt(salt, pw):
    combined_str = salt + pw
    return sha512(combined_str.encode("utf-8")).hexdigest()


for x in range(10):
    first_name = fake.first_name()
    last_name = fake.last_name()
    username = first_name + last_name
    salt = generate_salt()
    password = fake.password()
    password_hash = hash_password_with_salt(salt, password)
    email = fake.email()
    # first_name, last_name, email, university_id, username, salt, password
    print(
        f"""('{first_name}', '{last_name}', '{email}', 1, '{username}', '{salt}', '{password_hash}'), -- Password: {password}"""
    )

