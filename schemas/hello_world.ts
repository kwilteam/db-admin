const helloWorld = `database hello_world;

table greetings {
  id int primary notnull,
  message text notnull maxlen(100),
  wallet text notnull,
  #wallet_index index(wallet)
}

procedure select_greetings () view public returns table(id int, message text, wallet text) {
  return SELECT * FROM greetings;
}

procedure insert_greeting ($id int, $message text) public {
  INSERT INTO greetings
  VALUES ($id, $message, @caller);
}

procedure update_greeting ($id int, $message text) public {
  UPDATE greetings 
  SET message = $message 
  WHERE id = $id AND wallet = @caller;
}

procedure delete_greeting ($id int) public {
  DELETE FROM greetings 
  WHERE id = $id AND wallet = @caller;
}`

export default helloWorld
