import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { MdOutlineEditCalendar } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import {
  createCommon,
  editCommon,
  deleteCommon,
} from "../../store/action/commonActions";
import { Row, Col, Card, Table } from "react-bootstrap";

const Dashboard1 = () => {
  const initialRoles = useSelector((state) => state.commonReducer.roles);
  console.log(initialRoles);

  const dispatch = useDispatch();

  const [roleName, setRoleName] = useState("");
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState(1);

  const incrementId = () => {
    setId(id + 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedRoleName = roleName.trim();
    if (trimmedRoleName.length === 0) {
      setErrorMessage("Role Name cannot be empty.");
      return;
    }
    incrementId();
    dispatch(createCommon("roles", id, trimmedRoleName));

    setRoleName("");
    setErrorMessage("");
  };

  const handleRoleEdit = () => {
    if (editingRoleId !== null) {
      const trimmedRoleName = roleName.trim();
      if (trimmedRoleName.length === 0) {
        alert("Role Name cannot be empty.");
        return;
      }
      dispatch(editCommon("roles", editingRoleId, trimmedRoleName));
      setRoleName("");
      setShowForm(false);
      setEditingRoleId(null);
    }
  };

  const openEditModal = (roleId) => {
    const roleToEdit = initialRoles.find((role) => role.id === roleId);
    if (roleToEdit) {
      setEditingRoleId(roleId);
      setRoleName(roleToEdit.name);
      setShowForm(true);
    }
  };

  const handleRoleDelete = (roleId) => {
    const sliceName = "roles";
    dispatch(deleteCommon(sliceName, roleId));
  };

  return (
    <>
      <div className="container ">
        <div className="row mr-2">
          <div className="col-lg-8">
            <Row className="mt-4">
              <Col lg={12}>
                <Card>
                  <Card.Header>
                    <Card.Title>Role List</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive className="table-borderless">
                      <thead>
                        <tr>
                          <th className="border-bottom">#</th>
                          <th className="border-bottom text-success">Role</th>
                          <th className="border-bottom text-info">Edit</th>
                          <th className="border-bottom text-danger">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {initialRoles.map((role, index) => (
                          <tr key={index}>
                            <th>{role.id}</th>
                            <td>{role.name}</td>
                            <td>
                              <MdOutlineEditCalendar
                                className="larger-icon"
                                onClick={() => openEditModal(role.id)}
                              />
                            </td>
                            <td>
                              <AiOutlineDelete
                                className="larger-icon"
                                onClick={() => handleRoleDelete(role.id)}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <Modal
                        className="modal fade"
                        id="addProjectSidebar"
                        show={showForm}
                        onHide={() => setShowForm(false)}
                      >
                        <div className="" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="text-primary">Role Form</h5>
                              <button
                                type="button"
                                className="close"
                                onClick={() => setShowForm(false)}
                              >
                                <span>&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <form>
                                <div className="form-group ">
                                  <label className="text-black font-w500">
                                    Role Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="clientName"
                                    value={roleName}
                                    onChange={(e) =>
                                      setRoleName(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="form-group">
                                  <button
                                    type="button"
                                    onClick={handleRoleEdit}
                                    className="btn btn-primary"
                                  >
                                    Edit name
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </Modal>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </div>
          <div className="col-lg-4">
            <h2 className="mt-3 text-primary">Role Form</h2>
            <form>
              <div className="form-group mb-2 ">
                <Card.Title className="mb-1">Role Name</Card.Title>
                <input
                  type="text"
                  className="form-control"
                  name="roleName"
                  placeholder="Write Role name..."
                  value={roleName}
                  onChange={(e) => {
                    setRoleName(e.target.value);
                    setErrorMessage(""); // Clear the error message when typing
                  }}
                />
                {errorMessage && (
                  <div className="text-danger">{errorMessage}</div>
                )}
              </div>
              <button onClick={handleSubmit} className="btn btn-primary mt-1">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard1;
