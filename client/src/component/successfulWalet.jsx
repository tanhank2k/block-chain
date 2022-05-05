import React from "react";
import { Card, Col, Row, Button } from "antd";

const SuccessfulWalet = (props) => {
  return (
      <div className="successful">
          <div className="successful-header">
                <h1>You are done!</h1>
          </div>
          <div className="successful-content">
              You are now ready to take advantage of all that Ethereum has to offer! Access with keystore file should only be used in an offline setting.
          </div>
            <div className="successful-footer">
                <Button type="primary" href="/login">
                    Access Wallet
                </Button>
                <a href='#'>Create another wallet</a>
            </div>
      </div>
  )
}
export default SuccessfulWalet;