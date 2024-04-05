import { SetStateAction, useEffect, useState } from 'react';
import './App.css';
import { Patient } from './Patient';
import { GetPatients, AddPatient, SearchPatients, DeletePatient } from './Fetch';

function App() {
    const [patients, setPatients] = useState<Patient[] | undefined>([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getPatientsData();
    }, []);

    const getPatientsData = async () => {
        const data = await GetPatients()
        setPatients(data || []);
    };

    const handleAdd = async () => {
        const firstNameInput = document.getElementById('firstName') as HTMLInputElement;
        const lastNameInput = document.getElementById('lastName') as HTMLInputElement;
        const ageInput = document.getElementById('age') as HTMLInputElement;

        if (firstNameInput && lastNameInput && ageInput) {
            const newPatient: Patient = {
                patientId: 0,
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                age: parseInt(ageInput.value)
            };

            await AddPatient(newPatient);

            const updatedPatients = await GetPatients();
            setPatients(updatedPatients || []);

            firstNameInput.value = '';
            lastNameInput.value = '';
            ageInput.value = '';
        }
    };

    const handleSearch = async () => {
        if (!searchQuery) {
            getPatientsData();
            return;
        }
        try {
            const results = await SearchPatients(searchQuery);
            setPatients(results);
        } catch (error) {
            console.error('Failed to search patients:', error);
        }
    };

    const handleSearchQueryChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (patientId: number) => {
        try {
            await DeletePatient(patientId);
            getPatientsData();
        } catch (error) {
            console.error('Failed to delete patient:', error);
        }
    };

    const contents = patients === undefined
        ? <p><em>Loading... </em></p>
        : <div>
            <input type="text" placeholder="Search name" value={searchQuery} onChange={handleSearchQueryChange} /><button onClick={handleSearch}>Search</button>
            <table className="table table-striped" aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Patient ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient =>
                        <tr key={patient.patientId}>
                            <td>{patient.patientId}</td>
                            <td>{patient.firstName}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.age}</td>
                            <td><button onClick={() => handleDelete(patient.patientId)}>Delete</button></td>
                        </tr>
                    )}
                    <tr key={'new record'}>
                        <td>&nbsp;</td>
                        <td><input type="text" placeholder="Enter first name" id="firstName" /></td>
                        <td><input type="text" placeholder="Enter last name" id="lastName" /></td>
                        <td><input type="number" placeholder="Enter Age" id="age" /></td>
                        <td><button onClick={handleAdd}>Add</button></td>
                    </tr>
                </tbody>
            </table>
        </div>;

    return (
        <div>
            <h1 id="tabelLabel">Patient Application</h1>
            {contents}
        </div>
    );
}

export default App;