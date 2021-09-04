import './AddForm.css';

export default function AddForm(){
    return (
        <div className="overlay">
            <form className="row g-3 needs-validation mb-2 mt-2 border-top border-bottom" noValidate>
                <div className="col-md-4">
                    <label htmlFor="validationCustom01" className="form-label">Id</label>
                    <input type="text" className="form-control" id="validationCustom01" placeholder="01" required />
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom02" className="form-label">First name</label>
                    <input type="text" className="form-control" id="validationCustom02" placeholder="Mark" required />
                </div>
                <div className="col-md-4">
                    <label htmlFor="validationCustom03" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="validationCustom03" placeholder="Otto" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom04" className="form-label">Email</label>
                    <input type="email" className="form-control" id="validationCustom04" placeholder="mail@gmail.com" required />
                </div>
                <div className="col-md-6">
                    <label htmlFor="validationCustom05" className="form-label">Phone</label>
                    <input type="phone" className="form-control" id="validationCustom05" placeholder="+7444-444-44-44" required />
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" type="submit">Submit form</button>
                </div>
            </form>
        </div>
    );
}