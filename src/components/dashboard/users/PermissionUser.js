import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Row, Col, Card, Table } from "react-bootstrap";
import { MdOutlineEditCalendar } from "react-icons/md";

import { useSelector } from "react-redux";

const PermissionUser = () => {
  const Users = useSelector((state) => state.commonReducer.manageUser);
  console.log("ManageUser===>", Users);

  const pageData = useSelector((state) => state.commonReducer.pagesone);

  const [showForm, setShowForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);

    const selectedModules = pageData
    .filter((data) => data.moduleName === selectedModuleId)
    .map((data) => data.name);

  const openModal = (userId, moduleId) => {
    setSelectedUserId(userId);
    setSelectedModuleId(moduleId);
    setShowForm(true);
  };

  const selectedUser = Users.find((user) => user.id === selectedUserId);
  const selectedUserModules = selectedUser ? selectedUser.module : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
  };

  const [checkboxes, setCheckboxes] = useState({});

  const handleCheckboxChange = (moduleName, permission, checked) => {
    const newCheckboxes = { ...checkboxes };

    if (!newCheckboxes[moduleName]) {
      newCheckboxes[moduleName] = {};
    }

    if (permission === "None") {
      newCheckboxes[moduleName]["None"] = checked;

      if (checked) {
        newCheckboxes[moduleName] = {
          None: true,
          View: false,
          Add: false,
          Update: false,
          Delete: false,
        };
      }
    } else {
      newCheckboxes[moduleName]["None"] = false;
      newCheckboxes[moduleName][permission] = checked;

      const numSelected = ["Add", "Update", "Delete"].reduce((count, perm) => {
        if (newCheckboxes[moduleName][perm]) {
          return count + 1;
        }
        return count;
      }, 0);

      if (numSelected >= 1) {
        newCheckboxes[moduleName]["View"] = true;
      } else {
        newCheckboxes[moduleName]["View"] = false;
      }
    }

    setCheckboxes(newCheckboxes);
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
                    <Card.Title className="text-bold">
                      Permission-User
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive className="table-borderless">
                      <thead>
                        <tr>
                          <th className="border-bottom">#</th>
                          <th className="border-bottom">First Name</th>
                          <th className="border-bottom ">Last Name</th>
                          <th className="border-bottom">Middle Name</th>
                          <th className="border-bottom">Role</th>
                          <th className="border-bottom">Designation</th>
                          <th className="border-bottom">Modulue</th>
                          <th className="border-bottom">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((user, index) => (
                          <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.middleName}</td>
                            <td>{user.role}</td>
                            <td>{user.designation}</td>
                            <td>{user.module}</td>
                            <td>
                              <MdOutlineEditCalendar
                                onClick={() =>
                                  openModal(user.id, user.moduleId)
                                }
                                className="larger-icon"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <Modal
                        className="modal fade "
                        id="addProjectSidebar"
                        show={showForm}
                        dialogClassName="modal-lg"
                        onHide={() => setShowForm(false)}
                      >
                        <div className="" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="text-black">Permission Form</h5>
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
                                  <label htmlFor="permissionDropdown">
                                    Select Permission:
                                  </label>
                                  <select
                                    className="form-control"
                                    name="permission"
                                    id="permissionDropdown"
                                    value={selectedModuleId}
                                    onChange={(e) =>
                                      setSelectedModuleId(e.target.value)
                                    }
                                  >
                                    <option value="">
                                      - - - Choose Module - - -
                                    </option>{" "}
                                    {selectedUserModules.map(
                                      (module, index) => (
                                        <option key={index} value={module}>
                                          {module}
                                        </option>
                                      )
                                    )}
                                  </select>
                                </div>

                                <ol className="list-group list-group-numbered">
                                  {selectedModules.map((module, index) => {
                                    const pageDataItem = pageData.find(
                                      (data) => data.name === module
                                    );
                                    const moduleName = pageDataItem
                                      ? pageDataItem.name
                                      : "";
                                    const moduleCheckboxes =
                                      checkboxes[moduleName] || {};

                                    return (
                                      <>
                                        <div className="d-flex align-items-center mt-2 ">
                                          <th className="mr-4">PageID</th>
                                          <th className="mr-5">Page Name</th>
                                          <th>Permissions</th>
                                        </div>
                                        <li
                                          className="list-group-item d-flex justify-content-between align-items-center"
                                          key={index}
                                        >
                                          <strong>
                                            {pageDataItem
                                              ? pageDataItem.id
                                              : " "}
                                          </strong>

                                          {module}
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id={`inlineCheckbox${index}None`}
                                              value="None"
                                              checked={
                                                moduleCheckboxes["None"] ||
                                                false
                                              }
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  moduleName,
                                                  "None",
                                                  !moduleCheckboxes["None"]
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`inlineCheckbox${index}None`}
                                            >
                                              None
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id={`inlineCheckbox${index}View`}
                                              value="view"
                                              checked={
                                                moduleCheckboxes["View"] ||
                                                false
                                              }
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  moduleName,
                                                  "View",
                                                  !moduleCheckboxes["View"]
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`inlineCheckbox${index}View`}
                                            >
                                              View
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id={`inlineCheckbox${index}Add`}
                                              value="Add"
                                              checked={
                                                moduleCheckboxes["Add"] || false
                                              }
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  moduleName,
                                                  "Add",
                                                  !moduleCheckboxes["Add"]
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`inlineCheckbox${index}Add`}
                                            >
                                              Add
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id={`inlineCheckbox${index}Update`}
                                              value="Update"
                                              checked={
                                                moduleCheckboxes["Update"] ||
                                                false
                                              }
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  moduleName,
                                                  "Update",
                                                  !moduleCheckboxes["Update"]
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`inlineCheckbox${index}Update`}
                                            >
                                              Update
                                            </label>
                                          </div>
                                          <div className="form-check form-check-inline">
                                            <input
                                              className="form-check-input"
                                              type="checkbox"
                                              id={`inlineCheckbox${index}Delete`}
                                              value="Delete"
                                              checked={
                                                moduleCheckboxes["Delete"] ||
                                                false
                                              }
                                              onChange={() =>
                                                handleCheckboxChange(
                                                  moduleName,
                                                  "Delete",
                                                  !moduleCheckboxes["Delete"]
                                                )
                                              }
                                            />
                                            <label
                                              className="form-check-label"
                                              htmlFor={`inlineCheckbox${index}Delete`}
                                            >
                                              Delete
                                            </label>
                                          </div>
                                        </li>
                                      </>
                                    );
                                  })}
                                </ol>

                                <button
                                  onClick={handleSubmit}
                                  className="btn btn-primary mt-2"
                                >
                                  Save
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

export default PermissionUser;
