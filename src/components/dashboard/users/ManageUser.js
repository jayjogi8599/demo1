import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Row, Col, Card, Table } from "react-bootstrap";
import { MdOutlineEditCalendar } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";

import {
  createUser,
  editUser,
  deleteCommon,
  resetStoreAction,
} from "../../../store/action/commonActions";

const ManageUser = () => {
  const Users = useSelector((state) => state.commonReducer.manageUser);
  console.log("ManageUser===>", Users);

  const Role = useSelector((state) => state.commonReducer.roles);

  const module = useSelector((state) => state.commonReducer.modules);
  console.log(module);

  const designation = useSelector((state) => state.commonReducer.designations);
  const dispatch = useDispatch();

  const [editUserId, setEditUserId] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [id, setId] = useState(1);

  const incrementId = () => {
    setId(id + 1);
  };

  const openModal = () => {
    incrementId();
    setShowForm(true);

    if (editUserId !== null) {
      setFormData({
        id: id,
        firstName: "",
        lastName: "",
        middleName: "",
        mobileNo: "",
        role: "",
        designation: "",
        module: [],
      });

      setEditUserId(null);
    } else {
      setFormData({
        id: id,
        firstName: "",
        lastName: "",
        middleName: "",
        mobileNo: "",
        role: "",
        designation: "",
        module: [],
      });
    }
  };

  const [formData, setFormData] = useState({
    id: id,
    firstName: "",
    lastName: "",
    middleName: "",
    mobileNo: "",
    role: "",
    designation: "",
    module: [],
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (selectedOptions) => {
    const selectedModuleNames = selectedOptions.map((option) => option.value);

    setFormData({ ...formData, module: selectedModuleNames });

    setSelectedModules(selectedOptions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editUserId !== null) {
      dispatch(editUser("manageUser", editUserId, formData));
    } else {
      dispatch(createUser("manageUser", formData));
    }

    setShowForm(false);
  };

  const handleDelete = (Id) => {
    const sliceName = "manageUser";
    dispatch(deleteCommon(sliceName, Id));
  };

  // useEffect(() => {
  // dispatch(resetStoreAction)
  // }, [dispatch])

  const handleEditModal = (userId) => {
    const userToEdit = Users.find((user) => user.id === userId);

    if (userToEdit) {
      setFormData({
        id: userToEdit.id,
        firstName: userToEdit.firstName,
        lastName: userToEdit.lastName,
        middleName: userToEdit.middleName,
        mobileNo: userToEdit.mobileNo,
        role: userToEdit.role,
        designation: userToEdit.designation,
        module: userToEdit.module,
      });

      setEditUserId(userId);

      setShowForm(true);
    }
  };

  return (
    <>
      <div className="container ">
        <div className="row mr-2">
          <div className="col-lg-10">
            <Row className="mt-4">
              <Col lg={12}>
                <Card>
                  <Card.Header className="d-flex align-items-center justify-content-between">
                    <Card.Title className="text-bold">Manage-User</Card.Title>
                    <button
                      onClick={openModal}
                      className="btn btn-primary position-relative"
                    >
                      Add User
                    </button>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive className="table-borderless">
                      <thead>
                        <tr>
                          <th className="border-bottom">#</th>
                          <th className="border-bottom">First Name</th>
                          <th className="border-bottom ">Last Name</th>
                          <th className="border-bottom">Middle Name</th>
                          <th className="border-bottom">Mobile.No</th>
                          <th className="border-bottom">Role</th>
                          <th className="border-bottom">Designation</th>
                          <th className="border-bottom">Modulue</th>
                          <th className="border-bottom">Edit</th>
                          <th className="border-bottom">Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.middleName}</td>
                            <td>{user.mobileNo}</td>
                            <td>{user.role}</td>
                            <td>{user.designation}</td>
                            <td>{user.module}</td>

                            <td>
                              <MdOutlineEditCalendar
                                onClick={() => handleEditModal(user.id)}
                                className="larger-icon"
                              />
                            </td>
                            <td>
                              <AiOutlineDelete
                                className="larger-icon"
                                onClick={() => handleDelete(user.id)}
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
                              <h5 className="text-black">User Form</h5>
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
                                <div className="form-group">
                                  <p className="mb-2">First Name</p>
                                  <input
                                    type="text"
                                    className="form-hover form-control form-control-sm shadow-sm"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <p className="mb-2">Last Name</p>
                                  <input
                                    type="text"
                                    className="form-control form-hover form-control-sm shadow-sm"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <p className="mb-2">Middle Name</p>
                                  <input
                                    type="text"
                                    className="form-control form-hover form-control-sm shadow-sm"
                                    id="middleName"
                                    name="middleName"
                                    value={formData.middleName}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <p className="mb-2">Mobile.No</p>
                                  <input
                                    type="number"
                                    max="10"
                                    className="form-control form-hover form-control-sm shadow-sm"
                                    id="mobileNo"
                                    name="mobileNo"
                                    value={formData.mobileNo}
                                    onChange={handleInputChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <p className="mb-2">Role</p>
                                  <select
                                    className="form-control form-control-sm shadow-sm"
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                  >
                                    {Role.map((role, index) => (
                                      <option key={index} value={role.name}>
                                        {role.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <p className="mb-2">Designation</p>
                                  <select
                                    className="form-control form-control-sm shadow-sm"
                                    id="designation"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleInputChange}
                                  >
                                    {designation.map((role, index) => (
                                      <option key={index} value={role.name}>
                                        {role.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <p className="mb-2">Module</p>
                                  <Select
                                     className="custom-react-select-container"
                                     classNamePrefix="custom-react-select"
                                    options={module.map((role) => ({
                                      value: role.name,
                                      label: role.name,
                                    }))}
                                    
                                    isMulti
                                    value={selectedModules}
                                    onChange={handleSelectChange}
                                  />
                                </div>
                                <button
                                  onClick={handleSubmit}
                                  className="btn btn-primary"
                                >
                                  Submit
                                </button>
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
        </div>
      </div>
    </>
  );
};

export default ManageUser;
