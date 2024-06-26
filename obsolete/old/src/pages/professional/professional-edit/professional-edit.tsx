import { useState } from "react";
import { useParams } from "react-router-dom";
import { getService } from "../../../controllers/serviceController";
import ProfessionalForm from "../professional-form/professional-form";


export default function ProfessionalEdit() {
    const { professionalId } = useParams();

    const [loading, setLoading] = useState(true);
    const [serviceData, setServiceData] = useState(false);

    if (professionalId === undefined) return <p>error</p>

    getService(professionalId).then(() => {
        setServiceData(true);
        setLoading(false);
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!serviceData) {
        return <p>Error: could not fetch service data</p>;
    }

    return <ProfessionalForm professionalId={parseInt(professionalId)} />;
}
