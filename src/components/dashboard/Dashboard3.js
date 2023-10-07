import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { MdOutlineEditCalendar } from "react-icons/md";
import {createCommon,editCommon,deleteCommon} from '../../store/action/commonActions'
import { Row, Col, Card, Table } from "react-bootstrap";
import { AiOutlineDelete } from "react-icons/ai";
const Dashboard3 = () => {
  const module = useSelector((state) => state.commonReducer.modules); // Access the roles array
  console.log(module);
  const dispatch = useDispatch();

  const [moduleName, setModuleName] = useState("");
  const [editingRoleId, setEditingRoleId] = useState(null); // Track the role being edited
  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [id, setId] = useState(1);

  const incrementId = () => {
    setId(id + 1);
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedRoleName = moduleName.trim();

    if (trimmedRoleName.length === 0) {
      setErrorMessage("Module Name cannot be empty.");
      return;
    }
    incrementId();
    dispatch(createCommon("modules", id, trimmedRoleName));
    setModuleName("");
    setErrorMessage("");
  };

  const handleRoleEdit = (moduleId) => {
     if (editingRoleId !== null) {
      const trimmedRoleName = moduleName.trim();
      if (trimmedRoleName.length === 0) {
        alert("Module Name cannot be empty.");
        return;
      }
      dispatch(editCommon("modules",editingRoleId, trimmedRoleName));
      setModuleName("");
      setShowForm(false);
      setEditingRoleId(null);
    }
  };

  const openEditModal = (moduleId) => {
    const roleToEdit = module.find((role) => role.id === moduleId);
    if (roleToEdit) {
      setEditingRoleId(moduleId);
      setModuleName(roleToEdit.name);
      setShowForm(true);
    }
  };
  const handleRoleDelete = (roleId) => {
    const sliceName = "modules";
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
                <Card.Title>Modulus List</Card.Title>
              </Card.Header>
              <Card.Body>
                <Table responsive className="table-borderless">
                  <thead>
                    <tr>
                      <th className="border-bottom">#</th>
                      <th className="border-bottom">Role</th>
                      <th className="border-bottom text-info">Edit</th>
                    </tr>
                  </thead>
                  <tbody>
                  {module.map((role, index) => (
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
                          <h5 className="text-primary">Designation Form</h5>
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
                              Designation Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                name="clientName"
                                value={moduleName}
                                onChange={(e) => setModuleName(e.target.value)}
                              />
                            </div>
                            <div className="form-group">
                              <button type="button" onClick={handleRoleEdit} className="btn btn-primary">
                                Edit Name
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
            <h2 className="mt-3 text-primary">Modulus Form</h2>
            <form>
              <div className="form-group mb-2">
                <Card.Title className='mb-1'>Modulus Name</Card.Title>
                <input
                  type="text"
                  className="form-control "
                  name="roleName"
                  placeholder="Write Modulus name..."
                  value={moduleName}
                  onChange={(e) =>{ 
                    setModuleName(e.target.value);
                    setErrorMessage(""); 
                  }}
                />
                  {errorMessage && (
                  <div className="text-danger">{errorMessage}</div>
                )}
              </div>
              <button onClick={handleSubmit}  className="btn btn-primary mt-1">
                Submit
              </button>
            </form>
          </div>
        </div>
        
      </div>
    </>
  );
};

export default Dashboard3;
