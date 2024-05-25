import React from 'react';

function ProfileSettings() {
  return (
    <div class="content">
    <div class="container-fluid">
        <div class="row">
        <div className="col-md-5 col-lg-4 col-xl-3 card" >
            <div className="profile-sidebar">
                <div className="widget-profile pro-widget-content">
                    <div className="profile-info-widget">
                        <a href="#" className="booking-doc-img">
                            <img src="assets/img/patients/patient.jpg" alt="User Image" className="img-fluid img-thumbnail mt-4 mb-2" />
                        </a>
                        <div className="profile-det-info">
                            <h3>Richard Wilson</h3>
                            <div className="patient-details">
                                <h5><i className="fas fa-birthday-cake"></i> 24 Jul 1983, 38 years</h5>
                                <h5 className="mb-0"><i className="fas fa-map-marker-alt"></i> Newyork, USA</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dashboard-widget">
                <nav className="navbar navbar-expand-lg navbar-white bg-white">
                    <ul className="navbar-nav mr-auto d-flex flex-column">
                        <li className="nav-item mr-3">
                            <a className="nav-link" href="#">
                                <i className="fas fa-columns"></i>
                                <span>Dashboard</span>
                            </a>
                        </li>
                        <li className="nav-item mr-3">
                            <a className="nav-link" href="change-password.html">
                                <i className="fas fa-lock"></i>
                                <span>Change Password</span>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="index-2.html">
                                <i className="fas fa-sign-out-alt"></i>
                                <span>Logout</span>
                            </a>
                        </li>
                    </ul>
                </nav>
                </div>
            </div>
        </div>
            <div class="col-md-7 col-lg-8 col-xl-9">
                <div class="card container container-fluid">
                    <div class="card-body">
                        <form>
                            <div class="row form-row">
                                <div class="col-12 col-md-12">
                                    <div class="form-group">
                                        <div class="change-avatar">
                                            <div class="profile-img">
                                                <img src="assets/img/patients/patient.jpg" alt="User Image"/>
                                            </div>
                                            <div class="upload-img">
                                                <div class="change-photo-btn">
                                                    <span><i class="fa fa-upload"></i> Upload Photo</span>
                                                    <input type="file" class="upload"/>
                                                </div>
                                                <small class="form-text text-muted">Allowed JPG, GIF or PNG. Max size of 2MB</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>First Name</label>
                                        <input type="text" class="form-control" value="Richard"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Last Name</label>
                                        <input type="text" class="form-control" value="Wilson"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Date of Birth</label>
                                        <div class="cal-icon">
                                            <input type="text" class="form-control datetimepicker" value="24-07-1983"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Blood Group</label>
                                        <select class="form-control select">
                                            <option>A-</option>
                                            <option>A+</option>
                                            <option>B-</option>
                                            <option>B+</option>
                                            <option>AB-</option>
                                            <option>AB+</option>
                                            <option>O-</option>
                                            <option>O+</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Email ID</label>
                                        <input type="email" class="form-control" value="richard@example.com"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Mobile</label>
                                        <input type="text" value="+1 202-555-0125" class="form-control"/>
                                    </div>
                                </div>
                                <div class="col-12">
                                    <div class="form-group">
                                        <label>Address</label>
                                        <input type="text" class="form-control" value="806 Twin Willow Lane"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>City</label>
                                        <input type="text" class="form-control" value="Old Forge"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>State</label>
                                        <input type="text" class="form-control" value="Newyork"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Zip Code</label>
                                        <input type="text" class="form-control" value="13420"/>
                                    </div>
                                </div>
                                <div class="col-12 col-md-6">
                                    <div class="form-group">
                                        <label>Country</label>
                                        <input type="text" class="form-control" value="United States"/>
                                    </div>
                                </div>
                            </div>
                            <div class="submit-section">
                                <button type="submit" class="btn btn-primary submit-btn">Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

  );
}

export default ProfileSettings;