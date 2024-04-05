using CMH.ExerciseProject.Server.Model;
using CMH.ExerciseProject.Server.Options;

namespace CMH.ExerciseProject.Server.Database
{
    public interface IPatientDataLayer
    {
        Task<List<Patient>> GetPatients();
        Task<List<Patient>> SearchPatients(string patientName);
        Task<int> AddPatient(Patient patient);
        Task<int> DeletePatient(int patientId);
    }
    public class PatientDataLayer : IPatientDataLayer
    {
        private string AccessKey = String.Empty;
        public PatientDataLayer(Connection connection) 
        {
            AccessKey = connection.ConnectionString;
        }

        private bool Connected() => AccessKey == "000Orange^*";


        public async Task<int> AddPatient(Patient patient)
        {
            if (patient.Age < 0 || patient.Age > 200)
            {
                return 0;
            }
            if (Connected())
            {
                patient.PatientId = GetMaxPatientId() + 1;
                PatientDatabase.Patients.Add(patient);
                return 1;
            }
            return 0;

        }

        public int GetMaxPatientId()
        {
            if (Connected())
            {
                if (!PatientDatabase.Patients.Any())
                {
                    return 0;
                }
                else
                {
                    return PatientDatabase.Patients.Max(x => x.PatientId);
                }
            }
            else
            {
                return 0;
            }
        }

        public async Task<int> DeletePatient(int patientId)
        {
            if (Connected())
            {
                Patient? toDelete = PatientDatabase.Patients.FirstOrDefault(x => x.PatientId == patientId);
                if (toDelete != null)
                {
                    PatientDatabase.Patients.Remove(toDelete);
                    return 1;
                }
                return 0;
            }
            return 0;
        }

        public async Task<List<Patient>> GetPatients()
        {
            if (Connected())
            {
                return PatientDatabase.Patients;
            }
            return new List<Patient>();
        }

        public async Task<List<Patient>> SearchPatients(string patientName)
        {
            if (Connected())
            {
                return PatientDatabase.Patients.Where(x => x.FirstName.Contains(patientName) || x.LastName.Contains(patientName)).Distinct().ToList();
            }
            return new List<Patient>();
        }

    }
}
