import React from "react";
import Button from 'react-bootstrap/Button';
import "../First.css";

function LeftSide() {
    return (
        <div className="focus-in-expand">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Laborum facilis dolorem pariatur?<br /> Asperiores doloremque, minima neque <br />labore iste beatae dicta ipsam corrupti eaque <br />optio soluta vero ipsa, excepturi consequuntur alias ?<br />
            <Button variant="outline-primary" style={{ marginTop: "5px", marginLeft: "50px" }}>Yes, i agree</Button>
        </div >
    );
}
export default LeftSide;
