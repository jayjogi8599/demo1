import React, { useState } from "react";
import { Row, Col, Card, Table } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  editCommon,
  createCommon,
  deleteCommon,
} from "../../store/action/commonActions";
import { MdOutlineEditCalendar } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const Pages = () => {
  const pageData = useSelector((state) => state.commonReducer.pagesone);
  console.log(pageData);

  const module = useSelector((state) => state.commonReducer.modules);
  console.log(module);

  const dispatch = useDispatch();

  const [data, setData] = useState({
    pageID: 0,
    pageName: "",
    moduleId: 0,
    moduleName: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [id, setId] = useState(0);

  const incrementId = () => {
    setId(id + 1);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedRoleName = data.trim();
    if (trimmedRoleName.length === 0) {
      setErrorMessage("Role Name cannot be empty.");
      return;
    }
    incrementId();
    dispatch(createCommon("pagesone", id, trimmedRoleName));

    setData({ ...data, name: "" });
    setErrorMessage("");
  };

  const handleRoleDelete = (roleId) => {
    const sliceName = "pagesone";
    dispatch(deleteCommon(sliceName, roleId));
  };

  const handleEditModal = (index) => {
    const pageToEdit = pageData[index];
    setSelectedValue(pageToEdit.moduleName || "");
    setEditingId(pageToEdit.id);
    setShowForm(true);
  };
  

  const handleSave = () => {
    if (editingId !== null) {
      const pageIndex = pageData.findIndex((page) => page.id === editingId);

      if (pageIndex !== -1) {
        const updatedPage = {
          ...pageData[pageIndex],
          moduleName: selectedValue,
        };

        dispatch(editCommon("pagesone", editingId, updatedPage,''));
      }
      setEditingId(null);
      setShowForm(false);
    }
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
                    <Card.Title>Table</Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Table responsive className="table-borderless">
                      <thead>
                        <tr>
                          <th className="border-bottom">Sr.no</th>
                          <th className="border-bottom text-success">
                            Page Name
                          </th>
                          <th className="border-bottom text-info">
                            Module Name
                          </th>
                          <th className="border-bottom text-danger">Edit</th>
                        </tr>
                      </thead>

                      <tbody>
                        {pageData.map((page, index) => (
                          <tr key={index}>
                            <th>{page.id}</th>
                            <td>{page.name}</td>

                            <td>{page.moduleName || "-"}</td>

                            <td>
                              <MdOutlineEditCalendar
                                className="larger-icon"
                                onClick={() => handleEditModal(index)}
                              />
                            </td>
                            <td>
                              <AiOutlineDelete
                                className="larger-icon"
                                onClick={() => handleRoleDelete(page.id)}
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
                              <h5 className="text-primary">Select Module</h5>
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
                                    Select a new page name
                                  </label>
                                  <select
                                    className="form-control mb-1"
                                    value={selectedValue}
                                    onChange={(e) => {
                                      setSelectedValue(e.target.value);
                                      setErrorMessage("");
                                    }}
                                  >
                                    <option>Choose Module</option>
                                    {module.map((page, index) => (
                                      <option key={page.index} value={page.name}>
                                        {page.id}. {page.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div className="form-group">
                                  <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                  >
                                    Save
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
            <h2 className="mt-3 text-primary">Page Form</h2>
            <form>
              <div className="form-group mb-2 ">
                <Card.Title className="mb-1">Page Name</Card.Title>
                <input
                  type="text"
                  className="form-control"
                  name="roleName"
                  placeholder="Write Page name..."
                  value={data.name}
                  onChange={(e) => {
                    setData(e.target.value);
                    setErrorMessage("");
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

export default Pages;
