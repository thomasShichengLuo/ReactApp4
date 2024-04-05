import { Patient } from "./Patient";

export async function GetPatients():Promise<Patient[]> {
    const response = await fetch(`Patient/GetPatients`);
    if (response.ok) {
        const result = await response.json();
        return result;
    } else {
        console.error(response.json());
        throw new Error('Failed to get patients');
    }
}

export async function SearchPatients(name: string): Promise<Patient[]> {
    const response = await fetch(`Patient/SearchPatients/${name}`, { method:'GET' });
    return await response.json();
}


export async function DeletePatient(patientId: number): Promise<number> {
    const response = await fetch(`Patient/DeletePatient/${patientId}`, {
        method: 'DELETE'
    });
    return await response.json();
}

export async function AddPatient(patient: Patient): Promise<number> {
    try {
        const response = await fetch("/Patient/AddPatient", { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });

        if (response.ok) { 
            const result = await response.json(); 
            return result; 
        } else {
            throw new Error('Failed to add patient'); 
        }
    } catch (error) {
        console.error('Error adding patient:', error); 
        throw error; 
    }
}

export function request<T>(url: string, config: RequestInit = {}): Promise<T>
{
    return fetch(url, config)
        .then(response => response.json())
        .then(data => data as T)
        .catch(e => {
            console.error(e)
            return e;
        });
}