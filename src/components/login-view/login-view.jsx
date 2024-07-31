import { useState } from "react";
//LoginView function component
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Verify login data
  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();
  
  //create data object with values from the form
  const data = {
    username: username,
    password: password,
  };

  console.log("Username:", username);
  console.log("Password:", password);

  //POST request send to the specified URL with the form data in JSON format
  fetch("https://anime-eiga-84a0980bd564.herokuapp.com/login", {
    method: "POST",
    //specifies to the server that the content type of the request is JSON
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
  })
    //parsing the server response, like user token, as JSON
    .then((response) => response.json())
    //onLoggedIn prop
    .then((data) => {
      //changed from `response.ok` to `data.username`
      //login successful if there is a `data.username` else fail
      if (data.user) {
        //saves data in the browser
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert ("No such user");
      }
    })
    //error handling
    .catch((e) => {
      alert("Something went wrong");
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input 
          type="text" 
          value = {username}
          onChange={(e) => setUsername(e.target.value)}
          //form validation
          required
          minLength="5"
          pattern="[a-zA-Z0-9]+"
          onInvalid={(e) =>
            e.target.setCustomValidity(
              "Username must have at least 5 characters and be alphanumeric."
            )
          }
        />
      </label>
      <label>
        Password:
        <input 
          type="password" 
          value = {password}
          onChange={(e) => setPassword(e.target.value)}
          //form validation
          required
         />
      </label>
      <button type="submit">Submit</button>
    </form>
    )
  }