const helloWorld = `database hello_world;

table greetings {
  id int primary notnull,
  message text notnull maxlen(100),
  wallet text notnull,
  #wallet_index index(wallet)
}

action select_greetings () view public {
  SELECT * FROM greetings;
}

action insert_greeting ($id, $message) public {
  INSERT INTO greetings
  VALUES ($id, $message, @caller);
}

action update_greeting ($id, $message) public {
  UPDATE greetings 
  SET message = $message 
  WHERE id = $id AND wallet = @caller;
}

action delete_greeting ($id) public {
  DELETE FROM greetings 
  WHERE id = $id AND wallet = @caller;
}`

export default helloWorld
