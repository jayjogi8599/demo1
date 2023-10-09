import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Row, Col, Card, Table } from "react-bootstrap";
import { MdOutlineEditCalendar } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedDataAction } from "../../../store/action/commonActions";
const PermissionUser = () => {
  const Users = useSelector((state) => state.commonReducer.manageUser);

  const pageData = useSelector((state) => state.commonReducer.pagesone);

  const [showForm, setShowForm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [selectedCheckboxIds, setSelectedCheckboxIds] = useState([]);
  const [checkboxes, setCheckboxes] = useState({});

  const dispatch = useDispatch();

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
  const checkboxIds = {
    None: "1",
    View: "2",
    Add: "3",
    Update: "4",
    Delete: "5",
  };

  const handleCheckboxChange = (
    moduleName,
    permission,
    checked,
  
  ) => {
    const newCheckboxes = { ...checkboxes };
    const newSelectedCheckboxIds = [...selectedCheckboxIds];
  
    if (checked) {
      newSelectedCheckboxIds.push(checkboxIds[permission]);
    } else {
      const index = newSelectedCheckboxIds.indexOf(checkboxIds[permission]);
      if (index !== -1) {
        newSelectedCheckboxIds.splice(index, 1);
      }
    }
  
    setSelectedCheckboxIds(newSelectedCheckboxIds);
  
    if (!newCheckboxes[moduleName]) {
      newCheckboxes[moduleName] = {};
    }
  
    if (permission === "None") {
      newCheckboxes[moduleName]["None"] = checked;
  
      if (checked) {
        ["View", "Add", "Update", "Delete"].forEach((perm) => {
          newCheckboxes[moduleName][perm] = false;
        });
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
  
      const noOtherPermissionsSelected = ["Add", "Update", "Delete"].every(
        (perm) => !newCheckboxes[moduleName][perm]
      );
  
      if (noOtherPermissionsSelected) {
        newCheckboxes[moduleName]["None"] = true;
      } else {
        newCheckboxes[moduleName]["None"] = false;
      }
    }
  
    setCheckboxes(newCheckboxes);
  
    const usersId = selectedUserId;
    const moduleNames = selectedModuleId;
    const pageDataItem = pageData.find((data) => data.name === moduleName);
    let pageId = "";
  
    if (pageDataItem) {
      pageId = pageDataItem.id;
      console.log(`Page ID ${moduleName}:`, pageDataItem.id);
    }
  
    
    dispatch(setSelectedDataAction(usersId, moduleNames, pageId, newSelectedCheckboxIds));
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
                          <th className="border-bottom">Last Name</th>
                          <th className="border-bottom">Middle Name</th>
                          <th className="border-bottom">Role</th>
                          <th className="border-bottom">Designation</th>
                          <th className="border-bottom">Module</th>
                          <th className="border-bottom">Edit</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Users.map((user, index) => (
                          <tr key={index}>
                            <td>{user.id}</td>
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
                                    Select Modules:
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
                                      - - - Select Module - - -
                                    </option>
                                    {selectedUserModules.map(
                                      (module, index) => (
                                        <option key={module} value={module}>
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
                                        <div
                                          key={`module-${index}`}
                                          className="d-flex align-items-center mt-2 "
                                        >
                                          <th className="mr-4">PageID</th>
                                          <th className="mr-5">Page Name</th>
                                          <th>Permissions</th>
                                        </div>
                                        <li
                                          key={`module-item-${index}`}
                                          className="list-group-item d-flex justify-content-between align-items-center"
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
                                                  !moduleCheckboxes["None"],
                                                  index,
                                                  `None`
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
                                                  !moduleCheckboxes["View"],
                                                  index,
                                                  `View`
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
                                                  !moduleCheckboxes["Add"],
                                                  index,
                                                  `Add`
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
                                                  !moduleCheckboxes["Update"],
                                                  index,
                                                  `Update`
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
                                                  !moduleCheckboxes["Delete"],
                                                  index,
                                                  `Delete`
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
