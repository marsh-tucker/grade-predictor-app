import { GPAPropsList } from "./types";

const GPAOverview: React.FC<GPAPropsList> = ({ calculateTotalGPA }) => {
    const { currentGPA, futureGPA, predictedGPA } = calculateTotalGPA();

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
            {/* column with card for current GPA */}
                <div className="col-md-4">
                    <div className="card text-center bg-light shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Current GPA</h5>
                            <p className="card-text display-6">{currentGPA}</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center bg-light shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title">Future GPA</h5>
                            <p className="card-text display-6">{futureGPA}</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default GPAOverview