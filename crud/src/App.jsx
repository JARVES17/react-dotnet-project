import React from "react";
import Toast from "react-bootstrap/Toast";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [active, setActive] = useState(0);
  const [updateId, setUpdateId] = useState();
  const [toastState, setToastState] = useState(false);

  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [EditActive, SetEditActive] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handelEdit = (id) => {
    const url =
      "https://localhost:7039/api/Employee/all?reqId=" + id.toString();
    axios.get(url).then((res) => {
      setEditAge(res.data.age);
      setEditName(res.data.name);
    });
    setUpdateId(id);

    handleShow();
  };
  const handelUpdate = () => {
    const url =
      "https://localhost:7039/api/Employee/id?id=" + updateId.toString();

    console.log(url);
    const data = {
      id: updateId,
      name: editName,
      age: editAge,
      isActive: EditActive,
    };

    console.log(data);
    axios.put(url, data).then((response) => {
      console.log(response.data);
      getData();
      clear();
      handleClose();
      toast.success("Entry has been Updated");
    });
  };

  const handelDelete = (id) => {
    const url = " https://localhost:7039/api/Employee/id?id=" + id.toString();
    axios.delete(url).then((res) => getData());
    toast.error("Entry has been Deleted");
  };

  const handelActive = (e) => {
    if (e.target.checked) {
      setActive(1);
    } else {
      setActive(0);
    }
  };

  const handelSave = () => {
    const url = "https://localhost:7039/api/Employee";
    const data = {
      name: name,
      age: age,
      isActive: active,
    };
    axios.post(url, data).then((result) => {
      toast.success("New Entry Added");
      getData();
      clear();
    });
  };
  const clear = () => {
    setAge("");
    setName("");
    setActive(0);
    setEditAge("");
    setEditName("");
    SetEditActive(0);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get("https://localhost:7039/api/Employee")
      .then((result) => {
        setData(result.data);
        console.log(result);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <div>
        <ToastContainer />
      </div>
      <br></br>
      <Container>
        <Row xs="auto">
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={active === 1 ? true : false}
              onChange={(e) => handelActive(e)}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <Button className="btn btn-primary" onClick={() => handelSave()}>
              Submit
            </Button>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Table striped bordered hover size="sm" className="w-75">
        <thead className="text-center">
          <tr>
            <th colSpan={3}>Index</th>
            <th colSpan={3}>Name</th>
            <th colSpan={3}>Age</th>
            <th colSpan={3}>IsActive</th>
            <th colSpan={3}>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data && data.length > 0
            ? data.map((items, ind) => {
                return (
                  <tr key={ind}>
                    <td colSpan={3}>{items.id}</td>
                    <td colSpan={3}>{items.name}</td>
                    <td colSpan={3}>{items.age}</td>
                    <td colSpan={3}>{items.isActive}</td>
                    <td>
                      <Button
                        className="btn btn-primary "
                        onClick={() => handelEdit(items.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        className="btn btn-danger"
                        onClick={() => handelDelete(items.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              })
            : "Loading..."}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row xs="auto">
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="EnterName"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </Col>
              <Col>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Age"
                  value={editAge}
                  onChange={(e) => setEditAge(e.target.value)}
                />
              </Col>
              <Col>
                <input type="checkbox" value={EditActive} />
                <label>IsActive</label>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            close
          </Button>
          <Button variant="primary" onClick={handelUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default App;
