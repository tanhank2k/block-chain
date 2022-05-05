import React from "react";

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
  }
  render() {
    return (
      <div>
        <h1>Error</h1>
        <p>
          404: Page not found.
        </p>
      </div>
    );
  }
}

export default Error;