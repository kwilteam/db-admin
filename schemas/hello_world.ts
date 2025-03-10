const helloWorld = `-- Ensure a clean slate
DROP NAMESPACE IF EXISTS hello_world;

-- Create hello_world namespace
CREATE NAMESPACE hello_world;

-- Create users Table in hello_world Namespace
{hello_world} CREATE TABLE users (
    id INT8 PRIMARY KEY,
    name TEXT NOT NULL,
    age INT8 NOT NULL
);

-- Create posts Table (No Foreign Key Yet) in hello_world Namespace
{hello_world} CREATE TABLE posts (
    id INT8 PRIMARY KEY,
    user_id INT8,
    content TEXT NOT NULL
);

-- **Adding a Foreign Key to an Existing Table**
{hello_world} ALTER TABLE posts
ADD CONSTRAINT fk_user_id
FOREIGN KEY (user_id)
REFERENCES users(id)
ON UPDATE CASCADE
ON DELETE RESTRICT;

{hello_world} DROP ACTION IF EXISTS create_user;

-- **Create an Action to Insert a User and Return the ID**
{hello_world} CREATE ACTION create_user($id INT8, $name TEXT, $age INT8) PUBLIC RETURNS (id INT8) {
    INSERT INTO users (id, name, age) VALUES ($id, $name, $age);
    RETURN $id;
};

-- -- **Create an Action to Insert a Post**
{hello_world} DROP ACTION IF EXISTS create_post;
{hello_world} CREATE ACTION create_post($id INT8, $user_id INT8, $content TEXT) PUBLIC {
    INSERT INTO posts (id, user_id, content) VALUES ($id, $user_id, $content);
};

-- **Create an Action to Get a User's Info**
{hello_world} DROP ACTION IF EXISTS get_user;
{hello_world} CREATE ACTION get_user($id INT8) PUBLIC RETURNS (name TEXT, age INT8) {
    for $row in SELECT name, age FROM users WHERE id = $id {
        RETURN $row.name, $row.age;
    }
    ERROR('User not found');
};

-- **Create an Action that Returns All Users**
{hello_world} DROP ACTION IF EXISTS get_users;
{hello_world} CREATE ACTION get_users() PUBLIC RETURNS TABLE (name TEXT, age INT8) {
    RETURN SELECT name, age FROM users;
};

-- **Create an Action to Delete a User (Will Fail if Foreign Key Restricts It)**
{hello_world} DROP ACTION IF EXISTS delete_user;
{hello_world} CREATE ACTION delete_user($id INT8) PUBLIC {
    DELETE FROM users WHERE id = $id;
};

-- **Create an Action to Perform Arithmetic on User Ages**
{hello_world} DROP ACTION IF EXISTS calculate_age_stats;
{hello_world} CREATE ACTION calculate_age_stats($id INT8) PUBLIC RETURNS (double_age INT8, squared_age INT8) {
    for $row in SELECT age FROM users WHERE id = $id {
        $double_age := $row.age * 2;
        $squared_age := $row.age ^ 2;
        RETURN $double_age, $squared_age;
    }
    ERROR('User not found');
};

-- **Create an Action to Log Messages**
{hello_world} DROP ACTION IF EXISTS log_message;
{hello_world} CREATE ACTION log_message() PUBLIC {
    NOTICE('User action executed successfully');
};

-- **Create an Action with a Conditional Check on Age**
{hello_world} DROP ACTION IF EXISTS check_age_category;
{hello_world} CREATE ACTION check_age_category($age INT8) PUBLIC RETURNS (category TEXT) {
    if $age < 18 {
        RETURN 'Minor';
    } elseif $age >= 18 AND $age < 65 {
        RETURN 'Adult';
    } else {
        RETURN 'Senior';
    }
};

-- **Create an Action That Iterates Over an Array**
{hello_world} DROP ACTION IF EXISTS iterate_over_names;
{hello_world} CREATE ACTION iterate_over_names($names TEXT[]) PUBLIC RETURNS TABLE (name TEXT) {
    for $name IN ARRAY $names {
        RETURN NEXT $name;
    }
};

-- **Dropping the Foreign Key Constraint**
{hello_world} ALTER TABLE posts DROP CONSTRAINT fk_user_id;
`

export default helloWorld
