import React from "react";

const Display = (props) => {
  const { cookbooks } = props;

  const loaded = () => {
    return (
      <div className="display">
        {cookbooks.cookbooks.map((cookbook) => {
          return (
            <article key={cookbook._id}>
              <h1>{cookbook.title}</h1>
              <h4>{cookbook.yearPublished}</h4>
              <button
                onClick={() => {
                  props.selectCookbook(cookbook);
                  props.history.push("/edit");
                }}
              >
                Edit Cookbook
              </button>
              <button
                onClick={() => {
                  props.deleteCookbook(cookbook);
                }}
              >
                Delete Cookbook
              </button>
            </article>
          );
        })}
      </div>
    );
  };
  const loading = <h1>Loading...</h1>;
  return props.cookbooks.length !== 0 ? loaded() : loading;
};

export default Display;
