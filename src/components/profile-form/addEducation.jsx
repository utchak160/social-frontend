import React, {useState} from "react";
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {addEducation} from "../../store/actions/profile.action";

const AddEducation = ({addEducation, history}) => {
    const [formData, setFormData] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisplay, toggleDisabled] = useState(false)

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = formData;

    const onChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        addEducation(formData, history);
    }

    return (
        <section className="container">
            <h1 className="large text-primary">
                Add An Experience
            </h1>
            <p className="lead">
                <i className="fas fa-graduation-cap" /> Add any school, bootcamp, etc that
                you have attended
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={(e) => onSubmit(e)}>
                <div className="form-group">
                    <input type="text" placeholder="* Job Title" name="school" value={school} onChange={e => onChange(e)}
                           required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="* Company" name="degree" value={degree}
                           onChange={e => onChange(e)} required/>
                </div>
                <div className="form-group">
                    <input type="text" placeholder="Location" name="fieldofstudy" value={fieldofstudy}
                           onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={e => onChange(e)}/>
                </div>
                <div className="form-group">
                    <p>
                        <input type="checkbox" name="current" value={current}
                               onChange={e => {
                                   setFormData({...formData, current: !current});
                                   toggleDisabled(!toDateDisplay);
                               }}
                        />
                        Current Job
                    </p>
                </div>
                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to" value={to} onChange={e => onChange(e)} disabled={toDateDisplay ? 'disabled' : ''}/>
                </div>
                <div className="form-group">
          <textarea
              name="description"
              cols="30"
              rows="5"
              placeholder="Job Description"
              value={description} onChange={e => onChange(e)}
          />
                </div>
                <input type="submit" className="btn btn-primary my-1"/>
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </section>
    );
}

AddEducation.propTypes = {
    addExperience: PropTypes.func.isRequired
};


export default connect(null, {addEducation})(withRouter(AddEducation));
