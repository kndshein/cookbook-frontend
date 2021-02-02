import React from "react";
import { Route, Link, Switch } from "react-router-dom";

import Display from "./display";
import Form from "./form";

import "./App.css";

function App() {
  // Url variable
  const url = "http://localhost:4000/";

  const emptyCookbook = {
    title: "",
    yearPublished: 0,
  };

  const [selectedCookbook, setSelectedCookbook] = React.useState(emptyCookbook);
  const [cookbooks, setCookbooks] = React.useState([]);

  // Function to get list of dog
  const getCookbooks = () => {
    fetch(url + "api/cookbooks")
      .then((response) => response.json())
      .then((data) => {
        setCookbooks(data);
      });
  };

  const handleCreate = (newCookbook) => {
    fetch(url + "api/cookbooks", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCookbook),
    }).then(() => {
      getCookbooks();
    });
  };

  const selectCookbook = (cookbook) => {
    setSelectedCookbook(cookbook);
  };

  const handleUpdate = (cookbook) => {
    fetch(url + "api/cookbooks/" + cookbook._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cookbook),
    }).then(() => {
      getCookbooks();
    });
  };

  React.useEffect(() => {
    getCookbooks();
  }, []);

  const deleteCookbook = (cookbook) => {
    fetch(url + "api/cookbooks/delete/" + cookbook.title, {
      method: "delete",
    }).then(() => {
      getCookbooks();
    });
  };

  return (
    <div className="App">
      <Link to="/create">
        <button>Create a Dog</button>
      </Link>
      <hr />
      <Switch>
        <Route
          exact
          path="/"
          render={(rp) => (
            <Display
              {...rp}
              cookbooks={cookbooks}
              selectCookbook={selectCookbook}
              deleteCookbook={deleteCookbook}
            />
          )}
        />
        <Route
          exact
          path="/create"
          render={(rp) => (
            <Form
              {...rp}
              label="create"
              cookbook={emptyCookbook}
              handleSubmit={handleCreate}
            />
          )}
        />
        <Route
          exact
          path="/edit"
          render={(rp) => (
            <Form
              {...rp}
              label="update"
              cookbook={selectedCookbook}
              handleSubmit={handleUpdate}
            />
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
