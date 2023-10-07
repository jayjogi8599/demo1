import React from 'react';

const sectionStyle = {
  backgroundColor: '#eee',
};

const containerStyle = {
  padding: '5rem 0',
};

const breadcrumbStyle = {
  backgroundColor: '#f8f9fa',
  borderRadius: '0.5rem',
  padding: '1.5rem',
  marginBottom: '1rem',
};

const cardStyle = {
  marginBottom: '1rem',
};

const cardBodyStyle = {
  textAlign: 'center',
};

const imageStyle = {
  borderRadius: '50%',
  maxWidth: '150px',
  width: '100%',
};

const buttonStyle = {
  marginRight: '0.5rem',
};

const progressStyle = {
  height: '5px',
};

const Widgets = () => {
  return (
    <>
      <section style={sectionStyle}>
        <div className="container" style={containerStyle}>
          <div className="row">
            <div className="col">
              <nav aria-label="breadcrumb" style={breadcrumbStyle}>
                <ol className="breadcrumb mb-0">
                  <li className="breadcrumb-item"><a href="#">Home</a></li>
                  <li className="breadcrumb-item"><a href="#">User</a></li>
                  <li className="breadcrumb-item active" aria-current="page">User Profile</li>
                </ol>
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4">
              <div className="card" style={cardStyle}>
                <div className="card-body" style={cardBodyStyle}>
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    style={imageStyle}
                  />
                  <h5 className="my-3">John Smith</h5>
                  <p className="text-muted mb-1">Full Stack Developer</p>
                  <p className="text-muted mb-4">Bay Area, San Francisco, CA</p>
                  <div className="d-flex justify-content-center mb-2">
                    <button type="button" className="btn btn-primary" style={buttonStyle}>
                      Follow
                    </button>
                    <button type="button" className="btn btn-outline-primary ms-1" style={buttonStyle}>
                      Message
                    </button>
                  </div>
                </div>
              </div>
              <div className="card mb-4 mb-lg-0" style={cardStyle}>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush rounded-3">
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fas fa-globe fa-lg text-warning"></i>
                      <p className="mb-0">https://mdbootstrap.com</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-github fa-lg"></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-twitter fa-lg" style={{ color: '#55acee' }}></i>
                      <p className="mb-0">@mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-instagram fa-lg"></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                      <i className="fab fa-facebook-f fa-lg"></i>
                      <p className="mb-0">mdbootstrap</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4" style={cardStyle}>
                <div className="card-body">
                <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Full Name</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">Johnatan Smith</p>
              </div>
            </div>
         
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Email</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">example@example.com</p>
              </div>
            </div>
       
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Phone</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">(097) 234-5678</p>
              </div>
            </div>
     
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Mobile</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">(098) 765-4321</p>
              </div>
            </div>
 
            <div class="row">
              <div class="col-sm-3">
                <p class="mb-0">Address</p>
              </div>
              <div class="col-sm-9">
                <p class="text-muted mb-0">Bay Area, San Francisco, CA</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1">Web Design</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar" ></div>
                </div>
                <p class="mt-4 mb-1" >Website Markup</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar" aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" >One Page</p>
                <div class="progress rounded">
                  <div class="progress-bar" role="progressbar"  aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1">Mobile Template</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar"  aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" >Backend API</p>
                <div class="progress rounded mb-2">
                  <div class="progress-bar" role="progressbar"  aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card mb-4 mb-md-0">
              <div class="card-body">
                <p class="mb-4"><span class="text-primary font-italic me-1">assigment</span> Project Status
                </p>
                <p class="mb-1" >Web Design</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar" aria-valuenow="80"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" >Website Markup</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar"  aria-valuenow="72"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" >One Page</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar"  aria-valuenow="89"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" >Mobile Template</p>
                <div class="progress rounded" >
                  <div class="progress-bar" role="progressbar" aria-valuenow="55"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <p class="mt-4 mb-1" >Backend API</p>
                <div class="progress rounded mb-2" >
                  <div class="progress-bar" role="progressbar"  aria-valuenow="66"
                    aria-valuemin="0" aria-valuemax="100"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Widgets;
